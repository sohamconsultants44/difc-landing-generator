#!/usr/bin/env node

/**
 * Start MCP servers
 * This script starts all MCP servers for the landing page generator
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const servers = [
  { name: 'campaign-data', path: join(rootDir, 'mcp-servers', 'campaign-data') },
  { name: 'brand-guidelines', path: join(rootDir, 'mcp-servers', 'brand-guidelines') },
  { name: 'design-system', path: join(rootDir, 'mcp-servers', 'design-system') },
  { name: 'seo-analyzer', path: join(rootDir, 'mcp-servers', 'seo-analyzer') },
];

console.log('🚀 Starting MCP servers...\n');

servers.forEach((server) => {
  console.log(`Starting ${server.name}...`);
  const proc = spawn('node', ['index.js'], {
    cwd: server.path,
    stdio: 'inherit',
  });

  proc.on('error', (error) => {
    console.error(`Error starting ${server.name}:`, error);
  });
});

