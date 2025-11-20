import { llmService } from '../services/llm.service';
import { CampaignData } from '../../../../packages/shared/src/schemas/campaign-data.schema.js';

export interface CampaignInsights {
  topPerformingLayouts: string[];
  deviceSpecificPatterns: Record<string, unknown>;
  conversionRateBenchmarks: {
    average: number;
    top10Percent: number;
  };
  recommendations: string[];
}

export class CampaignAnalyzerAgent {
  async analyzeCampaignData(campaignData: CampaignData[]): Promise<CampaignInsights> {
    // SKIP LLM if no data - return default insights
    if (!campaignData || campaignData.length === 0) {
      console.log('No campaign data provided, returning default insights');
      return {
        topPerformingLayouts: ['single-column', 'two-column'],
        deviceSpecificPatterns: { mobile: 'compact', desktop: 'spacious' },
        conversionRateBenchmarks: { average: 5.0, top10Percent: 12.0 },
        recommendations: ['Focus on mobile-first design', 'A/B test CTAs', 'Optimize form length'],
      };
    }

    const systemPrompt = `Expert campaign analyst. Quick analysis.`;

    // SHORTER PROMPT - Only analyze first 5 campaigns
    const dataSample = campaignData.slice(0, 5);
    const prompt = `Analyze campaign data:
${JSON.stringify(dataSample.map(d => ({ 
  campaignName: d.campaignName, 
  conversionRate: d.conversionRate, 
  deviceType: d.deviceType,
  bounceRate: d.bounceRate 
})), null, 2)}

Return JSON:
- topPerformingLayouts: [string]
- deviceSpecificPatterns: {device: pattern}
- conversionRateBenchmarks: {average: number, top10Percent: number}
- recommendations: [string]`;

    try {
      const insights = await llmService.generateJSON<CampaignInsights>(prompt, systemPrompt, 50000); // 50s timeout
      return insights;
    } catch (error) {
      // FALLBACK: Calculate basic metrics without LLM
      console.warn('Campaign analysis LLM failed, using calculated metrics:', error);
      const avgConversion = campaignData.reduce((sum, d) => sum + d.conversionRate, 0) / campaignData.length;
      const sorted = [...campaignData].sort((a, b) => b.conversionRate - a.conversionRate);
      const top10Percent = sorted.slice(0, Math.ceil(campaignData.length * 0.1));
      const top10Avg = top10Percent.reduce((sum, d) => sum + d.conversionRate, 0) / top10Percent.length;

      return {
        topPerformingLayouts: ['single-column', 'two-column'],
        deviceSpecificPatterns: { 
          mobile: campaignData.filter(d => d.deviceType === 'Mobile').length > 0 ? 'compact' : 'standard',
          desktop: 'spacious'
        },
        conversionRateBenchmarks: { 
          average: avgConversion || 5.0, 
          top10Percent: top10Avg || 12.0 
        },
        recommendations: ['Focus on mobile-first design', 'A/B test CTAs', 'Optimize form length'],
      };
    }
  }

  async identifyTopPerformingPatterns(data: CampaignData[]): Promise<string[]> {
    const systemPrompt = `You are a data analyst identifying patterns in campaign performance.`;

    const prompt = `Based on the following campaign data, identify the top 5 performing patterns:
    
${JSON.stringify(data.slice(0, 10), null, 2)}

Return a JSON array of pattern descriptions.`;

    const patterns = await llmService.generateJSON<string[]>(prompt, systemPrompt);
    return patterns;
  }

  async calculateMetrics(data: CampaignData[]): Promise<{
    averageConversionRate: number;
    averageBounceRate: number;
    averageCTAClicks: number;
  }> {
    const avgConversionRate = data.reduce((sum, d) => sum + d.conversionRate, 0) / data.length;
    const avgBounceRate = data.reduce((sum, d) => sum + d.bounceRate, 0) / data.length;
    const avgCTAClicks = data.reduce((sum, d) => sum + d.ctaClicks, 0) / data.length;

    return {
      averageConversionRate: avgConversionRate,
      averageBounceRate: avgBounceRate,
      averageCTAClicks: avgCTAClicks,
    };
  }
}

