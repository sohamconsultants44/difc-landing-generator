import { z } from 'zod';

/**
 * Input Form Template Schema
 * Reusable JSON template for rapid future landing-page generation
 * Based on challenge requirements
 */
export const InputFormTemplateSchema = z.object({
  // Template metadata
  templateID: z.string(),
  templateName: z.string(),
  templateVersion: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  description: z.string().optional(),
  
  // Campaign Objective
  campaignObjective: z.enum(['lead-gen', 'sales', 'signup']),
  
  // Conversion & KPIs
  primaryConversionKPI: z.string().describe('Success metric (e.g., 5% sign-ups)'),
  targetConversionRate: z.number().min(0).max(100).optional(),
  
  // Audience & Targeting
  targetAudience: z.string().describe('Role, industry, pain points'),
  buyerPersonaKeywords: z.array(z.string()).describe('Short targeting phrases'),
  
  // Product/Service
  productServiceName: z.string().describe('Clear campaign offer'),
  primaryOffer: z.string().describe('What the visitor gets (trial, discount)'),
  uniqueValueProposition: z.string().describe('Differentiator vs competitors'),
  top3To5Benefits: z.array(z.string()).describe('Main outcomes/value'),
  featureList: z.array(z.string()).describe('Bullet-pointed functions'),
  
  // Messaging & Psychology
  emotionalTriggers: z.array(z.string()).describe('Trust, urgency, exclusivity'),
  objectionsToOvercome: z.array(z.string()).describe('Doubts to counter'),
  
  // Social Proof
  testimonials: z.array(z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    image: z.string().url().optional(),
  })),
  trustIndicators: z.array(z.object({
    type: z.enum(['badge', 'certification', 'award', 'statistic']),
    label: z.string(),
    value: z.string().optional(),
    image: z.string().url().optional(),
  })),
  
  // CTAs
  primaryCTAText: z.string().describe('Exact main button copy'),
  secondaryCTAText: z.string().optional().describe('Backup call-to-action'),
  
  // Form Configuration
  formFields: z.array(z.object({
    name: z.string(),
    label: z.string(),
    type: z.enum(['text', 'email', 'phone', 'select', 'textarea', 'checkbox']),
    required: z.boolean(),
    placeholder: z.string().optional(),
    options: z.array(z.string()).optional(),
    validation: z.object({
      pattern: z.string().optional(),
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
    }).optional(),
  })),
  apiConfig: z.object({
    endpoint: z.string().url(),
    method: z.enum(['POST', 'PUT']),
    headers: z.record(z.string()).optional(),
  }).optional(),
  
  // Visual Assets
  heroImage: z.string().url().optional().describe('Visual assets'),
  secondaryImages: z.array(z.string().url()).optional(),
  videoURL: z.string().url().optional().describe('Promo/demo video'),
  
  // Branding
  toneOfVoice: z.enum(['formal', 'friendly', 'playful']),
  brandColorPalette: z.array(z.string()).optional().describe('Hex codes'),
  fontStyleGuide: z.array(z.string()).optional().describe('Brand fonts'),
  logo: z.string().url().optional().describe('Campaign logo'),
  
  // Layout & Structure
  pageLayoutPreference: z.enum(['scroll', 'modular', 'storytelling']),
  
  // SEO & Analytics
  targetSEOKeywords: z.array(z.string()).describe('Optimization guide'),
  eventTrackingSetup: z.array(z.string()).optional().describe('Actions to track'),
  analyticsIDs: z.object({
    googleAnalytics: z.string().optional(),
    googleTagManager: z.string().optional(),
  }).optional().describe('GA / GTM IDs'),
  
  // Compliance
  privacyPolicyURL: z.string().url().describe('Compliance'),
  gdprCCPAConsentText: z.string().describe('Legal opt-in copy'),
  
  // Data-Driven Insights (optional - can be auto-filled from campaign data)
  dataInsights: z.object({
    topPerformingLayouts: z.array(z.string()).optional(),
    recommendedDeviceOptimization: z.enum(['desktop', 'mobile', 'tablet', 'all']).optional(),
    suggestedCTAPlacement: z.string().optional(),
    formOptimizationTips: z.array(z.string()).optional(),
  }).optional(),
});

export type InputFormTemplate = z.infer<typeof InputFormTemplateSchema>;

/**
 * Template Library Schema
 * Collection of reusable templates
 */
export const TemplateLibrarySchema = z.object({
  templates: z.array(InputFormTemplateSchema),
  metadata: z.object({
    totalTemplates: z.number(),
    lastUpdated: z.string().datetime(),
    categories: z.array(z.string()).optional(),
  }),
});

export type TemplateLibrary = z.infer<typeof TemplateLibrarySchema>;

