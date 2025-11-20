import { Router } from 'express';
import { LandingPageWorkflow } from '../workflows/landing-page-workflow.js';
// Import directly from the file
import { z } from 'zod';

// Define schema inline for now
const CampaignInputSchema = z.object({
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

// POST /api/generate - Generate landing page
const router = Router();

router.post('/', async (req, res) => {
  try {
    // Validate input
    const validatedInput = CampaignInputSchema.parse(req.body);

    // Execute workflow
    const workflow = new LandingPageWorkflow();
    const result = await workflow.execute(validatedInput);

    if (result.errors && result.errors.length > 0) {
      return res.status(500).json({
        error: 'Generation completed with errors',
        errors: result.errors,
        result,
      });
    }

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Invalid input',
        details: error,
      });
    }

    return res.status(500).json({
      error: 'Failed to generate landing page',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
