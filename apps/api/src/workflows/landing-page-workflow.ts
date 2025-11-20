import { StateGraph, END, START } from '@langchain/langgraph';
import { CampaignAnalyzerAgent } from '../agents/campaign-analyzer.agent';
import { SEOOptimizerAgent } from '../agents/seo-optimizer.agent';
import { ContentGeneratorAgent } from '../agents/content-generator.agent';
import { DesignGeneratorAgent } from '../agents/design-generator.agent';
import { FormBuilderAgent } from '../agents/form-builder.agent';
import { ExplainerAgent } from '../agents/explainer.agent';
import { CampaignInput } from '../../../../packages/shared/src/validation.js';

export interface WorkflowState {
  input: CampaignInput;
  campaignInsights?: unknown;
  brandGuidelines?: unknown;
  sections: Array<{
    type: string;
    content: unknown;
    design: unknown;
    seoOptimized: boolean;
  }>;
  formSchema?: unknown;
  explanation?: unknown;
  errors: string[];
}

export class LandingPageWorkflow {
  private campaignAnalyzer: CampaignAnalyzerAgent;
  private seoOptimizer: SEOOptimizerAgent;
  private contentGenerator: ContentGeneratorAgent;
  private designGenerator: DesignGeneratorAgent;
  private formBuilder: FormBuilderAgent;
  private explainer: ExplainerAgent;

  constructor() {
    this.campaignAnalyzer = new CampaignAnalyzerAgent();
    this.seoOptimizer = new SEOOptimizerAgent();
    this.contentGenerator = new ContentGeneratorAgent();
    this.designGenerator = new DesignGeneratorAgent();
    this.formBuilder = new FormBuilderAgent();
    this.explainer = new ExplainerAgent();
  }

  async analyzeCampaign(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      // TODO: Load actual campaign data
      const insights = await this.campaignAnalyzer.analyzeCampaignData([]);
      return { campaignInsights: insights };
    } catch (error) {
      return { errors: [...(state.errors || []), `Campaign analysis failed: ${error}`] };
    }
  }

  async generateContent(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      const headline = await this.contentGenerator.generateHeadline(state.input);
      const bodyCopy = await this.contentGenerator.generateBodyCopy(state.input);
      const primaryCTA = await this.contentGenerator.generateCTA(state.input, 'primary');

      const sections = [
        {
          type: 'hero',
          content: { headline, bodyCopy, cta: primaryCTA },
          design: null,
          seoOptimized: false,
        },
      ];

      return { sections };
    } catch (error) {
      return { errors: [...(state.errors || []), `Content generation failed: ${error}`] };
    }
  }

  async generateDesign(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      if (!state.brandGuidelines) {
        return { errors: [...(state.errors || []), 'Brand guidelines not loaded'] };
      }

      const updatedSections = await Promise.all(
        (state.sections || []).map(async (section) => {
          const design = await this.designGenerator.generateSection(
            section.type as any,
            {
              content: section.content,
              brandGuidelines: state.brandGuidelines as any,
              layoutPreference: state.input.pageLayoutPreference,
            }
          );
          return { ...section, design };
        })
      );

      return { sections: updatedSections };
    } catch (error) {
      return { errors: [...(state.errors || []), `Design generation failed: ${error}`] };
    }
  }

  async optimizeSEO(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      const updatedSections = await Promise.all(
        (state.sections || []).map(async (section) => {
          if (section.seoOptimized) return section;

          const content = JSON.stringify(section.content);
          const analysis = await this.seoOptimizer.analyzeSEO(content, state.input.targetSEOKeywords);
          
          return {
            ...section,
            seoOptimized: true,
            seoAnalysis: analysis,
          };
        })
      );

      return { sections: updatedSections };
    } catch (error) {
      return { errors: [...(state.errors || []), `SEO optimization failed: ${error}`] };
    }
  }

  async buildForm(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      const formSchema = await this.formBuilder.generateFormSchema(
        state.input.formFields,
        state.input.apiConfig
      );
      return { formSchema };
    } catch (error) {
      return { errors: [...(state.errors || []), `Form building failed: ${error}`] };
    }
  }

  async generateExplanation(state: WorkflowState): Promise<Partial<WorkflowState>> {
    try {
      const decisions = state.sections?.map((s) => ({
        decision: s.design,
        context: {
          dataInsights: state.campaignInsights,
          brandGuidelines: state.brandGuidelines,
        },
      })) || [];

      const explanations = await Promise.all(
        decisions.map((d) => this.explainer.explainDecision(d.decision, d.context))
      );

      const report = await this.explainer.generateReport(explanations);
      return { explanation: report };
    } catch (error) {
      return { errors: [...(state.errors || []), `Explanation generation failed: ${error}`] };
    }
  }

  createWorkflow(): StateGraph<WorkflowState> {
    const workflow = new StateGraph<WorkflowState>({
      channels: {
        input: { reducer: (x, y) => y ?? x },
        campaignInsights: { reducer: (x, y) => y ?? x },
        brandGuidelines: { reducer: (x, y) => y ?? x },
        sections: { reducer: (x, y) => y ?? x },
        formSchema: { reducer: (x, y) => y ?? x },
        explanation: { reducer: (x, y) => y ?? x },
        errors: { reducer: (x, y) => [...(x || []), ...(y || [])] },
      },
    });

    workflow.addNode('analyze', this.analyzeCampaign.bind(this));
    workflow.addNode('generateContent', this.generateContent.bind(this));
    workflow.addNode('generateDesign', this.generateDesign.bind(this));
    workflow.addNode('optimizeSEO', this.optimizeSEO.bind(this));
    workflow.addNode('buildForm', this.buildForm.bind(this));
    workflow.addNode('explain', this.generateExplanation.bind(this));

    workflow.addEdge(START, 'analyze');
    workflow.addEdge('analyze', 'generateContent');
    workflow.addEdge('generateContent', 'generateDesign');
    workflow.addEdge('generateDesign', 'optimizeSEO');
    workflow.addEdge('optimizeSEO', 'buildForm');
    workflow.addEdge('buildForm', 'explain');
    workflow.addEdge('explain', END);

    return workflow;
  }

  async execute(input: CampaignInput): Promise<WorkflowState> {
    // Simplified execution without LangGraph for now
    const state: WorkflowState = {
      input,
      sections: [],
      errors: [],
    };

    try {
      // Execute workflow steps sequentially
      const insights = await this.analyzeCampaign(state);
      Object.assign(state, insights);

      const content = await this.generateContent(state);
      Object.assign(state, content);

      const design = await this.generateDesign(state);
      Object.assign(state, design);

      const seo = await this.optimizeSEO(state);
      Object.assign(state, seo);

      const form = await this.buildForm(state);
      Object.assign(state, form);

      const explanation = await this.generateExplanation(state);
      Object.assign(state, explanation);

      return state;
    } catch (error) {
      state.errors.push(`Workflow execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return state;
    }
  }
}
