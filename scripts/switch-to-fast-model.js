#!/usr/bin/env node

/**
 * Quick script to switch to a faster Ollama model
 * Usage: node scripts/switch-to-fast-model.js [model-name]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env');

// Available fast models
const FAST_MODELS = {
  'phi3': 'phi3:latest', // Already available (2.2 GB, 2-3x faster)
  'phi3-mini': 'phi3:mini-q4_0', // Fastest recommended (1.2 GB, 3-5x faster)
  'tinyllama': 'tinyllama', // Ultra fast (637 MB, 4-6x faster)
  'llama3.2': 'llama3.2:1b', // Balanced (1.3 GB, 3-4x faster)
};

const modelArg = process.argv[2] || 'phi3';

if (!FAST_MODELS[modelArg]) {
  console.error(`❌ Unknown model: ${modelArg}`);
  console.log('\nAvailable models:');
  Object.keys(FAST_MODELS).forEach(key => {
    console.log(`  - ${key} → ${FAST_MODELS[key]}`);
  });
  process.exit(1);
}

const selectedModel = FAST_MODELS[modelArg];

if (!existsSync(envPath)) {
  console.error('❌ .env file not found. Run: npm run setup');
  process.exit(1);
}

try {
  let envContent = readFileSync(envPath, 'utf8');
  
  // Update or add OLLAMA_MODEL
  if (envContent.includes('OLLAMA_MODEL=')) {
    envContent = envContent.replace(
      /OLLAMA_MODEL=.*/,
      `OLLAMA_MODEL=${selectedModel}`
    );
  } else {
    envContent += `\nOLLAMA_MODEL=${selectedModel}\n`;
  }

  // Add performance optimizations if not present
  if (!envContent.includes('OLLAMA_NUM_CTX=')) {
    envContent += `OLLAMA_NUM_CTX=1024\n`;
  }
  if (!envContent.includes('OLLAMA_NUM_THREAD=')) {
    envContent += `OLLAMA_NUM_THREAD=6\n`;
  }

  writeFileSync(envPath, envContent, 'utf8');
  
  console.log(`✅ Switched to ${selectedModel}`);
  console.log(`\n📝 Updated .env file:`);
  console.log(`   OLLAMA_MODEL=${selectedModel}`);
  console.log(`   OLLAMA_NUM_CTX=1024`);
  console.log(`   OLLAMA_NUM_THREAD=6`);
  console.log(`\n🚀 Restart your API server to apply changes:`);
  console.log(`   cd apps/api && npm run dev`);
  console.log(`\n💡 To pull the model (if not already installed):`);
  console.log(`   ollama pull ${selectedModel}`);
  
} catch (error) {
  console.error('❌ Failed to update .env:', error.message);
  process.exit(1);
}

