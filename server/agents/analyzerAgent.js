import { invokeLLM } from '../services/llmService.js';
import { routeContextForAgent } from '../services/contextRouter.js';
import { analysisPrompt } from '../prompts/analysis.prompt.js';
import { AgentOutput } from '../models/AgentOutput.js';

export const runAnalyzerAgent = async (state) => {
  const contextText = routeContextForAgent('analyzer', state.chunks, state.rawText);
  let userPrompt = `Research Paper Context:\n${contextText}`;

  if (state.reviewFeedback) {
    userPrompt += `\n\nREVISION INSTRUCTION FROM QUALITY REVIEWER:\n${state.reviewFeedback}`;
  }

  const result = await invokeLLM({
    systemPrompt: analysisPrompt.systemPrompt,
    userPrompt,
    expectedAgentType: 'analyzer'
  });

  try {
    await AgentOutput.create({
      runId: state.runId,
      documentId: state.documentId,
      agentType: 'analyzer',
      attemptNumber: (state.retryCount || 0) + 1,
      parsedOutput: result.parsedOutput,
      tokens: result.tokens,
      latencyMs: result.latencyMs,
      costEstimate: result.costEstimate
    });
  } catch (e) {}

  return {
    analysis: result.parsedOutput,
    activeNode: 'ResearchAnalyzer',
    analytics: {
      totalTokens: (state.analytics?.totalTokens || 0) + result.tokens.totalTokens,
      totalLatencyMs: (state.analytics?.totalLatencyMs || 0) + result.latencyMs,
      costEstimate: (state.analytics?.costEstimate || 0) + result.costEstimate
    }
  };
};
