import { Router } from 'express';
import { DataLoaderService } from '../services/data-loader.service.js';
import { transformCampaignData } from '../utils/data-transformer.js';

const router = Router();
const dataLoader = new DataLoaderService();

// GET /api/campaigns - List campaigns
router.get('/', async (_req, res) => {
  try {
    const rawData = dataLoader.loadCampaignData();
    const campaigns = transformCampaignData(rawData);
    
    res.json({ 
      campaigns,
      count: campaigns.length,
      message: 'Campaigns loaded successfully' 
    });
  } catch (error) {
    console.error('Error loading campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET /api/campaigns/:id - Get campaign details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rawData = dataLoader.loadCampaignData();
    const campaigns = transformCampaignData(rawData);
    const campaign = campaigns.find((c) => c.campaignID === id || c.campaignName === id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

export default router;

