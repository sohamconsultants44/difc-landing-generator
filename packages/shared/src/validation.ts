import { z } from 'zod';

// Campaign Input Schema
export const CampaignInputSchema = z.object({
  campaignObjective: z.enum(['lead-gen', 'sales', 'signup']),
  primaryConversionKPI: z.string().min(1),
  targetAudience: z.string().min(1),
  buyerPersonaKeywords: z.array(z.string()),
  productServiceName: z.string().min(1),
  primaryOffer: z.string().min(1),
  uniqueValueProposition: z.string().min(1),
  top3To5Benefits: z.array(z.string()),
  featureList: z.array(z.string()),
  emotionalTriggers: z.array(z.string()),
  objectionsToOvercome: z.array(z.string()),
  testimonials: z.array(z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    image: z.string().optional(),
  })),
  trustIndicators: z.array(z.object({
    type: z.enum(['badge', 'certification', 'award', 'statistic']),
    label: z.string(),
    value: z.string().optional(),
    image: z.string().optional(),
  })),
  primaryCTAText: z.string().min(1),
  secondaryCTAText: z.string().optional(),
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
  heroImage: z.string().url().optional(),
  secondaryImages: z.array(z.string().url()).optional(),
  videoURL: z.string().url().optional(),
  toneOfVoice: z.enum(['formal', 'friendly', 'playful']),
  brandColorPalette: z.array(z.string()).optional(),
  fontStyleGuide: z.array(z.string()).optional(),
  logo: z.string().url().optional(),
  pageLayoutPreference: z.enum(['scroll', 'modular', 'storytelling']),
  targetSEOKeywords: z.array(z.string()),
  eventTrackingSetup: z.array(z.string()).optional(),
  analyticsIDs: z.object({
    googleAnalytics: z.string().optional(),
    googleTagManager: z.string().optional(),
  }).optional(),
  privacyPolicyURL: z.string().url(),
  gdprCCPAConsentText: z.string().min(1),
});

export type CampaignInput = z.infer<typeof CampaignInputSchema>;

