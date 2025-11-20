import { DesignGeneratorAgent } from '../agents/design-generator.agent';
import { BrandGuidelines } from '../../../../packages/shared/src/schemas/brand-guidelines.schema.js';

export interface GeneratedComponent {
  name: string;
  component: string; // React component code
  styles: string;
  props: Record<string, unknown>;
  accessibility: {
    score: number;
    issues: string[];
  };
}

export class ComponentGeneratorService {
  private designGenerator: DesignGeneratorAgent;

  constructor() {
    this.designGenerator = new DesignGeneratorAgent();
  }

  async generateHeroSection(
    content: { headline: string; bodyCopy: string; cta: string; image?: string },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('hero', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'HeroSection',
      component: design.component,
      styles: design.styles,
      props: {
        headline: content.headline,
        bodyCopy: content.bodyCopy,
        cta: content.cta,
        image: content.image,
      },
      accessibility,
    };
  }

  async generatePricingSection(
    content: { plans: Array<{ name: string; price: string; features: string[] }> },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('pricing', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'PricingSection',
      component: design.component,
      styles: design.styles,
      props: content,
      accessibility,
    };
  }

  async generateTestimonialSection(
    content: { testimonials: Array<{ name: string; role: string; quote: string; image?: string }> },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('testimonial', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'TestimonialSection',
      component: design.component,
      styles: design.styles,
      props: content,
      accessibility,
    };
  }

  async generateFAQSection(
    content: { questions: Array<{ question: string; answer: string }> },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('faq', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'FAQSection',
      component: design.component,
      styles: design.styles,
      props: content,
      accessibility,
    };
  }

  async generateCTASection(
    content: { headline: string; description: string; cta: string },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('cta', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'CTASection',
      component: design.component,
      styles: design.styles,
      props: content,
      accessibility,
    };
  }

  async generateFooterSection(
    content: {
      links: Array<{ title: string; items: string[] }>;
      copyright: string;
      socialLinks?: Array<{ platform: string; url: string }>;
    },
    brandGuidelines: BrandGuidelines
  ): Promise<GeneratedComponent> {
    const design = await this.designGenerator.generateSection('footer', {
      content,
      brandGuidelines,
    });

    const accessibility = await this.designGenerator.validateAccessibility(design.component);

    return {
      name: 'FooterSection',
      component: design.component,
      styles: design.styles,
      props: content,
      accessibility,
    };
  }
}

