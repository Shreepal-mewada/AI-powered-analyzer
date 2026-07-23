import { invokeLLM } from '../services/llmService.js';
import { AgentOutput } from '../models/AgentOutput.js';

export const runParserAgent = async (state) => {
  const sampleText = state.rawText.slice(0, 3000);
  const systemPrompt = `Extract title, authors array, publication year, venue, and abstract from the beginning of this research paper text. Return strict JSON only with keys: title, authors, year, venue, abstract.`;

  const result = await invokeLLM({
    systemPrompt,
    userPrompt: sampleText,
    expectedAgentType: 'parser'
  });

  // Log AgentOutput if DB connected
  try {
    await AgentOutput.create({
      runId: state.runId,
      documentId: state.documentId,
      agentType: 'parser',
      parsedOutput: result.parsedOutput,
      tokens: result.tokens,
      latencyMs: result.latencyMs,
      costEstimate: result.costEstimate
    });
  } catch (e) {
    // Ignore DB log errors
  }

  return {
    metadata: result.parsedOutput,
    status: 'ANALYZING',
    activeNode: 'ParserAgent',
    analytics: {
      totalTokens: (state.analytics?.totalTokens || 0) + result.tokens.totalTokens,
      totalLatencyMs: (state.analytics?.totalLatencyMs || 0) + result.latencyMs,
      costEstimate: (state.analytics?.costEstimate || 0) + result.costEstimate
    }
  };
};
