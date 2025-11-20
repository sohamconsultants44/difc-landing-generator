import { InputFormTemplate, TemplateLibrary } from '../../../../packages/shared/src/schemas/input-template.schema.js';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');
const templatesDir = join(rootDir, 'data', 'templates');

export class TemplateService {
  private ensureTemplatesDir(): void {
    if (!existsSync(templatesDir)) {
      mkdirSync(templatesDir, { recursive: true });
    }
  }

  /**
   * Save a template to the template library
   */
  saveTemplate(template: InputFormTemplate): void {
    this.ensureTemplatesDir();
    const filePath = join(templatesDir, `${template.templateID}.json`);
    writeFileSync(filePath, JSON.stringify(template, null, 2), 'utf-8');
  }

  /**
   * Load a template by ID
   */
  loadTemplate(templateID: string): InputFormTemplate | null {
    const filePath = join(templatesDir, `${templateID}.json`);
    if (!existsSync(filePath)) {
      return null;
    }
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as InputFormTemplate;
  }

  /**
   * List all templates
   */
  listTemplates(): TemplateLibrary {
    try {
      this.ensureTemplatesDir();
      const files = existsSync(templatesDir) 
        ? readdirSync(templatesDir).filter((f: string) => f.endsWith('.json'))
        : [];
      
      const templates = files.map((file: string) => {
        try {
          const content = readFileSync(join(templatesDir, file), 'utf-8');
          return JSON.parse(content) as InputFormTemplate;
        } catch (error) {
          console.error(`Error reading template file ${file}:`, error);
          return null;
        }
      }).filter((t: InputFormTemplate | null) => t !== null) as InputFormTemplate[];

      return {
        templates,
        metadata: {
          totalTemplates: templates.length,
          lastUpdated: new Date().toISOString(),
          categories: ['lead-gen', 'sales', 'signup'],
        },
      };
    } catch (error) {
      console.error('Error listing templates:', error);
      return {
        templates: [],
        metadata: {
          totalTemplates: 0,
          lastUpdated: new Date().toISOString(),
          categories: ['lead-gen', 'sales', 'signup'],
        },
      };
    }
  }

  /**
   * Create a template from campaign input
   */
  createTemplateFromInput(campaignInput: any, templateName: string): InputFormTemplate {
    return {
      templateID: `template-${Date.now()}`,
      templateName,
      templateVersion: '1.0.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: `Template generated from campaign: ${campaignInput.campaignName || 'Unknown'}`,
      campaignObjective: campaignInput.campaignObjective || 'lead-gen',
      primaryConversionKPI: campaignInput.primaryConversionKPI || '',
      targetAudience: campaignInput.targetAudience || '',
      buyerPersonaKeywords: campaignInput.buyerPersonaKeywords || [],
      productServiceName: campaignInput.productServiceName || '',
      primaryOffer: campaignInput.primaryOffer || '',
      uniqueValueProposition: campaignInput.uniqueValueProposition || '',
      top3To5Benefits: campaignInput.top3To5Benefits || [],
      featureList: campaignInput.featureList || [],
      emotionalTriggers: campaignInput.emotionalTriggers || [],
      objectionsToOvercome: campaignInput.objectionsToOvercome || [],
      testimonials: campaignInput.testimonials || [],
      trustIndicators: campaignInput.trustIndicators || [],
      primaryCTAText: campaignInput.primaryCTAText || '',
      secondaryCTAText: campaignInput.secondaryCTAText,
      formFields: campaignInput.formFields || [],
      apiConfig: campaignInput.apiConfig,
      heroImage: campaignInput.heroImage,
      secondaryImages: campaignInput.secondaryImages,
      videoURL: campaignInput.videoURL,
      toneOfVoice: campaignInput.toneOfVoice || 'friendly',
      brandColorPalette: campaignInput.brandColorPalette,
      fontStyleGuide: campaignInput.fontStyleGuide,
      logo: campaignInput.logo,
      pageLayoutPreference: campaignInput.pageLayoutPreference || 'scroll',
      targetSEOKeywords: campaignInput.targetSEOKeywords || [],
      eventTrackingSetup: campaignInput.eventTrackingSetup,
      analyticsIDs: campaignInput.analyticsIDs,
      privacyPolicyURL: campaignInput.privacyPolicyURL || '',
      gdprCCPAConsentText: campaignInput.gdprCCPAConsentText || '',
    };
  }
}

