import { ChatOllama } from '@langchain/ollama';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { multiProviderLLMService } from './llm-providers.service.js';

export interface LLMConfig {
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  numCtx?: number; // Context window size (smaller = faster)
  numThread?: number; // CPU threads (optimize for your CPU)
}

export class LLMService {
  private ollama: ChatOllama;
  private model: string;

  constructor(config: LLMConfig = {}) {
    // OPTIMIZED: Use phi3 (2.2GB) instead of mistral (4.4GB) for 2-3x faster inference
    // phi3:latest is smaller and faster while maintaining good quality
    this.model = config.model || process.env.OLLAMA_MODEL || 'phi3:latest';
    const baseUrl = config.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

    // Performance optimizations:
    // - Lower temperature (0.3) = faster, more focused responses
    // - Smaller context window (2048) = faster processing, less memory
    // - Optimized for speed over quality (acceptable for structured outputs)
    const numCtx = config.numCtx || parseInt(process.env.OLLAMA_NUM_CTX || '2048'); // Smaller context = faster
    const numThread = config.numThread || parseInt(process.env.OLLAMA_NUM_THREAD || '4'); // Optimize CPU threads

    this.ollama = new ChatOllama({
      baseUrl,
      model: this.model,
      temperature: config.temperature ?? 0.3, // Lower = faster, more deterministic
      // Note: LangChain ChatOllama may not expose all Ollama parameters directly
      // These are set via environment variables or Ollama config
    });

    // Log performance settings
    console.log(`[LLM Service] ⚡ Optimized for speed: Model=${this.model}, Context=${numCtx}, Threads=${numThread}`);
  }

  async generate(prompt: string, systemPrompt?: string, timeoutMs: number = 60000): Promise<string> {
    // Check if cloud provider is configured (much faster than Ollama)
    const provider = process.env.LLM_PROVIDER || 'ollama';
    
    console.log(`[LLM Service] 🔍 Provider check: "${provider}"`);
    console.log(`[LLM Service] 🔍 All env vars:`, {
      LLM_PROVIDER: process.env.LLM_PROVIDER,
      OLLAMA_MODEL: process.env.OLLAMA_MODEL,
    });
    
    // MOCK provider - ALWAYS use it if set, never fall back
    if (provider === 'mock') {
      console.log(`[LLM Service] 🚀 MOCK provider detected - using instant responses`);
      try {
        const result = await multiProviderLLMService.generate(prompt, systemPrompt, 5000); // 5s timeout for mock (should be instant)
        console.log(`[LLM Service] ✅ Mock provider returned result`);
        return result;
      } catch (error) {
        console.error(`[LLM Service] ❌ Mock provider failed:`, error);
        // Mock provider should NEVER fail - if it does, throw error instead of falling back
        throw new Error(`Mock provider failed - this should never happen. Error: ${error}`);
      }
    }
    
    if (provider !== 'ollama') {
      // Use cloud provider (OpenAI, Gemini, Claude)
      try {
        console.log(`[LLM Service] Using ${provider} provider (not Ollama)`);
        const result = await multiProviderLLMService.generate(prompt, systemPrompt, timeoutMs);
        console.log(`[LLM Service] ${provider} provider returned result`);
        return result;
      } catch (error) {
        console.error(`[LLM] ${provider} provider failed:`, error);
        console.warn(`[LLM] Cloud provider failed, falling back to Ollama:`, error);
        // Fall through to Ollama only for non-mock providers
      }
    } else {
      console.log(`[LLM Service] Using Ollama provider`);
    }

    // Fallback to Ollama (original implementation)
    const maxRetries = 2;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const messages = [];
        
        if (systemPrompt) {
          messages.push(new SystemMessage(systemPrompt));
        }
        
        // Optimize prompt: add instruction to keep response concise
        const optimizedPrompt = `${prompt}\n\nKeep response concise and focused.`;
        messages.push(new HumanMessage(optimizedPrompt));

        // Timeout promise with exponential backoff
        const attemptTimeout = timeoutMs + (attempt * 10000); // Add 10s per retry
        const timeoutPromise = new Promise<string>((_, reject) => {
          setTimeout(() => reject(new Error(`LLM request timed out after ${attemptTimeout}ms`)), attemptTimeout);
        });

        // Race between LLM call and timeout
        const llmPromise = this.ollama.invoke(messages).then(response => {
          const content = response.content as string;
          // Truncate very long responses to speed up processing
          return content.length > 2000 ? content.substring(0, 2000) : content;
        });
        
        const response = await Promise.race([llmPromise, timeoutPromise]);
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`LLM generation attempt ${attempt + 1} failed:`, lastError.message);
        
        // Don't retry on timeout if it's the last attempt
        if (attempt < maxRetries && !lastError.message.includes('timeout')) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        
        // If timeout on last attempt, throw
        if (lastError.message.includes('timeout')) {
          throw new Error(`LLM request timed out after ${timeoutMs}ms. Consider using cloud provider (OpenAI/Gemini) for faster responses.`);
        }
      }
    }

    throw new Error(`Failed to generate response after ${maxRetries + 1} attempts: ${lastError?.message || 'Unknown error'}`);
  }

  async generateJSON<T>(prompt: string, systemPrompt?: string, timeoutMs: number = 60000): Promise<T> {
    // Use cloud provider if available (much faster)
    const provider = process.env.LLM_PROVIDER || 'ollama';
    
    if (provider !== 'ollama') {
      try {
        return await multiProviderLLMService.generateJSON<T>(prompt, systemPrompt, timeoutMs);
      } catch (error) {
        console.warn(`[LLM] Cloud provider JSON generation failed, falling back to Ollama:`, error);
        // Fall through to Ollama
      }
    }

    // Fallback to Ollama
    const response = await this.generate(
      `${prompt}\n\nRespond with valid JSON only, no additional text.`,
      systemPrompt,
      timeoutMs
    );
    
    try {
      // Extract JSON from response if there's extra text
      const jsonMatch = response.match(/\{[\s\S]*\}/) || response.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;
      return JSON.parse(jsonString) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async stream(prompt: string, systemPrompt?: string): Promise<AsyncIterable<string>> {
    const messages = [];
    
    if (systemPrompt) {
      messages.push(new SystemMessage(systemPrompt));
    }
    
    messages.push(new HumanMessage(prompt));

    const stream = await this.ollama.stream(messages);
    
    return (async function* () {
      for await (const chunk of stream) {
        yield chunk.content as string;
      }
    })();
  }
}

// Singleton instance
export const llmService = new LLMService();

