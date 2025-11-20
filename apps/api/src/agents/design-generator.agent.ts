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
    const systemPrompt = `Expert React/UI developer. Create accessible components.`;

    // SIMPLIFIED PROMPT - Focus on essentials
    const contentStr = typeof requirements.content === 'string' 
      ? requirements.content 
      : JSON.stringify(requirements.content).substring(0, 500); // Limit content length

    const primaryColor = requirements.brandGuidelines?.colors?.primary?.[0] || '#001E60';
    const prompt = `Generate ${sectionType} React component:
Content: ${contentStr}
Colors: ${primaryColor}
Layout: ${requirements.layoutPreference || 'responsive'}

Return JSON:
- component: React functional component code (TypeScript, Tailwind CSS)
- styles: Tailwind classes used
- layout: single-column|two-column|three-column|grid
- accessibility: {ariaLabels: [], keyboardNavigation: true, colorContrast: true}

Keep component concise (<100 lines).`;

    try {
      const design = await llmService.generateJSON<SectionDesign>(prompt, systemPrompt, 60000); // 60s timeout
      return design;
    } catch (error) {
      // FALLBACK: Return template component if LLM fails
      console.warn('Design generation failed, using fallback template:', error);
      return {
        component: `export function ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}Section({ content }: { content: any }) {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '${primaryColor}' }}>{content?.headline || 'Section Title'}</h2>
        <p className="text-gray-700 mb-6">{content?.bodyCopy || 'Content goes here'}</p>
        {content?.cta && (
          <button className="px-6 py-3 rounded text-white font-semibold" style={{ backgroundColor: '${primaryColor}' }}>
            {content.cta}
          </button>
        )}
      </div>
    </section>
  );
}`,
        styles: `bg-white py-12 px-4 max-w-6xl mx-auto`,
        layout: 'single-column' as const,
        accessibility: {
          ariaLabels: [`${sectionType} section`],
          keyboardNavigation: true,
          colorContrast: true,
        },
      };
    }
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

