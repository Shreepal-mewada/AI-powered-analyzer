import express from 'express';
import { getBriefById, getAllBriefs } from '../controllers/briefController.js';

const router = express.Router();

router.get('/', getAllBriefs);
router.get('/:id', getBriefById);

export default router;
