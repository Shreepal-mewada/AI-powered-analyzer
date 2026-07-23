import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('ℹ️ MONGO_URI not set. Running in-memory database mode for local execution.');
      return false;
    }
    const conn = await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 2500 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection fallback: ${error.message}. Running in-memory state storage mode.`);
    return false;
  }
};

