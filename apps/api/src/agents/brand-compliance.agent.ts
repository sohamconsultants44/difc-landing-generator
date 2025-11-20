import { llmService } from '../services/llm.service';
import { BrandGuidelines } from '../../../../packages/shared/src/schemas/brand-guidelines.schema.js';

export interface ComplianceReport {
  compliant: boolean;
  issues: Array<{
    type: 'color' | 'font' | 'spacing' | 'logo' | 'tone';
    severity: 'error' | 'warning' | 'info';
    message: string;
    suggestion: string;
  }>;
  score: number; // 0-100
}

export class BrandComplianceAgent {
  async validateCompliance(
    design: {
      colors?: string[];
      fonts?: string[];
      spacing?: unknown;
      logo?: unknown;
      tone?: string;
    },
    guidelines: BrandGuidelines
  ): Promise<ComplianceReport> {
    const systemPrompt = `You are a brand compliance expert. Validate designs against brand guidelines and provide detailed feedback.`;

    const prompt = `Validate the following design against DIFC brand guidelines:

Design:
${JSON.stringify(design, null, 2)}

Brand Guidelines:
${JSON.stringify(guidelines, null, 2)}

Provide a compliance report with:
- compliant: boolean
- issues: array of issues with type, severity, message, and suggestion
- score: number from 0-100

Respond in JSON format.`;

    const report = await llmService.generateJSON<ComplianceReport>(prompt, systemPrompt);
    return report;
  }

  async validateColorPalette(colors: string[], guidelines: BrandGuidelines): Promise<boolean> {
    const primaryColors = guidelines.colors.primary;
    // Check if at least one primary color is used
    return colors.some((color) => primaryColors.includes(color.toUpperCase()));
  }

  async validateTypography(fonts: string[], guidelines: BrandGuidelines): Promise<boolean> {
    const allowedFonts = [
      ...guidelines.typography.headings.family,
      ...guidelines.typography.body.family,
    ];
    return fonts.every((font) =>
      allowedFonts.some((allowed) => font.toLowerCase().includes(allowed.toLowerCase()))
    );
  }
}

