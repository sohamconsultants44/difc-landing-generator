import { llmService } from '../services/llm.service';

export interface DecisionExplanation {
  decision: string;
  reasoning: string;
  dataReferences: string[];
  alternativesConsidered: string[];
  confidence: number;
}

export interface ExplanationReport {
  summary: string;
  decisions: DecisionExplanation[];
  dataInsights: string[];
  brandCompliance: string;
  recommendations: string[];
}

export class ExplainerAgent {
  async explainDecision(
    decision: unknown,
    context: {
      dataInsights?: unknown;
      brandGuidelines?: unknown;
      abTestResults?: unknown;
    }
  ): Promise<DecisionExplanation> {
    const systemPrompt = `You are an expert at explaining AI decision-making processes in a clear, transparent way.`;

    const prompt = `Explain the following design decision:

Decision:
${JSON.stringify(decision, null, 2)}

Context:
- Data Insights: ${JSON.stringify(context.dataInsights || {}, null, 2)}
- Brand Guidelines: ${JSON.stringify(context.brandGuidelines || {}, null, 2)}
- A/B Test Results: ${JSON.stringify(context.abTestResults || {}, null, 2)}

Provide a detailed explanation including:
1. What decision was made
2. Why this decision was made (reasoning)
3. What data or insights support this decision
4. What alternatives were considered
5. Confidence level (0-100)

Return JSON format.`;

    const explanation = await llmService.generateJSON<DecisionExplanation>(prompt, systemPrompt);
    return explanation;
  }

  async generateReport(decisions: DecisionExplanation[]): Promise<ExplanationReport> {
    const systemPrompt = `You are creating a comprehensive explanation report for all design decisions.`;

    const prompt = `Generate a comprehensive explanation report based on these decisions:

${JSON.stringify(decisions, null, 2)}

Create a report with:
1. Executive summary
2. Detailed explanations for each decision
3. Data insights that influenced decisions
4. Brand compliance summary
5. Recommendations for future improvements

Return JSON format.`;

    const report = await llmService.generateJSON<ExplanationReport>(prompt, systemPrompt);
    return report;
  }

  async citeDataSources(decision: DecisionExplanation, dataSources: unknown[]): Promise<DecisionExplanation> {
    const systemPrompt = `You are adding data source citations to decision explanations.`;

    const prompt = `Add data source citations to this decision explanation:

Decision:
${JSON.stringify(decision, null, 2)}

Available Data Sources:
${JSON.stringify(dataSources, null, 2)}

Update the dataReferences field with specific citations from the data sources.

Return updated decision explanation in JSON format.`;

    const updated = await llmService.generateJSON<DecisionExplanation>(prompt, systemPrompt);
    return updated;
  }
}

