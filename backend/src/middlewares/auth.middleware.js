import { requireAuth } from '@clerk/express';
import User from '../models/user.model.js';
import logger from '../lib/logger.js';

export const protectRoute = [
  requireAuth({
    signInUrl: '/signin',
  }),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        logger.error('unauthorized - invalid token (clerkId not found)');
        return res.status(200).json({
          message: 'UNAUTHORIZED',
          success: false,
        });
      }
      const user = await User.findOne({
        clerkId,
      });
      if (!user) {
        logger.error('user not found(auth)');
        return res.status(404).json({
          message: 'user not found',
          success: false,
        });
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(
        'error in route protection middleware => ',
        error instanceof Error ? error.message : error,
      );
      logger.error(
        `error in route protection middleware => ${error instanceof Error ? error.message : error}`,
      );
      res.status(500).json({
        message: 'something goes wrong',
        success: false,
      });
    }
  },
];
