import mongoose from 'mongoose';

const AgentOutputSchema = new mongoose.Schema({
  runId: { type: String, required: true, index: true },
  documentId: { type: String, required: true },
  agentType: { 
    type: String, 
    enum: ['parser', 'analyzer', 'summary', 'citation', 'insight', 'reviewer', 'brief_composer'],
    required: true 
  },
  attemptNumber: { type: Number, default: 1 },
  rawOutput: { type: String },
  parsedOutput: { type: mongoose.Schema.Types.Mixed },
  confidenceScore: { type: Number },
  tokens: {
    promptTokens: { type: Number, default: 0 },
    completionTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 }
  },
  latencyMs: { type: Number, default: 0 },
  costEstimate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const AgentOutput = mongoose.model('AgentOutput', AgentOutputSchema);
