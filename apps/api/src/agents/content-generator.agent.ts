import { llmService } from '../services/llm.service';
import { CampaignInput } from '../../../../packages/shared/src/validation.js';

export class ContentGeneratorAgent {
  async generateHeadline(context: CampaignInput): Promise<string> {
    const systemPrompt = `Expert copywriter. Create compelling headlines.`;

    // SHORTER, MORE FOCUSED PROMPT
    const prompt = `Headline for: ${context.productServiceName}
Value: ${context.uniqueValueProposition}
Audience: ${context.targetAudience}
Tone: ${context.toneOfVoice}
Objective: ${context.campaignObjective}

One compelling headline (max 10 words).`;

    try {
      const headline = await llmService.generate(prompt, systemPrompt, 40000); // 40s timeout
      return headline.trim().split('\n')[0].replace(/^["']|["']$/g, ''); // Take first line, remove quotes
    } catch (error) {
      // FALLBACK: Use input-based headline if LLM fails
      console.warn('Headline generation failed, using fallback:', error);
      return `${context.uniqueValueProposition} - ${context.productServiceName}`;
    }
  }

  async generateBodyCopy(context: CampaignInput): Promise<string> {
    const systemPrompt = `Expert copywriter. Create persuasive body copy.`;

    // SHORTER PROMPT - Focus on essentials
    const prompt = `Body copy for: ${context.productServiceName}
Offer: ${context.primaryOffer}
Benefits: ${context.top3To5Benefits.slice(0, 3).join(', ')}
Tone: ${context.toneOfVoice}

2-3 short paragraphs (max 150 words).`;

    try {
      const bodyCopy = await llmService.generate(prompt, systemPrompt, 50000); // 50s timeout
      return bodyCopy.trim();
    } catch (error) {
      // FALLBACK: Use structured content if LLM fails
      console.warn('Body copy generation failed, using fallback:', error);
      return `${context.primaryOffer}\n\n${context.top3To5Benefits.slice(0, 3).map(b => `• ${b}`).join('\n')}\n\n${context.uniqueValueProposition}`;
    }
  }

  async generateCTA(context: CampaignInput, ctaType: 'primary' | 'secondary'): Promise<string> {
    const systemPrompt = `Expert copywriter. Create effective CTAs.`;

    const ctaText = ctaType === 'primary' ? context.primaryCTAText : context.secondaryCTAText;

    // VERY SHORT PROMPT - CTAs should be quick
    const prompt = `Optimize CTA: "${ctaText}"
Objective: ${context.campaignObjective}
Tone: ${context.toneOfVoice}

One optimized CTA (max 5 words).`;

    try {
      const optimizedCTA = await llmService.generate(prompt, systemPrompt, 30000); // 30s timeout
      return optimizedCTA.trim().split('\n')[0].replace(/["']/g, ''); // Clean up quotes
    } catch (error) {
      // FALLBACK: Use original CTA if LLM fails
      console.warn('CTA generation failed, using fallback:', error);
      return ctaText || 'Get Started';
    }
  }

  async generateTestimonial(context: CampaignInput): Promise<string> {
    const systemPrompt = `You are an expert copywriter creating authentic testimonials.`;

    const prompt = `Generate a testimonial based on:

Product/Service: ${context.productServiceName}
Benefits: ${context.top3To5Benefits.join(', ')}
Tone of Voice: ${context.toneOfVoice}

Create a testimonial that:
1. Sounds authentic and specific
2. Highlights key benefits
3. Includes a name and role
4. Matches the tone

Return the testimonial in this format:
"[Quote]" - Name, Role, Company`;

    const testimonial = await llmService.generate(prompt, systemPrompt);
    return testimonial.trim();
  }
}

