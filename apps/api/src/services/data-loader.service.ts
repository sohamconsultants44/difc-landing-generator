import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');

export class DataLoaderService {
  private campaignDataPath = join(rootDir, 'data', 'campaigns', 'campaign-data.json');
  private experimentDataPath = join(rootDir, 'data', 'experiments', 'experiment-data.json');

  loadCampaignData(): unknown[] {
    try {
      const data = readFileSync(this.campaignDataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load campaign data:', error);
      return [];
    }
  }

  loadExperimentData(): unknown[] {
    try {
      const data = readFileSync(this.experimentDataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load experiment data:', error);
      return [];
    }
  }
}

