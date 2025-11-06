import express from 'express';
import { ENV } from './configs/env.js';

const app = express();

const port = ENV.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'OK',
    success: true,
    timestamp: new Date().toTimeString(),
  });
});

app.listen(port, () => {
  console.log(`app is running on port ${port} ✨`);
});
