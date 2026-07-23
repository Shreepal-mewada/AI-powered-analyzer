import mongoose from 'mongoose';

const ResearchBriefSchema = new mongoose.Schema({
  documentId: { type: String, required: true },
  runId: { type: String, required: true },
  metadata: {
    title: { type: String },
    authors: [{ type: String }],
    year: { type: Number },
    venue: { type: String },
    abstract: { type: String }
  },
  executiveSummary: { type: String, required: true },
  researchAnalysis: {
    problemStatement: { type: String },
    coreHypothesis: { type: String },
    methodology: { type: String },
    experiments: { type: String },
    keyFindings: { type: String }
  },
  citations: [{
    title: { type: String },
    authors: { type: String },
    year: { type: String },
    relevance: { type: String }
  }],
  keyInsights: [{
    takeaway: { type: String },
    implication: { type: String },
    application: { type: String }
  }],
  reviewScores: {
    accuracyScore: { type: Number },
    completenessScore: { type: Number },
    clarityScore: { type: Number },
    overallScore: { type: Number },
    confidenceScore: { type: Number }
  },
  markdownContent: { type: String, required: true },
  analytics: {
    pages: { type: Number },
    chunks: { type: Number },
    agentsInvoked: { type: Number },
    retriesTriggered: { type: Number },
    totalTokens: { type: Number },
    totalLatencyMs: { type: Number },
    costEstimate: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

export const ResearchBrief = mongoose.model('ResearchBrief', ResearchBriefSchema);
