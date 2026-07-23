import express from 'express';
import multer from 'multer';
import { uploadDocument, getDocumentById } from '../controllers/documentController.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/:id', getDocumentById);

export default router;
