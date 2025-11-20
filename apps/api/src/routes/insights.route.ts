import { Router } from 'express';
import { CampaignInsightsService } from '../services/campaign-insights.service.js';
import { DataLoaderService } from '../services/data-loader.service.js';

const router = Router();
const insightsService = new CampaignInsightsService();
const dataLoader = new DataLoaderService();

// GET /api/insights - Get campaign insights
router.get('/', async (_req, res) => {
  try {
    const campaignData = dataLoader.loadCampaignData();
    const experimentData = dataLoader.loadExperimentData();
    
    // Transform data to match expected schema
    const transformedCampaigns = campaignData.map((c: any) => ({
      date: c.Date,
      campaignName: c['Campaign Name'],
      campaignID: c['Campaign ID'],
      landingPageURL: c['Landing Page URL'],
      trafficSource: c['Traffic Source'],
      utmSource: c['UTM Source'],
      utmMedium: c['UTM Medium'],
      deviceType: c['Device Type'],
      creativeID: c['Creative ID'],
      creativeName: c['Creative Name'],
      creativeType: c['Creative Type'],
      sessions: Number(c.Sessions) || 0,
      users: Number(c.Users) || 0,
      newUsers: Number(c['New Users']) || 0,
      bounceRate: Number(c['Bounce Rate (%)']) || 0,
      engagementRate: Number(c['Engagement Rate (%)']) || 0,
      avgTimeOnPage: Number(c['Average Time on Page']) || 0,
      scrollDepth: Number(c['Scroll Depth (%)']) || 0,
      ctaClicks: Number(c['Clicks on Primary CTA']) || 0,
      formViews: Number(c['Form Views']) || 0,
      formStarters: Number(c['Form Starters']) || 0,
      formCompletions: Number(c['Form Completions']) || 0,
      conversionCount: Number(c['Primary Conversion Count']) || 0,
      conversionRate: Number(c['Primary Conversion Rate (%)']) || 0,
      costPerSession: Number(c['Cost per Session']) || 0,
      costPerConversion: Number(c['Cost per Conversion']) || 0,
      cac: Number(c['Customer Acquisition Cost (CAC)']) || 0,
      leadToSQL: Number(c['Lead-to-SQL Rate (%)']) || 0,
      sqlToOpportunity: Number(c['SQL-to-Opportunity Rate (%)']) || 0,
    }));

    const insights = insightsService.generateInsights(transformedCampaigns as any, experimentData as any);
    res.json(insights);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;

