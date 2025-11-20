import { CampaignData } from '../../../../packages/shared/src/schemas/campaign-data.schema.js';

/**
 * Transform raw Excel data to CampaignData schema
 */
export function transformCampaignData(rawData: any[]): CampaignData[] {
  return rawData.map((row) => {
    // Handle date conversion (Excel serial date to ISO string)
    let dateValue = row.Date;
    if (typeof dateValue === 'number') {
      // Excel serial date: days since 1900-01-01
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + dateValue * 86400000);
      dateValue = date.toISOString().split('T')[0];
    }

    return {
      date: dateValue?.toString() || '',
      campaignName: row['Campaign Name'] || '',
      campaignID: row['Campaign ID'] || '',
      landingPageURL: row['Landing Page URL'] || '',
      trafficSource: row['Traffic Source'] || '',
      utmSource: row['UTM Source'] || '',
      utmMedium: row['UTM Medium'] || '',
      deviceType: (row['Device Type'] || 'Desktop') as 'Desktop' | 'Mobile' | 'Tablet',
      creativeID: row['Creative ID'] || '',
      creativeName: row['Creative Name'] || '',
      creativeType: (row['Creative Type'] || 'Image') as 'Image' | 'Video' | 'Text',
      sessions: Number(row.Sessions) || 0,
      users: Number(row.Users) || 0,
      newUsers: Number(row['New Users']) || 0,
      bounceRate: Number(row['Bounce Rate (%)']) || 0,
      engagementRate: Number(row['Engagement Rate (%)']) || 0,
      avgTimeOnPage: Number(row['Average Time on Page']) || 0,
      scrollDepth: Number(row['Scroll Depth (%)']) || 0,
      ctaClicks: Number(row['Clicks on Primary CTA']) || 0,
      formViews: Number(row['Form Views']) || 0,
      formStarters: Number(row['Form Starters']) || 0,
      formCompletions: Number(row['Form Completions']) || 0,
      conversionCount: Number(row['Primary Conversion Count']) || 0,
      conversionRate: Number(row['Primary Conversion Rate (%)']) || 0,
      costPerSession: Number(row['Cost per Session']) || 0,
      costPerConversion: Number(row['Cost per Conversion']) || 0,
      cac: Number(row['Customer Acquisition Cost (CAC)']) || 0,
      leadToSQL: Number(row['Lead-to-SQL Rate (%)']) || 0,
      sqlToOpportunity: Number(row['SQL-to-Opportunity Rate (%)']) || 0,
    };
  });
}

/**
 * Transform raw Excel experiment data
 */
export function transformExperimentData(rawData: any[]): any[] {
  // The experiment data structure seems different, need to check actual structure
  return rawData.map((row) => ({
    experimentID: row['Experiment Name'] || row['Lead Gen CTA Position Test'] || '',
    experimentName: row['Experiment Name'] || '',
    // Add more transformations based on actual data structure
    ...row,
  }));
}

