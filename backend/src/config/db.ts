import mongoose from 'mongoose';
import { LocalStore } from '../data/store.js';

export const connectDB = async () => {
  LocalStore.initializeDemoData();
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/comiccraft';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('⚡ [Database] MongoDB Connected Successfully');
  } catch (error: any) {
    console.log('ℹ️ [Database] MongoDB connection bypassed. Using high-performance Local Store engine.');
  }
};
