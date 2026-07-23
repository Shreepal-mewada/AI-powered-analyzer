import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state.js";
import { runParserAgent } from "./parserAgent.js";
import { runAnalyzerAgent } from "./analyzerAgent.js";
import { runSummaryAgent } from "./summaryAgent.js";
import { runCitationAgent } from "./citationAgent.js";
import { runInsightAgent } from "./insightAgent.js";
import { runReviewerAgent } from "./reviewerAgent.js";
import { runRetryManager } from "./retryManager.js";
import { runBriefComposer } from "./briefComposer.js";

// Build and compile the LangGraph Multi-Agent State Machine
export const buildLangGraphWorkflow = () => {
  const workflow = new StateGraph(GraphState)
    .addNode("parser", runParserAgent)
    .addNode("analyzer", runAnalyzerAgent)
    .addNode("summarizer", runSummaryAgent)
    .addNode("citationExtractor", runCitationAgent)
    .addNode("insightGenerator", runInsightAgent)
    .addNode("reviewer", runReviewerAgent)
    .addNode("retryManager", runRetryManager)
    .addNode("briefComposer", runBriefComposer);

  // Define Graph Edges & Parallel Fan-out / Fan-in
  workflow.addEdge(START, "parser");
  
  // Parser passes to parallel sub-agents
  workflow.addEdge("parser", "analyzer");
  workflow.addEdge("parser", "summarizer");
  workflow.addEdge("parser", "citationExtractor");
  workflow.addEdge("parser", "insightGenerator");

  // Parallel sub-agents fan-in to Reviewer Agent
  workflow.addEdge("analyzer", "reviewer");
  workflow.addEdge("summarizer", "reviewer");
  workflow.addEdge("citationExtractor", "reviewer");
  workflow.addEdge("insightGenerator", "reviewer");

  // Conditional Routing from Reviewer based on Quality Score
  workflow.addConditionalEdges(
    "reviewer",
    (state) => {
      const approved = state.reviewScores?.approved;
      const retryCount = state.retryCount || 0;
      const maxRetries = state.maxRetries || 2;

      if (approved || retryCount >= maxRetries) {
        return "proceed";
      } else {
        return "retry";
      }
    },
    {
      proceed: "briefComposer",
      retry: "retryManager"
    }
  );

  // Retry Manager loops back to sub-agents for iteration
  workflow.addEdge("retryManager", "analyzer");
  workflow.addEdge("briefComposer", END);

  return workflow.compile();
};

export const executeLangGraphPipeline = async (initialState) => {
  const app = buildLangGraphWorkflow();
  const result = await app.invoke(initialState);
  return result;
};
