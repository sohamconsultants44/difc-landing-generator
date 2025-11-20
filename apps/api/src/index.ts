import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import campaignsRouter from './routes/campaigns.route.js';
import experimentsRouter from './routes/experiments.route.js';
import insightsRouter from './routes/insights.route.js';
import brandGuidelinesRouter from './routes/brand-guidelines.route.js';
import generateRouter from './routes/generate.route.js';
import templatesRouter from './routes/templates.route.js';
import explanationRouter from './routes/explanation.route.js';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'DIFC AI Landing Page Generator API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      campaigns: '/api/campaigns',
      experiments: '/api/experiments',
      insights: '/api/insights',
      brandGuidelines: '/api/brand-guidelines',
      generate: '/api/generate (POST)',
      templates: '/api/templates',
      explanation: '/api/explanation',
    },
  });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// API routes
app.get('/api', (_req, res) => {
  res.json({ message: 'DIFC Landing Page Generator API' });
});

app.use('/api/campaigns', campaignsRouter);
app.use('/api/experiments', experimentsRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/brand-guidelines', brandGuidelinesRouter);
app.use('/api/generate', generateRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/explanation', explanationRouter);

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});

