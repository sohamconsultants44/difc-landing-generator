import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import campaignsRouter from './routes/campaigns.route.js';
import experimentsRouter from './routes/experiments.route.js';
import insightsRouter from './routes/insights.route.js';
import brandGuidelinesRouter from './routes/brand-guidelines.route.js';
import generateRouter from './routes/generate.route.js';
import templatesRouter from './routes/templates.route.js';
import explanationRouter from './routes/explanation.route.js';

// Load .env from project root (not apps/api)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..', '..');
dotenv.config({ path: join(rootDir, '.env') });

// Log LLM provider on startup
console.log(`[API Server] LLM_PROVIDER: ${process.env.LLM_PROVIDER || 'ollama'}`);
if (process.env.LLM_PROVIDER === 'mock') {
  console.log(`[API Server] ⚡ Mock provider active - instant responses!`);
}

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

// Ollama health check endpoint
app.get('/health/ollama', async (_req, res) => {
  try {
    // First check if Ollama API is accessible (fast check)
    const ollamaCheck = await fetch('http://localhost:11434/api/tags').catch(() => null);
    if (!ollamaCheck || !ollamaCheck.ok) {
      return res.status(503).json({ 
        status: 'error', 
        ollama: 'not accessible',
        error: 'Ollama API not responding',
        troubleshooting: 'Check if Ollama is running: ollama list'
      });
    }

    // Then try a very quick LLM test with longer timeout
    const { llmService } = await import('./services/llm.service.js');
    const testPrompt = 'Say "ok"';
    const response = await Promise.race([
      llmService.generate(testPrompt, undefined, 15000), // 15 second timeout (more realistic)
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error('timeout')), 15000))
    ]);
    res.json({ 
      status: 'ok', 
      ollama: 'connected',
      model: process.env.OLLAMA_MODEL || 'phi3:latest',
      response: response.substring(0, 50),
      responseTime: '< 15s'
    });
  } catch (error) {
    // If LLM call fails but API is accessible, still return partial success
    const ollamaCheck = await fetch('http://localhost:11434/api/tags').catch(() => null);
    if (ollamaCheck && ollamaCheck.ok) {
      return res.json({ 
        status: 'partial', 
        ollama: 'api accessible but LLM slow',
        model: process.env.OLLAMA_MODEL || 'phi3:latest',
        error: error instanceof Error ? error.message : 'Unknown error',
        note: 'Ollama API is running but model response is slow. This is normal for first request.'
      });
    }
    
    res.status(503).json({ 
      status: 'error', 
      ollama: 'not responding',
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: 'Check if Ollama is running: ollama list'
    });
  }
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

