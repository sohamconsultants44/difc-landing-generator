import { LLMService } from './llm.service.js';
import { DataLoaderService } from './data-loader.service.js';
import { CampaignInsightsService } from './campaign-insights.service.js';
import PDFDocument from 'pdfkit';

/**
 * Service for generating explanation PDFs
 * Maps each design/content choice to data insights
 */
export interface DesignDecision {
  section: string;
  element: string;
  decision: string;
  rationale: string;
  dataSource: string;
  supportingData?: any;
}

export interface ExplanationReport {
  campaignName: string;
  generatedAt: string;
  decisions: DesignDecision[];
  dataUsageSummary: {
    campaignFieldsUsed: string[];
    experimentResultsUsed: string[];
    insightsGenerated: string[];
    assumptions: string[];
  };
  overallRationale: string;
}

export class ExplanationPDFService {
  private llmService: LLMService;
  private dataLoader: DataLoaderService;
  private insightsService: CampaignInsightsService;

  constructor() {
    this.llmService = new LLMService();
    this.dataLoader = new DataLoaderService();
    this.insightsService = new CampaignInsightsService();
  }

  /**
   * Generate explanation report for a landing page generation
   */
  async generateExplanationReport(
    campaignInput: any,
    generatedPage: any,
    designDecisions: DesignDecision[]
  ): Promise<ExplanationReport> {
    // Load campaign data for insights
    const campaignData = this.dataLoader.loadCampaignData() || [];
    const experimentData = this.dataLoader.loadExperimentData() || [];
    
    // Generate insights
    const insights = this.insightsService.generateInsights(
      campaignData as any,
      experimentData as any
    ) || {};

    // Track data usage
    const campaignFieldsUsed = this.extractCampaignFieldsUsed(campaignData, campaignInput || {});
    const experimentResultsUsed = this.extractExperimentResultsUsed(experimentData);
    const insightsGenerated = this.extractInsightsGenerated(insights);
    const assumptions = this.extractAssumptions(campaignInput || {}, insights);

    // Generate overall rationale using LLM
    const overallRationale = await this.generateOverallRationale(
      campaignInput,
      designDecisions,
      insights
    );

    return {
      campaignName: campaignInput.campaignName || campaignInput.productServiceName || 'Unknown Campaign',
      generatedAt: new Date().toISOString(),
      decisions: designDecisions,
      dataUsageSummary: {
        campaignFieldsUsed,
        experimentResultsUsed,
        insightsGenerated,
        assumptions,
      },
      overallRationale,
    };
  }

  /**
   * Generate PDF from explanation report using PDFKit
   */
  async generatePDF(report: ExplanationReport): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];
        
        doc.on('data', (chunk: Buffer) => buffers.push(chunk));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });
        doc.on('error', reject);
        
        // Header
        doc.fontSize(20).text('LANDING PAGE GENERATION', { align: 'center' });
        doc.fontSize(16).text('EXPLANATION REPORT', { align: 'center' });
        doc.moveDown();
        
        // Campaign Info
        doc.fontSize(14).text(`Campaign: ${report.campaignName}`, { underline: true });
        doc.fontSize(10).text(`Generated: ${new Date(report.generatedAt).toLocaleString()}`);
        doc.moveDown(2);
        
        // Design Decisions
        doc.fontSize(16).text('DESIGN DECISIONS & RATIONALE', { underline: true });
        doc.moveDown();
        
        report.decisions.forEach((decision, index) => {
          doc.fontSize(12).text(`${index + 1}. ${decision.section} - ${decision.element}`, { continued: false });
          doc.fontSize(10).text(`   Decision: ${decision.decision}`);
          doc.text(`   Rationale: ${decision.rationale}`);
          doc.text(`   Data Source: ${decision.dataSource}`);
          if (decision.supportingData) {
            doc.text(`   Supporting Data: ${JSON.stringify(decision.supportingData)}`);
          }
          doc.moveDown();
        });
        
        // Data Usage Summary
        doc.addPage();
        doc.fontSize(16).text('DATA USAGE SUMMARY', { underline: true });
        doc.moveDown();
        
        doc.fontSize(12).text('Campaign Fields Used:', { underline: true });
        report.dataUsageSummary.campaignFieldsUsed.forEach(field => {
          doc.fontSize(10).text(`  • ${field}`);
        });
        doc.moveDown();
        
        doc.fontSize(12).text('Experiment Results Used:', { underline: true });
        report.dataUsageSummary.experimentResultsUsed.forEach(result => {
          doc.fontSize(10).text(`  • ${result}`);
        });
        doc.moveDown();
        
        doc.fontSize(12).text('Insights Generated:', { underline: true });
        report.dataUsageSummary.insightsGenerated.forEach(insight => {
          doc.fontSize(10).text(`  • ${insight}`);
        });
        doc.moveDown();
        
        doc.fontSize(12).text('Assumptions:', { underline: true });
        report.dataUsageSummary.assumptions.forEach(assumption => {
          doc.fontSize(10).text(`  • ${assumption}`);
        });
        doc.moveDown();
        
        // Overall Rationale
        doc.addPage();
        doc.fontSize(16).text('OVERALL RATIONALE', { underline: true });
        doc.moveDown();
        doc.fontSize(11).text(report.overallRationale, { align: 'justify' });
        
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private formatReportAsText(report: ExplanationReport): string {
    let content = `LANDING PAGE GENERATION EXPLANATION REPORT\n`;
    content += `==========================================\n\n`;
    content += `Campaign: ${report.campaignName}\n`;
    content += `Generated At: ${new Date(report.generatedAt).toLocaleString()}\n\n`;
    
    content += `DESIGN DECISIONS & RATIONALE\n`;
    content += `============================\n\n`;
    
    report.decisions.forEach((decision, index) => {
      content += `${index + 1}. ${decision.section} - ${decision.element}\n`;
      content += `   Decision: ${decision.decision}\n`;
      content += `   Rationale: ${decision.rationale}\n`;
      content += `   Data Source: ${decision.dataSource}\n`;
      if (decision.supportingData) {
        content += `   Supporting Data: ${JSON.stringify(decision.supportingData, null, 2)}\n`;
      }
      content += `\n`;
    });

    content += `DATA USAGE SUMMARY\n`;
    content += `==================\n\n`;
    content += `Campaign Fields Used:\n`;
    report.dataUsageSummary.campaignFieldsUsed.forEach(field => {
      content += `  - ${field}\n`;
    });
    content += `\nExperiment Results Used:\n`;
    report.dataUsageSummary.experimentResultsUsed.forEach(result => {
      content += `  - ${result}\n`;
    });
    content += `\nInsights Generated:\n`;
    report.dataUsageSummary.insightsGenerated.forEach(insight => {
      content += `  - ${insight}\n`;
    });
    content += `\nAssumptions:\n`;
    report.dataUsageSummary.assumptions.forEach(assumption => {
      content += `  - ${assumption}\n`;
    });

    content += `\nOVERALL RATIONALE\n`;
    content += `=================\n\n`;
    content += report.overallRationale;

    return content;
  }

  private extractCampaignFieldsUsed(campaignData: any[], campaignInput: any): string[] {
    const fields: string[] = [];
    if (campaignData && campaignData.length > 0) {
      fields.push('Conversion Rate', 'Bounce Rate', 'Device Type', 'Traffic Source');
    }
    return fields;
  }

  private extractExperimentResultsUsed(experimentData: any[]): string[] {
    const results: string[] = [];
    if (experimentData && experimentData.length > 0) {
      results.push('CTA Position Tests', 'Layout Variations');
    }
    return results;
  }

  private extractInsightsGenerated(insights: any): string[] {
    const generated: string[] = [];
    if (insights && insights.topPerformingLayouts && insights.topPerformingLayouts.length > 0) {
      generated.push('Top Performing Layouts');
    }
    if (insights && insights.deviceSpecificPatterns) {
      generated.push('Device-Specific Optimization Patterns');
    }
    if (insights && insights.conversionRateBenchmarks) {
      generated.push('Conversion Rate Benchmarks');
    }
    return generated;
  }

  private extractAssumptions(campaignInput: any, insights: any): string[] {
    const assumptions: string[] = [];
    
    if (!campaignInput || !campaignInput.targetAudience) {
      assumptions.push('Target audience inferred from campaign data');
    }
    if (!campaignInput || !campaignInput.brandColorPalette || campaignInput.brandColorPalette.length === 0) {
      assumptions.push('Using default DIFC brand colors (#001E60, #FFFFFF)');
    }
    if (!insights || !insights.topPerformingLayouts || insights.topPerformingLayouts.length === 0) {
      assumptions.push('No historical layout data available, using best practices');
    }
    
    return assumptions;
  }

  private async generateOverallRationale(
    campaignInput: any,
    decisions: DesignDecision[],
    insights: any
  ): Promise<string> {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error('LLM timeout')), 10000); // 10 second timeout
      });

      const prompt = `Generate a comprehensive rationale explaining how the landing page design decisions were made based on the campaign data and insights.

Campaign Objective: ${campaignInput?.campaignObjective || 'lead-gen'}
Target Audience: ${campaignInput?.targetAudience || 'General audience'}
Primary Conversion KPI: ${campaignInput?.primaryConversionKPI || 'Not specified'}

Key Insights:
- Top Performing Layouts: ${Array.isArray(insights?.topPerformingLayouts) ? insights.topPerformingLayouts.join(', ') : 'N/A'}
- Desktop Conversion Rate: ${insights?.deviceSpecificPatterns?.desktop?.avgConversionRate || 'N/A'}%
- Mobile Conversion Rate: ${insights?.deviceSpecificPatterns?.mobile?.avgConversionRate || 'N/A'}%

Design Decisions Made: ${decisions?.length || 0} total decisions across various sections.

Provide a clear, professional explanation of how data-driven insights informed the design choices.`;

      // Race between LLM call and timeout
      const rationalePromise = this.llmService.generate(
        'You are an expert at explaining data-driven design decisions. Provide clear, professional rationale.',
        prompt
      );

      return await Promise.race([rationalePromise, timeoutPromise]);
    } catch (error) {
      console.error('Error generating rationale:', error);
      // Return a default rationale if LLM fails or times out
      return `Design decisions were made based on campaign data insights and best practices. 

The landing page was optimized for conversion using data-driven patterns from historical campaigns:
- Desktop conversion rate: ${insights?.deviceSpecificPatterns?.desktop?.avgConversionRate || 'N/A'}%
- Mobile conversion rate: ${insights?.deviceSpecificPatterns?.mobile?.avgConversionRate || 'N/A'}%
- Top performing layouts identified from ${insights?.topPerformingLayouts?.length || 0} layout variations

${decisions?.length || 0} design decisions were made across various sections, each informed by A/B test results and campaign performance data.`;
    }
  }
}

