import express from 'express';
import { ENV } from './configs/env.js';
import path from 'path';

const app = express();

const port = ENV.PORT || 3000;

const __dirname = path.resolve();

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'OK',
    success: true,
    timestamp: new Date().toTimeString(),
  });
});

console.log(__dirname);

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`app is running on port ${port} ✨`);
});
