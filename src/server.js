import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { loadConfig, saveConfig } from './utils/config.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../website')));
app.use(express.json());

app.get('/status', (_req, res) => {
  res.json({ status: 'online', service: 'Guardian Shield Website' });
});

app.get('/api/config', (_req, res) => {
  res.json(loadConfig());
});

app.post('/api/config', (req, res) => {
  const updates = req.body;
  const config = saveConfig(updates);
  res.json(config);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});

app.listen(port, () => {
  console.log(`Website is live on http://localhost:${port}`);
});
