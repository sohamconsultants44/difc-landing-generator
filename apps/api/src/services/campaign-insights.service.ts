import { CampaignData } from '../../../../packages/shared/src/schemas/campaign-data.schema.js';
import { ExperimentData } from '../../../../packages/shared/src/schemas/experiment-data.schema.js';

export interface CampaignInsights {
  topPerformingLayouts: Array<{
    layout: string;
    conversionRate: number;
    sessions: number;
  }>;
  deviceSpecificPatterns: {
    desktop: { avgConversionRate: number; topElements: string[] };
    mobile: { avgConversionRate: number; topElements: string[] };
    tablet: { avgConversionRate: number; topElements: string[] };
  };
  conversionRateBenchmarks: {
    average: number;
    top10Percent: number;
    median: number;
  };
  abTestLearnings: Array<{
    element: string;
    winner: string;
    improvement: number;
    confidence: number;
  }>;
}

export class CampaignInsightsService {
  analyzeTopPerformingLayouts(data: CampaignData[]): CampaignInsights['topPerformingLayouts'] {
    // Group by layout/creative type and calculate average conversion rates
    const layoutGroups = new Map<string, { total: number; count: number; sessions: number }>();

    if (!data || data.length === 0) {
      return [];
    }

    data.forEach((campaign) => {
      if (!campaign) return;
      const key = `${campaign.creativeType || 'Unknown'}-${campaign.deviceType || 'Unknown'}`;
      const existing = layoutGroups.get(key) || { total: 0, count: 0, sessions: 0 };
      layoutGroups.set(key, {
        total: existing.total + (campaign.conversionRate || 0),
        count: existing.count + 1,
        sessions: existing.sessions + (campaign.sessions || 0),
      });
    });

    return Array.from(layoutGroups.entries())
      .map(([layout, stats]) => ({
        layout,
        conversionRate: stats.total / stats.count,
        sessions: stats.sessions,
      }))
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 10);
  }

  analyzeDeviceSpecificPatterns(data: CampaignData[]): CampaignInsights['deviceSpecificPatterns'] {
    const deviceGroups = {
      Desktop: [] as CampaignData[],
      Mobile: [] as CampaignData[],
      Tablet: [] as CampaignData[],
    };

    data.forEach((campaign) => {
      if (!campaign || !campaign.deviceType) return;
      
      // Normalize device type to match expected keys
      const deviceType = campaign.deviceType.charAt(0).toUpperCase() + campaign.deviceType.slice(1) as keyof typeof deviceGroups;
      
      // Only push if deviceType is a valid key
      if (deviceGroups[deviceType]) {
        deviceGroups[deviceType].push(campaign);
      } else {
        // Default to Desktop if unknown device type
        deviceGroups.Desktop.push(campaign);
      }
    });

    const calculateDeviceStats = (deviceData: CampaignData[]) => {
      if (deviceData.length === 0) {
        return { avgConversionRate: 0, topElements: [] };
      }

      const avgConversionRate =
        deviceData.reduce((sum, d) => sum + d.conversionRate, 0) / deviceData.length;

      // Find top performing creative types
      const creativeCounts = new Map<string, number>();
      deviceData.forEach((d) => {
        creativeCounts.set(d.creativeType, (creativeCounts.get(d.creativeType) || 0) + 1);
      });

      const topElements = Array.from(creativeCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type]) => type);

      return { avgConversionRate, topElements };
    };

    return {
      desktop: calculateDeviceStats(deviceGroups.Desktop),
      mobile: calculateDeviceStats(deviceGroups.Mobile),
      tablet: calculateDeviceStats(deviceGroups.Tablet),
    };
  }

  calculateConversionRateBenchmarks(data: CampaignData[]): CampaignInsights['conversionRateBenchmarks'] {
    if (!data || data.length === 0) {
      return { average: 0, top10Percent: 0, median: 0 };
    }
    
    const rates = data.map((d) => d.conversionRate || 0).filter(r => r >= 0).sort((a, b) => a - b);
    
    if (rates.length === 0) {
      return { average: 0, top10Percent: 0, median: 0 };
    }
    
    const average = rates.reduce((sum, r) => sum + r, 0) / rates.length;
    const median = rates[Math.floor(rates.length / 2)] || 0;
    const top10PercentIndex = Math.floor(rates.length * 0.9);
    const top10Percent = rates[top10PercentIndex] || 0;

    return { average, top10Percent, median };
  }

  extractABTestLearnings(experiments: ExperimentData[]): CampaignInsights['abTestLearnings'] {
    if (!experiments || experiments.length === 0) {
      return [];
    }
    
    return experiments
      .filter((e) => e && e.winner)
      .map((experiment) => ({
        element: experiment.testedElement || 'Unknown',
        winner: experiment.variant || 'Unknown',
        improvement: experiment.conversionRate || 0,
        confidence: experiment.confidenceLevel || 0,
      }))
      .sort((a, b) => b.improvement - a.improvement);
  }

  generateInsights(campaignData: CampaignData[], experimentData: ExperimentData[]): CampaignInsights {
    const safeCampaignData = campaignData || [];
    const safeExperimentData = experimentData || [];
    
    return {
      topPerformingLayouts: this.analyzeTopPerformingLayouts(safeCampaignData),
      deviceSpecificPatterns: this.analyzeDeviceSpecificPatterns(safeCampaignData),
      conversionRateBenchmarks: this.calculateConversionRateBenchmarks(safeCampaignData),
      abTestLearnings: this.extractABTestLearnings(safeExperimentData),
    };
  }
}

