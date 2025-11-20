#!/usr/bin/env node

/**
 * Load campaign data from Excel file
 */

import XLSX from 'xlsx';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const campaignFile = join(rootDir, 'PUBLIC', 'Sample_campaign_dataset.xlsx');
const experimentFile = join(rootDir, 'PUBLIC', 'Sample_experiment_dataset_Ignyte.xlsx');
const dataDir = join(rootDir, 'data');

async function loadData() {
  console.log('📊 Loading campaign data...\n');

  // Ensure data directories exist
  if (!existsSync(join(dataDir, 'campaigns'))) {
    mkdirSync(join(dataDir, 'campaigns'), { recursive: true });
  }
  if (!existsSync(join(dataDir, 'experiments'))) {
    mkdirSync(join(dataDir, 'experiments'), { recursive: true });
  }

  try {
    // Load campaign data
    if (existsSync(campaignFile)) {
      console.log('📁 Reading campaign dataset...');
      const workbook = XLSX.readFile(campaignFile);
      const sheetNames = workbook.SheetNames;
      console.log(`   Found ${sheetNames.length} sheet(s): ${sheetNames.join(', ')}`);
      
      const firstSheet = workbook.Sheets[sheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      console.log(`   Found ${jsonData.length} rows`);
      console.log(`   Columns: ${Object.keys(jsonData[0] || {}).join(', ')}`);
      
      // Save as JSON for easier processing
      const jsonPath = join(dataDir, 'campaigns', 'campaign-data.json');
      writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
      console.log(`✅ Saved to: ${jsonPath}`);
    } else {
      console.log(`⚠️  Campaign file not found: ${campaignFile}`);
    }

    // Load experiment data
    if (existsSync(experimentFile)) {
      console.log('\n📁 Reading experiment dataset...');
      const workbook = XLSX.readFile(experimentFile);
      const sheetNames = workbook.SheetNames;
      console.log(`   Found ${sheetNames.length} sheet(s): ${sheetNames.join(', ')}`);
      
      const firstSheet = workbook.Sheets[sheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      console.log(`   Found ${jsonData.length} rows`);
      console.log(`   Columns: ${Object.keys(jsonData[0] || {}).join(', ')}`);
      
      // Save as JSON for easier processing
      const jsonPath = join(dataDir, 'experiments', 'experiment-data.json');
      writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
      console.log(`✅ Saved to: ${jsonPath}`);
    } else {
      console.log(`⚠️  Experiment file not found: ${experimentFile}`);
    }

    console.log('\n✅ Data loading complete!');
  } catch (error) {
    console.error('❌ Error loading data:', error);
    process.exit(1);
  }
}

loadData();

