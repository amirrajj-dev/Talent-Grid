import { StreamChat } from 'stream-chat';
import { ENV } from '../configs/env.js';
import logger from './logger.js';

export const chatClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    logger.info('stream user upserted succcesfully');
  } catch (error) {
    console.log('error upserting stream user => ', error instanceof Error ? error.message : error);
    logger.error(
      `error upserting user to stream dashboard => ${error instanceof Error ? error.message : error}`,
    );
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    logger.info('user deleted from stream succesfully');
  } catch (error) {
    console.log('error upserting stream user => ', error instanceof Error ? error.message : error);
    logger.error(
      `error upserting user to stream dashboard => ${error instanceof Error ? error.message : error}`,
    );
  }
};
