import express from 'express';
import { ENV } from './configs/env.js';
import path from 'path';
import { connectToDb } from './db/db.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './lib/logger.js';

const app = express();

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.json());

const port = ENV.PORT || 3000;

const __dirname = path.resolve();

app.get('/health', (req, res) => {
  logger.info('Health Check');
  res.status(200).json({
    message: 'OK',
    success: true,
    timestamp: new Date().toTimeString(),
  });
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await mongoose.connection.close().catch(() => {});
    await connectToDb();
    app.listen(port, async () => {
      console.log(`app is running on port ${port} ✨`);
    });
  } catch (error) {
    console.log(
      '🌋something goes wrong starting the server => ',
      error instanceof Error ? error.message : error,
    );
  }
};

startServer();

const closeConnection = async (message) => {
  console.log(message);
  await mongoose.connection.close();
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};

process.on('SIGINT', async () => {
  await closeConnection('Shutting down gracefully...');
});

process.on('SIGTERM', async () => {
  await closeConnection('Received SIGTERM, shutting down gracefully...');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});
