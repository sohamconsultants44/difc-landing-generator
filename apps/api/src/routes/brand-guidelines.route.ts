import { Router } from 'express';

const router = Router();

// GET /api/brand-guidelines - Get brand guidelines
router.get('/', async (_req, res) => {
  try {
    // DIFC Brand Guidelines (from planning doc)
    const guidelines = {
      colors: {
        primary: ['#001E60', '#FFFFFF'],
        secondary: [],
        accent: [],
        neutral: [],
      },
      typography: {
        headings: {
          family: ['Helvetica Neue', 'Arial'],
          sizes: [32, 28, 24, 20, 18],
          weights: [700, 600, 400],
          lineHeights: [1.2, 1.4],
        },
        body: {
          family: ['Helvetica Neue', 'Arial'],
          sizes: [16, 14, 12],
          weights: [400, 300],
          lineHeights: [1.6, 1.5],
        },
        captions: {
          family: ['Helvetica Neue', 'Arial'],
          sizes: [12, 10],
          weights: [400, 300],
          lineHeights: [1.4],
        },
      },
      logo: {
        primary: '',
        secondary: '',
        minWidth: 120,
        clearSpace: 20,
      },
      toneOfVoice: 'Professional, trustworthy, innovative',
    };

    res.json(guidelines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brand guidelines' });
  }
});

export default router;

