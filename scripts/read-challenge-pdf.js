/**
 * Read and extract text from Challenges1.pdf
 */

const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const pdfPath = path.join(__dirname, '..', 'PUBLIC', 'Challenges1.pdf');
const outputPath = path.join(__dirname, '..', 'docs', 'challenge-requirements.txt');

async function readPDF() {
  try {
    console.log('📄 Reading Challenges1.pdf...\n');
    
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    console.log('='.repeat(80));
    console.log('PDF CONTENT:');
    console.log('='.repeat(80));
    console.log(data.text);
    console.log('='.repeat(80));
    console.log(`\nTotal pages: ${data.numpages}`);
    console.log(`Total text length: ${data.text.length} characters`);
    
    // Ensure docs directory exists
    const docsDir = path.dirname(outputPath);
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    // Save extracted text to a file for reference
    fs.writeFileSync(outputPath, data.text, 'utf-8');
    console.log(`\n✅ Text saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error reading PDF:', error);
    process.exit(1);
  }
}

readPDF();

