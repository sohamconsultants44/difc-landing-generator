#!/usr/bin/env node

/**
 * Create .env file if it doesn't exist
 */

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env');

if (existsSync(envPath)) {
  console.log('✅ .env file already exists');
  process.exit(0);
}

const envContent = `# Ollama Configuration (Local LLM - No API Key Required)
# Available models: mistral:latest, phi3:latest, llama3.1:8b
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral

# Optional: Database Configuration
DATABASE_URL=file:./dev.db

# Optional: Redis Configuration (for caching)
# REDIS_URL=redis://localhost:6379

# Optional: Deployment Tokens (only if using automated deployment)
# VERCEL_TOKEN=your_vercel_token_here
# AZURE_CLIENT_ID=your_azure_client_id
# AZURE_CLIENT_SECRET=your_azure_client_secret
# AZURE_TENANT_ID=your_azure_tenant_id

# Application Configuration
NODE_ENV=development
PORT=3000
API_PORT=3001

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
`;

try {
  writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ Created .env file successfully');
  console.log(`📝 Location: ${envPath}`);
} catch (error) {
  console.error('❌ Failed to create .env file:', error.message);
  process.exit(1);
}

