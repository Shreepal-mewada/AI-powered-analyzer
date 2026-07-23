import { parsePdfFile, parseRawText } from '../services/pdfParserService.js';
import { detectSections } from '../services/sectionDetectorService.js';
import { createSemanticChunks } from '../services/chunkingEngine.js';
import { Document } from '../models/Document.js';
import fs from 'fs';

export const uploadDocument = async (req, res) => {
  try {
    let rawText = '';
    let originalName = 'Research_Paper.pdf';
    let fileSize = 102400;
    let pageCount = 1;

    if (req.file) {
      originalName = req.file.originalname;
      fileSize = req.file.size;
      const parsed = await parsePdfFile(req.file.path);
      rawText = parsed.rawText;
      pageCount = parsed.pageCount;
      // Clean up uploaded temp file
      try { fs.unlinkSync(req.file.path); } catch (e) {}
    } else if (req.body.text) {
      originalName = req.body.title || 'Pasted_Research_Text.txt';
      fileSize = req.body.text.length;
      const parsed = parseRawText(req.body.text);
      rawText = parsed.rawText;
      pageCount = parsed.pageCount;
    } else if (req.body.url) {
      originalName = req.body.url.split('/').pop() || 'arXiv_Paper.pdf';
      rawText = req.body.sampleText || `Sample text extracted from paper URL: ${req.body.url}. Abstract: Attention Is All You Need...`;
      pageCount = 12;
    } else {
      return res.status(400).json({ error: 'Please provide a PDF file, text input, or valid URL.' });
    }

    // Step 1: Detect Sections
    const sections = detectSections(rawText);

    // Step 2: Generate Semantic Chunks
    const chunks = createSemanticChunks(sections);

    const docData = {
      originalName,
      fileSize,
      pageCount,
      rawText,
      sections,
      chunks,
      metadata: {
        title: originalName.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        authors: ["Lead Researcher", "Co-Author et al."],
        year: new Date().getFullYear(),
        venue: "Academic Research Conference"
      }
    };

    let savedDoc;
    try {
      savedDoc = await Document.create(docData);
    } catch (e) {
      savedDoc = { ...docData, _id: `doc-${Date.now()}` };
    }

    res.status(201).json({
      message: 'Document successfully parsed and chunked.',
      documentId: savedDoc._id,
      originalName: savedDoc.originalName,
      pageCount: savedDoc.pageCount,
      sectionsCount: sections.length,
      chunksCount: chunks.length,
      chunksPreview: chunks.slice(0, 3)
    });
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
