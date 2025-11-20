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
    const systemPrompt = `You are an expert campaign analyst. Analyze campaign data and provide actionable insights.`;

    const prompt = `Analyze the following campaign data and provide insights:
    
${JSON.stringify(campaignData, null, 2)}

Provide insights on:
1. Top performing layouts
2. Device-specific patterns
3. Conversion rate benchmarks
4. Actionable recommendations

Respond in JSON format with keys: topPerformingLayouts, deviceSpecificPatterns, conversionRateBenchmarks, recommendations.`;

    const insights = await llmService.generateJSON<CampaignInsights>(prompt, systemPrompt);
    return insights;
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

