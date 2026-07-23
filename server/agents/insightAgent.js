import { invokeLLM } from '../services/llmService.js';
import { routeContextForAgent } from '../services/contextRouter.js';
import { insightPrompt } from '../prompts/insight.prompt.js';
import { AgentOutput } from '../models/AgentOutput.js';

export const runInsightAgent = async (state) => {
  const contextText = routeContextForAgent('insight', state.chunks, state.rawText);
  const userPrompt = `Research Paper Discussion & Conclusions:\n${contextText}\n\nKey Findings:\n${JSON.stringify(state.analysis || {})}`;

  const result = await invokeLLM({
    systemPrompt: insightPrompt.systemPrompt,
    userPrompt,
    expectedAgentType: 'insight'
  });

  const insightsList = result.parsedOutput?.keyInsights || [];

  try {
    await AgentOutput.create({
      runId: state.runId,
      documentId: state.documentId,
      agentType: 'insight',
      attemptNumber: (state.retryCount || 0) + 1,
      parsedOutput: result.parsedOutput,
      tokens: result.tokens,
      latencyMs: result.latencyMs,
      costEstimate: result.costEstimate
    });
  } catch (e) {}

  return {
    insights: insightsList,
    activeNode: 'InsightGenerator',
    analytics: {
      totalTokens: (state.analytics?.totalTokens || 0) + result.tokens.totalTokens,
      totalLatencyMs: (state.analytics?.totalLatencyMs || 0) + result.latencyMs,
      costEstimate: (state.analytics?.costEstimate || 0) + result.costEstimate
    }
  };
};
