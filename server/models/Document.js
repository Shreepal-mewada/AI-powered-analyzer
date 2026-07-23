import mongoose from 'mongoose';

const ChunkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  section: { type: String, required: true },
  text: { type: String, required: true },
  tokenCount: { type: Number, required: true },
  chunkIndex: { type: Number, required: true }
});

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  startIndex: { type: Number },
  endIndex: { type: Number }
});

const DocumentSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  pageCount: { type: Number, default: 1 },
  rawText: { type: String, required: true },
  sections: [SectionSchema],
  chunks: [ChunkSchema],
  metadata: {
    title: { type: String },
    authors: [{ type: String }],
    year: { type: Number },
    venue: { type: String },
    abstract: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Document = mongoose.model('Document', DocumentSchema);
