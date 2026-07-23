import express from 'express';
import { triggerAgentAnalysis, getAgentRunStatus, getAgentOutputsByRun } from '../controllers/agentController.js';

const router = express.Router();

router.post('/analyze', triggerAgentAnalysis);
router.get('/status/:runId', getAgentRunStatus);
router.get('/outputs/:runId', getAgentOutputsByRun);

export default router;
