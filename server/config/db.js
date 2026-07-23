import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('ℹ️ MONGO_URI not provided. Running in memory / mock database mode for local execution.');
      return false;
    }
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}. Running in memory state storage fallback.`);
    return false;
  }
};
