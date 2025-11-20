#!/usr/bin/env node

/**
 * Verify Ollama installation and connection
 */

import { ChatOllama } from '@langchain/ollama';

async function verifyOllama() {
  console.log('🔍 Verifying Ollama connection...\n');

  const model = process.env.OLLAMA_MODEL || 'mistral';
  const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

  console.log(`Model: ${model}`);
  console.log(`Base URL: ${baseUrl}\n`);

  try {
    const ollama = new ChatOllama({
      baseUrl,
      model,
      temperature: 0.7,
    });

    console.log('Testing connection...');
    const response = await ollama.invoke('Say "Hello, Ollama is working!" in one sentence.');
    
    console.log('✅ Ollama connection successful!\n');
    console.log('Response:', response.content);
    console.log('\n✅ Your Ollama setup is ready to use!');
  } catch (error) {
    console.error('❌ Ollama connection failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure Ollama is running: ollama serve');
    console.error('2. Check if the model is available: ollama list');
    console.error('3. Verify OLLAMA_BASE_URL in your .env file');
    process.exit(1);
  }
}

verifyOllama().catch(console.error);

