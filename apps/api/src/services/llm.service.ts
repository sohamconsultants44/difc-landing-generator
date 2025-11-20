import { ChatOllama } from '@langchain/ollama';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export interface LLMConfig {
  baseUrl?: string;
  model?: string;
  temperature?: number;
}

export class LLMService {
  private ollama: ChatOllama;
  private model: string;

  constructor(config: LLMConfig = {}) {
    this.model = config.model || process.env.OLLAMA_MODEL || 'mistral';
    const baseUrl = config.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

    this.ollama = new ChatOllama({
      baseUrl,
      model: this.model,
      temperature: config.temperature || 0.7,
    });
  }

  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages = [];
      
      if (systemPrompt) {
        messages.push(new SystemMessage(systemPrompt));
      }
      
      messages.push(new HumanMessage(prompt));

      const response = await this.ollama.invoke(messages);
      return response.content as string;
    } catch (error) {
      console.error('LLM generation error:', error);
      throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateJSON<T>(prompt: string, systemPrompt?: string): Promise<T> {
    const response = await this.generate(
      `${prompt}\n\nRespond with valid JSON only, no additional text.`,
      systemPrompt
    );
    
    try {
      // Extract JSON from response if there's extra text
      const jsonMatch = response.match(/\{[\s\S]*\}/);
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

