// Campaign Input Types
export interface CampaignInput {
  // Campaign Details
  campaignObjective: 'lead-gen' | 'sales' | 'signup';
  primaryConversionKPI: string;
  targetAudience: string;
  buyerPersonaKeywords: string[];

  // Product/Service
  productServiceName: string;
  primaryOffer: string;
  uniqueValueProposition: string;
  top3To5Benefits: string[];
  featureList: string[];

  // Messaging
  emotionalTriggers: string[];
  objectionsToOvercome: string[];
  testimonials: Testimonial[];
  trustIndicators: TrustIndicator[];

  // CTAs
  primaryCTAText: string;
  secondaryCTAText: string;

  // Form
  formFields: FormField[];
  apiConfig?: APIConfig;

  // Assets
  heroImage?: string;
  secondaryImages?: string[];
  videoURL?: string;

  // Brand
  toneOfVoice: 'formal' | 'friendly' | 'playful';
  brandColorPalette?: string[];
  fontStyleGuide?: string[];
  logo?: string;

  // Layout
  pageLayoutPreference: 'scroll' | 'modular' | 'storytelling';

  // SEO
  targetSEOKeywords: string[];
  eventTrackingSetup?: string[];
  analyticsIDs?: {
    googleAnalytics?: string;
    googleTagManager?: string;
  };

  // Legal
  privacyPolicyURL: string;
  gdprCCPAConsentText: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
}

export interface TrustIndicator {
  type: 'badge' | 'certification' | 'award' | 'statistic';
  label: string;
  value?: string;
  image?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface APIConfig {
  endpoint: string;
  method: 'POST' | 'PUT';
  headers?: Record<string, string>;
}

// Campaign Data Types
export interface CampaignData {
  date: string;
  campaignName: string;
  campaignID: string;
  landingPageURL: string;
  trafficSource: string;
  utmSource: string;
  utmMedium: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  creativeID: string;
  creativeName: string;
  creativeType: 'Image' | 'Video' | 'Text';

  // Metrics
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  engagementRate: number;
  avgTimeOnPage: number;
  scrollDepth: number;

  // Conversions
  ctaClicks: number;
  formViews: number;
  formStarters: number;
  formCompletions: number;
  conversionCount: number;
  conversionRate: number;

  // Cost
  costPerSession: number;
  costPerConversion: number;
  cac: number;

  // Funnel
  leadToSQL: number;
  sqlToOpportunity: number;
}

export interface ExperimentData {
  experimentID: string;
  experimentName: string;
  startDate: string;
  endDate: string;
  variant: 'A' | 'B' | 'C';

  // What was tested
  testedElement: string;
  elementType: 'headline' | 'cta' | 'image' | 'form' | 'layout';
  description: string;

  // Results
  visitors: number;
  conversions: number;
  conversionRate: number;
  confidenceLevel: number;
  winner: boolean;

  // Insights
  insights: string;
  recommendations: string;
}

export interface BrandGuidelines {
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    neutral: string[];
  };
  typography: {
    headings: FontConfig;
    body: FontConfig;
    captions: FontConfig;
  };
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
  logo: {
    primary: string;
    secondary: string;
    minWidth: number;
    clearSpace: number;
  };
  imagery: {
    style: string;
    filters: string[];
  };
}

export interface FontConfig {
  family: string[];
  sizes: number[];
  weights: number[];
  lineHeights: number[];
}

export interface SpacingScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface BorderRadiusScale {
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

