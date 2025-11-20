/**
 * Explainer Agent
 * Generates explanations for design decisions
 */

import { llmService } from '../../apps/api/src/services/llm.service';

export class ExplainerAgent {
  async explainDecision(decision: unknown, context: unknown): Promise<string> {
    // TODO: Implement decision explanation
    const prompt = `Explain the following design decision: ${JSON.stringify(decision)}\n\nContext: ${JSON.stringify(context)}`;
    return await llmService.generate(prompt);
  }

  async generateReport(decisions: unknown[]): Promise<string> {
    // TODO: Implement report generation
    const prompt = `Generate a comprehensive report explaining all design decisions: ${JSON.stringify(decisions)}`;
    return await llmService.generate(prompt);
  }
}

