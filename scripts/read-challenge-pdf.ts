#!/usr/bin/env node

/**
 * Read and extract text from Challenges1.pdf
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const pdfPath = join(rootDir, 'PUBLIC', 'Challenges1.pdf');

async function readPDF() {
  try {
    console.log('📄 Reading Challenges1.pdf...\n');
    
    // Dynamic import for pdf-parse
    const pdfParse = (await import('pdf-parse')).default;
    const dataBuffer = readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    console.log('='.repeat(80));
    console.log('PDF CONTENT:');
    console.log('='.repeat(80));
    console.log(data.text);
    console.log('='.repeat(80));
    console.log(`\nTotal pages: ${data.numpages}`);
    console.log(`Total text length: ${data.text.length} characters`);
    
    // Save extracted text to a file for reference
    writeFileSync(
      join(rootDir, 'docs', 'challenge-requirements.txt'),
      data.text,
      'utf-8'
    );
    console.log('\n✅ Text saved to: docs/challenge-requirements.txt');
    
  } catch (error) {
    console.error('❌ Error reading PDF:', error);
    process.exit(1);
  }
}

readPDF();
