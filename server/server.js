import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import documentRoutes from './routes/documentRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import briefRoutes from './routes/briefRoutes.js';

const app = express();

// Explicit CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Fallback manual CORS header middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'AI-Powered Research Paper Analyzer Backend',
    timestamp: new Date(),
    llmConfigured: Boolean(config.mistralApiKey)
  });
});

// API Routes
app.use('/api/documents', documentRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/briefs', briefRoutes);

// Connect DB & Start Express Server
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Health Check: http://localhost:${config.port}/api/health`);
  });
});
