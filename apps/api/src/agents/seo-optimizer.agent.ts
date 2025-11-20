import { llmService } from '../services/llm.service';

export interface SEOAnalysis {
  score: number; // 0-100
  keywordDensity: Record<string, number>;
  metaTags: {
    title: string;
    description: string;
    keywords: string[];
  };
  recommendations: string[];
  structuredData: unknown;
}

export class SEOOptimizerAgent {
  async analyzeSEO(content: string, keywords: string[]): Promise<SEOAnalysis> {
    const systemPrompt = `You are an SEO expert. Analyze content and provide SEO recommendations.`;

    const prompt = `Analyze the following content for SEO:

Content:
${content}

Target Keywords:
${keywords.join(', ')}

Provide:
1. SEO score (0-100)
2. Keyword density for each keyword
3. Optimized meta tags (title, description, keywords)
4. Recommendations for improvement
5. Structured data suggestions

Respond in JSON format.`;

    const analysis = await llmService.generateJSON<SEOAnalysis>(prompt, systemPrompt);
    return analysis;
  }

  async optimizeContent(content: string, keywords: string[]): Promise<string> {
    const systemPrompt = `You are an SEO content optimizer. Optimize content for better SEO while maintaining readability.`;

    const prompt = `Optimize the following content for SEO with keywords: ${keywords.join(', ')}

Original Content:
${content}

Provide the optimized content that:
1. Naturally incorporates keywords
2. Maintains readability and user experience
3. Improves SEO score

Return only the optimized content, no additional text.`;

    const optimized = await llmService.generate(prompt, systemPrompt);
    return optimized;
  }

  async generateMetaTags(title: string, description: string, keywords: string[]): Promise<{
    title: string;
    description: string;
    keywords: string[];
  }> {
    const systemPrompt = `You are an SEO expert creating optimized meta tags.`;

    const prompt = `Create optimized meta tags:

Title: ${title}
Description: ${description}
Keywords: ${keywords.join(', ')}

Provide optimized meta tags (title max 60 chars, description max 160 chars) in JSON format.`;

    const metaTags = await llmService.generateJSON<{
      title: string;
      description: string;
      keywords: string[];
    }>(prompt, systemPrompt);

    return metaTags;
  }
}

