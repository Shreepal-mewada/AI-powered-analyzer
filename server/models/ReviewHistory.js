import mongoose from 'mongoose';

const ReviewHistorySchema = new mongoose.Schema({
  runId: { type: String, required: true },
  iteration: { type: Number, required: true },
  targetAgent: { type: String, required: true },
  scores: {
    accuracy: { type: Number, required: true },
    completeness: { type: Number, required: true },
    clarity: { type: Number, required: true },
    overall: { type: Number, required: true }
  },
  confidence: { type: Number, required: true },
  approved: { type: Boolean, required: true },
  feedback: { type: String },
  revisedPromptSent: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const ReviewHistory = mongoose.model('ReviewHistory', ReviewHistorySchema);
