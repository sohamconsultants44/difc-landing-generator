import { Router } from 'express';
import { DataLoaderService } from '../services/data-loader.service.js';

const router = Router();
const dataLoader = new DataLoaderService();

// GET /api/experiments - List A/B tests
router.get('/', async (_req, res) => {
  try {
    const experiments = dataLoader.loadExperimentData();
    res.json({ 
      experiments,
      count: experiments.length,
      message: 'Experiments loaded successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiments' });
  }
});

export default router;

