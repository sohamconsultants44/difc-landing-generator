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
    const systemPrompt = `SEO expert. Quick analysis.`;

    // SHORTER CONTENT - Only analyze first 500 chars
    const contentPreview = content.substring(0, 500);
    const topKeywords = keywords.slice(0, 5).join(', ');

    const prompt = `SEO analysis:
Content: ${contentPreview}...
Keywords: ${topKeywords}

Return JSON:
- score: 0-100
- keywordDensity: {keyword: percentage}
- metaTags: {title, description, keywords}
- recommendations: [string]
- structuredData: {}

Quick analysis.`;

    try {
      const analysis = await llmService.generateJSON<SEOAnalysis>(prompt, systemPrompt, 40000); // 40s timeout
      return analysis;
    } catch (error) {
      // FALLBACK: Basic SEO analysis without LLM
      console.warn('SEO analysis LLM failed, using fallback:', error);
      const keywordCounts: Record<string, number> = {};
      keywords.forEach(kw => {
        const count = (contentPreview.toLowerCase().match(new RegExp(kw.toLowerCase(), 'g')) || []).length;
        keywordCounts[kw] = (count / contentPreview.split(' ').length) * 100;
      });

      return {
        score: 65,
        keywordDensity: keywordCounts,
        metaTags: {
          title: keywords[0] ? `${keywords[0]} - Landing Page` : 'Landing Page',
          description: contentPreview.substring(0, 155),
          keywords: keywords.join(', '),
        },
        recommendations: ['Add more keyword variations', 'Optimize meta description length', 'Add structured data'],
        structuredData: { '@type': 'WebPage' },
      };
    }
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

