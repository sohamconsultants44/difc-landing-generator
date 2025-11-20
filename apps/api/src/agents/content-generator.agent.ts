import { llmService } from '../services/llm.service';
import { CampaignInput } from '../../../../packages/shared/src/validation.js';

export class ContentGeneratorAgent {
  async generateHeadline(context: CampaignInput): Promise<string> {
    const systemPrompt = `You are an expert copywriter creating compelling headlines for landing pages.`;

    const prompt = `Generate a compelling headline for a landing page with the following context:

Campaign Objective: ${context.campaignObjective}
Product/Service: ${context.productServiceName}
Unique Value Proposition: ${context.uniqueValueProposition}
Target Audience: ${context.targetAudience}
Tone of Voice: ${context.toneOfVoice}

Generate a headline that:
1. Captures attention immediately
2. Communicates the value proposition
3. Appeals to the target audience
4. Matches the tone of voice
5. Is optimized for conversion

Return only the headline, no additional text.`;

    const headline = await llmService.generate(prompt, systemPrompt);
    return headline.trim();
  }

  async generateBodyCopy(context: CampaignInput): Promise<string> {
    const systemPrompt = `You are an expert copywriter creating persuasive body copy for landing pages.`;

    const prompt = `Generate compelling body copy for a landing page:

Product/Service: ${context.productServiceName}
Primary Offer: ${context.primaryOffer}
Top Benefits: ${context.top3To5Benefits.join(', ')}
Features: ${context.featureList.join(', ')}
Emotional Triggers: ${context.emotionalTriggers.join(', ')}
Objections to Overcome: ${context.objectionsToOvercome.join(', ')}
Tone of Voice: ${context.toneOfVoice}

Generate body copy that:
1. Clearly explains the value proposition
2. Highlights key benefits
3. Addresses common objections
4. Uses emotional triggers appropriately
5. Maintains the specified tone
6. Is scannable and engaging

Return the body copy only.`;

    const bodyCopy = await llmService.generate(prompt, systemPrompt);
    return bodyCopy.trim();
  }

  async generateCTA(context: CampaignInput, ctaType: 'primary' | 'secondary'): Promise<string> {
    const systemPrompt = `You are an expert copywriter creating effective call-to-action buttons.`;

    const ctaText = ctaType === 'primary' ? context.primaryCTAText : context.secondaryCTAText;

    const prompt = `Optimize this CTA text for maximum conversion:

Original CTA: ${ctaText}
Campaign Objective: ${context.campaignObjective}
Tone of Voice: ${context.toneOfVoice}

Create an optimized CTA that:
1. Creates urgency or desire
2. Is action-oriented
3. Is clear and concise (max 5 words)
4. Matches the tone

Return only the optimized CTA text.`;

    const optimizedCTA = await llmService.generate(prompt, systemPrompt);
    return optimizedCTA.trim();
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

