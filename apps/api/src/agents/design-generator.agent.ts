import { llmService } from '../services/llm.service';
import { BrandGuidelines } from '../../../../packages/shared/src/schemas/brand-guidelines.schema.js';

export interface SectionDesign {
  component: string; // React component code
  styles: string; // Tailwind CSS classes
  layout: 'single-column' | 'two-column' | 'three-column' | 'grid';
  accessibility: {
    ariaLabels: string[];
    keyboardNavigation: boolean;
    colorContrast: boolean;
  };
}

export class DesignGeneratorAgent {
  async generateSection(
    sectionType: 'hero' | 'pricing' | 'testimonial' | 'faq' | 'cta' | 'form' | 'footer',
    requirements: {
      content: unknown;
      brandGuidelines: BrandGuidelines;
      layoutPreference?: string;
    }
  ): Promise<SectionDesign> {
    const systemPrompt = `You are an expert React developer and UI/UX designer creating accessible, responsive components.`;

    const prompt = `Generate a ${sectionType} section component with the following requirements:

Content:
${JSON.stringify(requirements.content, null, 2)}

Brand Guidelines:
- Primary Colors: ${requirements.brandGuidelines.colors.primary.join(', ')}
- Typography: ${requirements.brandGuidelines.typography.headings.family.join(', ')}
- Layout Preference: ${requirements.layoutPreference || 'responsive'}

Create a React component that:
1. Uses Tailwind CSS for styling
2. Follows DIFC brand guidelines
3. Is fully responsive (mobile-first)
4. Meets WCAG 2.1 AA accessibility standards
5. Uses semantic HTML
6. Includes proper ARIA labels
7. Has good color contrast

Return JSON with:
- component: The React component code as a string
- styles: Tailwind CSS classes used
- layout: Layout type
- accessibility: Accessibility features

Component should be a functional React component using TypeScript.`;

    const design = await llmService.generateJSON<SectionDesign>(prompt, systemPrompt);
    return design;
  }

  async applyBrandGuidelines(design: SectionDesign, guidelines: BrandGuidelines): Promise<SectionDesign> {
    const systemPrompt = `You are a brand compliance expert ensuring designs match brand guidelines.`;

    const prompt = `Update this design to fully comply with brand guidelines:

Current Design:
${JSON.stringify(design, null, 2)}

Brand Guidelines:
${JSON.stringify(guidelines, null, 2)}

Update the component and styles to ensure:
1. Colors match brand palette
2. Typography uses brand fonts
3. Spacing follows brand scale
4. All brand requirements are met

Return the updated design in the same JSON format.`;

    const updatedDesign = await llmService.generateJSON<SectionDesign>(prompt, systemPrompt);
    return updatedDesign;
  }

  async validateAccessibility(component: string): Promise<{
    accessible: boolean;
    issues: string[];
    score: number;
  }> {
    const systemPrompt = `You are an accessibility expert validating components for WCAG 2.1 AA compliance.`;

    const prompt = `Validate this React component for accessibility:

${component}

Check for:
1. Proper semantic HTML
2. ARIA labels where needed
3. Keyboard navigation support
4. Color contrast (WCAG AA)
5. Screen reader compatibility
6. Focus management

Return JSON with:
- accessible: boolean
- issues: array of accessibility issues found
- score: accessibility score (0-100)`;

    const validation = await llmService.generateJSON<{
      accessible: boolean;
      issues: string[];
      score: number;
    }>(prompt, systemPrompt);

    return validation;
  }
}

