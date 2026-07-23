import { invokeLLM } from '../services/llmService.js';
import { routeContextForAgent } from '../services/contextRouter.js';
import { summaryPrompt } from '../prompts/summary.prompt.js';
import { AgentOutput } from '../models/AgentOutput.js';

export const runSummaryAgent = async (state) => {
  const contextText = routeContextForAgent('summary', state.chunks, state.rawText);
  const userPrompt = `Research Paper Abstract & Intro:\n${contextText}\n\nExisting Analysis:\n${JSON.stringify(state.analysis || {})}`;

  const result = await invokeLLM({
    systemPrompt: summaryPrompt.systemPrompt,
    userPrompt,
    expectedAgentType: 'summary'
  });

  try {
    await AgentOutput.create({
      runId: state.runId,
      documentId: state.documentId,
      agentType: 'summary',
      attemptNumber: (state.retryCount || 0) + 1,
      parsedOutput: result.parsedOutput,
      tokens: result.tokens,
      latencyMs: result.latencyMs,
      costEstimate: result.costEstimate
    });
  } catch (e) {}

  return {
    summary: result.parsedOutput,
    activeNode: 'SummaryGenerator',
    analytics: {
      totalTokens: (state.analytics?.totalTokens || 0) + result.tokens.totalTokens,
      totalLatencyMs: (state.analytics?.totalLatencyMs || 0) + result.latencyMs,
      costEstimate: (state.analytics?.costEstimate || 0) + result.costEstimate
    }
  };
};
