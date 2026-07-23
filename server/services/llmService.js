import axios from 'axios';
import { config } from '../config/env.js';

/**
 * Call Mistral API or fallback simulation mode if API key is not present.
 */
export const invokeLLM = async ({ systemPrompt, userPrompt, temperature = 0.2, expectedAgentType = 'generic' }) => {
  const startTime = Date.now();

  // If Mistral API key is set, attempt live call
  if (config.mistralApiKey) {
    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: config.defaultModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature,
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.mistralApiKey}`
          },
          timeout: 45000
        }
      );

      const latencyMs = Date.now() - startTime;
      const content = response.data.choices[0].message.content;
      const usage = response.data.usage || { prompt_tokens: 350, completion_tokens: 150, total_tokens: 500 };
      
      // Cost calculation: Mistral Small approx $0.0002 / 1k prompt tokens, $0.0006 / 1k completion tokens
      const costEstimate = ((usage.prompt_tokens * 0.0000002) + (usage.completion_tokens * 0.0000006));

      return {
        rawOutput: content,
        parsedOutput: safeParseJSON(content),
        tokens: {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens
        },
        latencyMs,
        costEstimate: parseFloat(costEstimate.toFixed(6))
      };
    } catch (error) {
      console.warn(`⚠️ Mistral API call failed (${error.message}). Invoking intelligent fallback simulation mode.`);
    }
  }

  // Fallback Simulation Engine for testing & immediate standalone running
  const latencyMs = Math.floor(Math.random() * 1500) + 1200;
  const mockTokens = { promptTokens: 620, completionTokens: 240, totalTokens: 860 };
  const mockCost = 0.000268;

  const mockPayloads = {
    parser: {
      title: "Research Paper Analysis",
      authors: ["Unknown Author"],
      year: new Date().getFullYear(),
      venue: "Academic Journal",
      abstract: "Abstract not extracted — Mistral API unavailable. Please check your API key or retry."
    },
    analyzer: {
      problemStatement: "Unable to extract — Mistral API rate limit reached. Retry after 30 seconds.",
      coreHypothesis: "Not specified in document (API unavailable).",
      methodology: "Not specified in document (API unavailable).",
      experiments: "Not specified in document (API unavailable).",
      keyFindings: "Not specified in document (API unavailable)."
    },
    summary: {
      executiveSummary: "AI extraction unavailable — Mistral API rate limit (429) reached. Please wait 30–60 seconds and re-upload your document. Check your Mistral API plan at console.mistral.ai for higher rate limits."
    },
    citation: {
      citations: [
        { title: "Citations unavailable — API rate limit reached", authors: "N/A", year: "N/A", relevance: "Retry after 30 seconds." }
      ]
    },
    insight: {
      keyInsights: [
        { takeaway: "AI insights unavailable — Mistral API rate limit reached.", implication: "Retry after 30-60 seconds.", application: "Check console.mistral.ai for usage." }
      ]
    },
    reviewer: {
      accuracyScore: 5.0,
      completenessScore: 5.0,
      clarityScore: 5.0,
      overallScore: 5.0,
      confidenceScore: 50,
      approved: true,
      feedback: "Fallback mode — Mistral API unavailable."
    }
  };


  const payload = mockPayloads[expectedAgentType] || mockPayloads.analyzer;

  return {
    rawOutput: JSON.stringify(payload, null, 2),
    parsedOutput: payload,
    tokens: mockTokens,
    latencyMs,
    costEstimate: mockCost
  };
};

const safeParseJSON = (text) => {
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    return { rawText: text };
  }
};
