/**
 * Multi-Provider LLM Service
 * Supports: OpenAI, Google Gemini, Anthropic Claude, Mock (for demo)
 * Much faster and more reliable than Ollama for competition use
 */

export type LLMProvider = 'openai' | 'gemini' | 'claude' | 'mock' | 'ollama';

export interface LLMResponse {
  content: string;
  provider: LLMProvider;
  responseTime: number;
}

export class MultiProviderLLMService {
  private provider: LLMProvider;
  private apiKeys: {
    openai?: string;
    gemini?: string;
    claude?: string;
  };

  constructor() {
    // Determine provider from environment (dotenv should already be loaded in index.ts)
    this.provider = (process.env.LLM_PROVIDER as LLMProvider) || 'ollama';
    
    this.apiKeys = {
      openai: process.env.OPENAI_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      claude: process.env.ANTHROPIC_API_KEY,
    };

    console.log(`[LLM Providers] ⚡ Provider: ${this.provider} (from env: ${process.env.LLM_PROVIDER || 'not set'})`);
    if (this.provider === 'mock') {
      console.log(`[LLM Providers] 🚀 Mock provider active - instant responses!`);
    } else {
      console.warn(`[LLM Providers] ⚠️ Using ${this.provider} - Mock provider not active!`);
    }
  }

  async generate(prompt: string, systemPrompt?: string, timeoutMs: number = 30000): Promise<string> {
    const startTime = Date.now();

    // ALWAYS check provider from env at runtime (force fresh read)
    const currentProvider = (process.env.LLM_PROVIDER as LLMProvider) || this.provider || 'ollama';
    
    console.log(`[LLM Providers] 🔍 Runtime provider check: "${currentProvider}" (cached: "${this.provider}")`);
    
    // MOCK provider should be instant - handle it FIRST and ALWAYS
    if (currentProvider === 'mock' || this.provider === 'mock') {
      console.log(`[LLM Providers] 🚀 Using MOCK provider (instant)`);
      try {
        const response = await this.generateMock(prompt, systemPrompt);
        console.log(`[LLM Providers] ✅ Mock provider responded in ${response.responseTime}ms`);
        return response.content;
      } catch (error) {
        console.error(`[LLM Providers] ❌ Mock provider error:`, error);
        throw new Error(`Mock provider failed: ${error}`);
      }
    }
    
    console.log(`[LLM Providers] ⚠️ NOT using Mock - provider=${currentProvider}, cached=${this.provider}`);

    try {
      let response: LLMResponse;

      switch (this.provider) {
        case 'openai':
          response = await this.generateOpenAI(prompt, systemPrompt, timeoutMs);
          break;
        case 'gemini':
          response = await this.generateGemini(prompt, systemPrompt, timeoutMs);
          break;
        case 'claude':
          response = await this.generateClaude(prompt, systemPrompt, timeoutMs);
          break;
        case 'ollama':
        default:
          // Fallback to Ollama if no cloud provider configured
          const { llmService } = await import('./llm.service.js');
          const content = await llmService.generate(prompt, systemPrompt, timeoutMs);
          return content;
      }

      console.log(`[LLM] ${response.provider} responded in ${response.responseTime}ms`);
      return response.content;
    } catch (error) {
      console.error(`[LLM] ${this.provider} failed:`, error);
      
      // Fallback to mock if cloud provider fails (but not if already mock)
      if (this.provider !== 'mock' && this.provider !== 'ollama') {
        console.warn('[LLM] Falling back to mock provider');
        const mockResponse = await this.generateMock(prompt, systemPrompt);
        return mockResponse.content;
      }
      
      throw error;
    }
  }

  private async generateOpenAI(prompt: string, systemPrompt?: string, timeoutMs: number = 30000): Promise<LLMResponse> {
    if (!this.apiKeys.openai) {
      throw new Error('OPENAI_API_KEY not set');
    }

    const startTime = Date.now();
    const messages = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKeys.openai}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Fast and cheap
          messages,
          temperature: 0.3,
          max_tokens: 500, // Limit for speed
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0]?.message?.content || '',
        provider: 'openai',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async generateGemini(prompt: string, systemPrompt?: string, timeoutMs: number = 30000): Promise<LLMResponse> {
    if (!this.apiKeys.gemini) {
      throw new Error('GEMINI_API_KEY not set');
    }

    const startTime = Date.now();
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKeys.gemini}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: fullPrompt }],
            }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 500, // Limit for speed
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      return {
        content,
        provider: 'gemini',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async generateClaude(prompt: string, systemPrompt?: string, timeoutMs: number = 30000): Promise<LLMResponse> {
    if (!this.apiKeys.claude) {
      throw new Error('ANTHROPIC_API_KEY not set');
    }

    const startTime = Date.now();
    const messages = [{ role: 'user', content: prompt }];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKeys.claude,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Fastest Claude model
          max_tokens: 500,
          temperature: 0.3,
          system: systemPrompt,
          messages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.content[0]?.text || '',
        provider: 'claude',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async generateMock(prompt: string, systemPrompt?: string): Promise<LLMResponse> {
    // Instant mock responses - perfect for demo/competition
    // ✅ NO TIME LIMITS - Always instant (< 100ms)
    // ✅ NO TOKEN LIMITS - Returns appropriate length responses
    // ✅ NO API RATE LIMITS - Local, unlimited usage
    // ✅ NO COST - Completely free
    
    const startTime = Date.now();
    
    // Generate realistic mock responses based on prompt type
    let content = '';
    const promptLower = prompt.toLowerCase();
    
    // Extract context from prompt for better mock responses
    const productMatch = prompt.match(/Product\/Service:\s*(.+)/i) || prompt.match(/for:\s*(.+)/i);
    const productName = productMatch ? productMatch[1].split('\n')[0].trim() : '';
    const valueMatch = prompt.match(/Value:\s*(.+)/i) || prompt.match(/Value Proposition:\s*(.+)/i);
    const valueProp = valueMatch ? valueMatch[1].split('\n')[0].trim() : '';
    const audienceMatch = prompt.match(/Audience:\s*(.+)/i) || prompt.match(/Target Audience:\s*(.+)/i);
    const audience = audienceMatch ? audienceMatch[1].split('\n')[0].trim() : '';
    
    if (promptLower.includes('headline')) {
      content = valueProp 
        ? `${valueProp} - ${productName || 'Your Solution'}`
        : productName 
          ? `Transform Your Business with ${productName}`
          : 'Transform Your Business with AI-Powered Solutions';
    } else if (promptLower.includes('cta') || promptLower.includes('call to action')) {
      const ctaMatch = prompt.match(/Original CTA:\s*"(.+)"/i) || prompt.match(/CTA:\s*(.+)/i);
      content = ctaMatch ? ctaMatch[1] : 'Get Started Today';
    } else if (promptLower.includes('body') || promptLower.includes('copy')) {
      const benefitsMatch = prompt.match(/Benefits:\s*(.+)/i);
      const benefits = benefitsMatch ? benefitsMatch[1].split(',').slice(0, 3) : [];
      
      content = valueProp 
        ? `${valueProp}\n\n${productName ? `With ${productName}, ` : ''}you get:\n${benefits.map(b => `• ${b.trim()}`).join('\n') || '• Innovative solutions\n• Proven results\n• Expert support'}\n\n${audience ? `Perfect for ${audience}. ` : ''}Join thousands of satisfied customers.`
        : 'Discover innovative solutions that drive results. Our platform combines cutting-edge technology with user-friendly design to deliver exceptional value. Join thousands of satisfied customers who have transformed their business.';
    } else if (promptLower.includes('json') || promptLower.includes('component')) {
      const sectionType = promptLower.match(/generate\s+(\w+)\s+component/i)?.[1] || 'hero';
      content = JSON.stringify({
        component: `export function ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}Section() {\n  return (\n    <section className="py-12 px-4 bg-white">\n      <div className="max-w-6xl mx-auto">\n        <h2 className="text-3xl font-bold mb-4">Section Title</h2>\n        <p className="text-gray-700">Content goes here</p>\n      </div>\n    </section>\n  );\n}`,
        styles: 'bg-white py-12 px-4 max-w-6xl mx-auto',
        layout: sectionType === 'hero' ? 'single-column' : 'two-column',
        accessibility: {
          ariaLabels: [`${sectionType} section`],
          keyboardNavigation: true,
          colorContrast: true,
        },
      }, null, 2);
    } else if (promptLower.includes('seo') || promptLower.includes('analysis')) {
      const keywordsMatch = prompt.match(/Keywords:\s*(.+)/i);
      const keywords = keywordsMatch ? keywordsMatch[1].split(',').slice(0, 5).map(k => k.trim()) : ['landing page', 'conversion'];
      
      content = JSON.stringify({
        score: 75,
        keywordDensity: Object.fromEntries(keywords.map(k => [k, Math.floor(Math.random() * 5 + 2)])),
        metaTags: {
          title: keywords[0] ? `${keywords[0]} - Landing Page` : 'Landing Page',
          description: `Optimized landing page for ${keywords.join(', ')}`,
          keywords: keywords.join(', '),
        },
        recommendations: ['Add more keyword variations', 'Optimize meta description', 'Add structured data'],
        structuredData: { '@type': 'WebPage' },
      }, null, 2);
    } else {
      // Generic response
      content = productName 
        ? `Optimized content for ${productName}. ${valueProp || 'Delivering exceptional value and results.'}`
        : 'This is a generated response optimized for your needs.';
    }

    // Simulate minimal processing time (always < 100ms)
    await new Promise(resolve => setTimeout(resolve, 50));

    return {
      content,
      provider: 'mock',
      responseTime: Date.now() - startTime,
    };
  }

  async generateJSON<T>(prompt: string, systemPrompt?: string, timeoutMs: number = 30000): Promise<T> {
    const response = await this.generate(
      `${prompt}\n\nRespond with valid JSON only, no additional text.`,
      systemPrompt,
      timeoutMs
    );
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/) || response.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;
      return JSON.parse(jsonString) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton
export const multiProviderLLMService = new MultiProviderLLMService();

