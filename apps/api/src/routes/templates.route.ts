import { Router } from 'express';
import { TemplateService } from '../services/template-service.js';
import { z } from 'zod';

// Define schema inline to avoid import issues
const InputFormTemplateSchema = z.object({
  templateID: z.string().optional(),
  templateName: z.string(),
  templateVersion: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  description: z.string().optional(),
  campaignObjective: z.enum(['lead-gen', 'sales', 'signup']),
  primaryConversionKPI: z.string(),
  targetAudience: z.string(),
  buyerPersonaKeywords: z.array(z.string()),
  productServiceName: z.string(),
  primaryOffer: z.string(),
  uniqueValueProposition: z.string(),
  top3To5Benefits: z.array(z.string()),
  featureList: z.array(z.string()),
  emotionalTriggers: z.array(z.string()),
  objectionsToOvercome: z.array(z.string()),
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
  primaryCTAText: z.string(),
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
  gdprCCPAConsentText: z.string(),
});

const router = Router();
const templateService = new TemplateService();

// GET /api/templates - List all templates
router.get('/', (_req, res) => {
  try {
    const library = templateService.listTemplates();
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list templates' });
  }
});

// GET /api/templates/:id - Get a specific template
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const template = templateService.loadTemplate(id);
    
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load template' });
  }
});

// POST /api/templates - Create a new template from campaign input
router.post('/', async (req, res) => {
  try {
    const validatedInput = InputFormTemplateSchema.parse(req.body);
    const template = templateService.createTemplateFromInput(
      validatedInput,
      validatedInput.templateName || 'Untitled Template'
    );
    
    templateService.saveTemplate(template);
    
    res.status(201).json({
      success: true,
      template,
      message: 'Template created successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Invalid template data',
        details: error,
      });
    }
    
    res.status(500).json({
      error: 'Failed to create template',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /api/templates/from-campaign - Create template from campaign input
router.post('/from-campaign', async (req, res) => {
  try {
    const { campaignInput, templateName } = req.body;
    
    if (!campaignInput) {
      return res.status(400).json({ error: 'campaignInput is required' });
    }
    
    const template = templateService.createTemplateFromInput(
      campaignInput,
      templateName || `Template from ${campaignInput.campaignName || 'Campaign'}`
    );
    
    templateService.saveTemplate(template);
    
    res.status(201).json({
      success: true,
      template,
      message: 'Template created from campaign input',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create template',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

