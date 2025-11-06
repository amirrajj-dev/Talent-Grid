import mongoose from 'mongoose';
import { ENV } from '../configs/env.js';

export const connectToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('already connected to the DB ⚡️');
      return;
    }
    await mongoose.connect(ENV.DB_URI).then(() => {
      console.log('connected to DB succesfully ✨');
    });
  } catch (error) {
    console.log(error);
    console.log('error connecting to the db => ', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};
