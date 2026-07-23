import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({
  runId: Annotation({ value: (x, y) => y ?? x, default: () => "" }),
  documentId: Annotation({ value: (x, y) => y ?? x, default: () => "" }),
  rawText: Annotation({ value: (x, y) => y ?? x, default: () => "" }),
  pageCount: Annotation({ value: (x, y) => y ?? x, default: () => 1 }),
  sections: Annotation({ value: (x, y) => y ?? x, default: () => [] }),
  chunks: Annotation({ value: (x, y) => y ?? x, default: () => [] }),
  metadata: Annotation({ value: (x, y) => y ?? x, default: () => ({}) }),
  analysis: Annotation({ value: (x, y) => y ?? x, default: () => ({}) }),
  summary: Annotation({ value: (x, y) => y ?? x, default: () => ({}) }),
  citations: Annotation({ value: (x, y) => y ?? x, default: () => [] }),
  insights: Annotation({ value: (x, y) => y ?? x, default: () => [] }),
  reviewScores: Annotation({ value: (x, y) => y ?? x, default: () => ({ overallScore: 0, confidenceScore: 0, approved: false }) }),
  reviewFeedback: Annotation({ value: (x, y) => y ?? x, default: () => "" }),
  retryCount: Annotation({ value: (x, y) => y + (y ? 1 : 0), default: () => 0 }),
  maxRetries: Annotation({ value: (x, y) => y ?? x, default: () => 2 }),
  status: Annotation({ value: (x, y) => y ?? x, default: () => "QUEUED" }),
  activeNode: Annotation({ value: (x, y) => y ?? x, default: () => "Boss" }),
  brief: Annotation({ value: (x, y) => y ?? x, default: () => null }),
  analytics: Annotation({
    value: (x, y) => ({ ...x, ...y }),
    default: () => ({ totalTokens: 0, totalLatencyMs: 0, costEstimate: 0 })
  })
});
