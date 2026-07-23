import { invokeLLM } from '../services/llmService.js';
import { routeContextForAgent } from '../services/contextRouter.js';
import { citationPrompt } from '../prompts/citation.prompt.js';
import { AgentOutput } from '../models/AgentOutput.js';

export const runCitationAgent = async (state) => {
  const contextText = routeContextForAgent('citation', state.chunks, state.rawText);
  const userPrompt = `References & Bibliography Section:\n${contextText}`;

  const result = await invokeLLM({
    systemPrompt: citationPrompt.systemPrompt,
    userPrompt,
    expectedAgentType: 'citation'
  });

  const citationList = result.parsedOutput?.citations || [];

  try {
    await AgentOutput.create({
      runId: state.runId,
      documentId: state.documentId,
      agentType: 'citation',
      attemptNumber: (state.retryCount || 0) + 1,
      parsedOutput: result.parsedOutput,
      tokens: result.tokens,
      latencyMs: result.latencyMs,
      costEstimate: result.costEstimate
    });
  } catch (e) {}

  return {
    citations: citationList,
    activeNode: 'CitationExtractor',
    analytics: {
      totalTokens: (state.analytics?.totalTokens || 0) + result.tokens.totalTokens,
      totalLatencyMs: (state.analytics?.totalLatencyMs || 0) + result.latencyMs,
      costEstimate: (state.analytics?.costEstimate || 0) + result.costEstimate
    }
  };
};
