import logger from '../lib/logger.js';
import { chatClient } from '../lib/stream.js';

export const getStreamToken = async (req, res) => {
  try {
    const token = chatClient.createToken(req.user.clerkId);
    logger.info('stream token generated succesfully');
    res.status(200).json({
      message: 'token generated succesfully',
      success: true,
      data: {
        token,
        userId: req.user.clerkId,
        username: req.user.name,
        userImage: req.user.image,
      },
    });
  } catch (error) {
    logger.error(
      `error in the getStreamToken function => ${error instanceof Error ? error.message : error}`,
    );
    return res.status(500).json({
      message: 'internal server error',
      success: false,
    });
  }
};
