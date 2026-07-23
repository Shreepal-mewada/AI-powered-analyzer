import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { uploadDocument, analyzeDocument, getDocumentById } from '../controllers/documentController.js';

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  try {
    fs.mkdirSync('uploads', { recursive: true });
  } catch (e) {}
}

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('file'), uploadDocument);
router.post('/analyze', analyzeDocument);
router.get('/:id', getDocumentById);

export default router;
