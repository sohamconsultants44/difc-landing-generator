/**
 * Read and extract text from Challenges1.pdf using pdfjs-dist
 */

const fs = require('fs');
const path = require('path');

const pdfPath = path.join(__dirname, '..', 'PUBLIC', 'Challenges1.pdf');
const outputPath = path.join(__dirname, '..', 'docs', 'challenge-requirements.txt');

async function readPDF() {
  try {
    console.log('📄 Reading Challenges1.pdf using pdfjs-dist...\n');
    
    // Dynamic import for ESM module
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const pdfjs = pdfjsLib.default || pdfjsLib;
    
    const dataBuffer = fs.readFileSync(pdfPath);
    const uint8Array = new Uint8Array(dataBuffer);
    const loadingTask = pdfjs.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;
    
    let fullText = '';
    console.log(`Total pages: ${pdfDocument.numPages}\n`);
    
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`;
      console.log(`Processed page ${pageNum}/${pdfDocument.numPages}`);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('PDF CONTENT:');
    console.log('='.repeat(80));
    console.log(fullText);
    console.log('='.repeat(80));
    console.log(`\nTotal text length: ${fullText.length} characters`);
    
    // Ensure docs directory exists
    const docsDir = path.dirname(outputPath);
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    // Save extracted text to a file for reference
    fs.writeFileSync(outputPath, fullText, 'utf-8');
    console.log(`\n✅ Text saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error reading PDF:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

readPDF();
