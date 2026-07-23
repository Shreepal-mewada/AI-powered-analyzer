import mongoose from 'mongoose';

const AgentRunSchema = new mongoose.Schema({
  runId: { type: String, required: true, unique: true },
  documentId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['QUEUED', 'PARSING', 'CHUNKING', 'ANALYZING', 'REVIEWING', 'RETRYING', 'COMPLETED', 'FAILED'],
    default: 'QUEUED' 
  },
  activeNode: { type: String, default: 'Boss' },
  progressPercent: { type: Number, default: 0 },
  retryCount: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 2 },
  overallScore: { type: Number, default: 0 },
  confidenceScore: { type: Number, default: 0 },
  totalTokens: { type: Number, default: 0 },
  latencyMs: { type: Number, default: 0 },
  costEstimate: { type: Number, default: 0 },
  errorDetails: { type: String },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

export const AgentRun = mongoose.model('AgentRun', AgentRunSchema);
