import express from 'express';
import * as ChatController from '../controllers/chat.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/token', protectRoute, ChatController.getStreamToken);

export default router;
