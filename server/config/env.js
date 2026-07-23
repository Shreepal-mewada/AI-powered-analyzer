import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/research_analyzer',
  mistralApiKey: process.env.MISTRAL_API_KEY || '',
  defaultModel: process.env.MISTRAL_MODEL || 'mistral-small-latest',
  reviewThreshold: parseFloat(process.env.REVIEW_THRESHOLD || '7.0'),
  maxRetries: parseInt(process.env.MAX_RETRIES || '2', 10)
};
