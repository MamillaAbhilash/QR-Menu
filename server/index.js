import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DISHES, INITIAL_TABLES, INITIAL_ORDERS, INITIAL_SERVICE_REQUESTS } from '../src/data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'restaurant.json');

app.use(cors());
app.use(express.json());

function createDefaultSnapshot() {
  return {
    dishes: INITIAL_DISHES,
    tables: INITIAL_TABLES,
    orders: INITIAL_ORDERS,
    serviceRequests: INITIAL_SERVICE_REQUESTS
  };
}

async function readSnapshot() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const defaultSnapshot = createDefaultSnapshot();
      await writeSnapshot(defaultSnapshot);
      return defaultSnapshot;
    }

    throw error;
  }
}

async function writeSnapshot(snapshot) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(snapshot, null, 2));
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'QR Menu API is running' });
});

app.get('/api/restaurant', async (_req, res) => {
  try {
    const snapshot = await readSnapshot();
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load restaurant snapshot' });
  }
});

app.put('/api/restaurant', async (req, res) => {
  try {
    const snapshot = req.body;
    await writeSnapshot(snapshot);
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save restaurant snapshot' });
  }
});

app.post('/api/restaurant/reset', async (_req, res) => {
  try {
    const snapshot = createDefaultSnapshot();
    await writeSnapshot(snapshot);
    res.json(snapshot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset restaurant snapshot' });
  }
});

app.get('/', (_req, res) => {
  res.json({ message: 'QR Menu API ready. Use /api/restaurant for the restaurant snapshot.' });
});

app.listen(PORT, () => {
  console.log(`QR Menu API listening on http://localhost:${PORT}`);
});
