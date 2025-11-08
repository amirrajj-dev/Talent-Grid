import mongoose from 'mongoose';
import { ENV } from '../configs/env.js';
import logger from '../lib/logger.js';

export const connectToDb = async () => {
  try {
    if (mongoose.connections[0]?.readyState) {
      logger.info('connected to db sucesfully ⚡️');
      console.log('already connected to the DB ⚡️');
      return;
    }
    if (ENV.DB_URI) {
      await mongoose.connect(ENV.DB_URI).then(() => {
        console.log('connected to DB succesfully ✨');
      });
    } else {
      throw new Error('Missing Db_URI');
    }
  } catch (error) {
    logger.error('Error connecting to the database', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    console.log('error connecting to the db => ', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};
