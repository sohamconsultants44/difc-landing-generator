import { llmService } from '../services/llm.service';
import { FormField } from '../../../../packages/shared/src/validation.js';

export interface FormSchema {
  component: string; // React component code
  validationRules: Record<string, {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    custom?: string;
  }>;
  apiEndpoint?: string;
  gdprCompliant: boolean;
}

export class FormBuilderAgent {
  async generateFormSchema(fields: FormField[], apiConfig?: { endpoint: string; method: string }): Promise<FormSchema> {
    const systemPrompt = `You are an expert React developer creating accessible, GDPR-compliant forms.`;

    const prompt = `Generate a React form component with the following fields:

Fields:
${JSON.stringify(fields, null, 2)}

${apiConfig ? `API Config: ${JSON.stringify(apiConfig)}` : ''}

Create a form component that:
1. Uses React Hook Form or similar for validation
2. Includes proper error handling
3. Is accessible (WCAG 2.1 AA)
4. Includes GDPR consent checkbox
5. Has proper labels and placeholders
6. Validates all fields according to their rules
7. Handles form submission
8. Shows loading and success states

Return JSON with:
- component: React component code as string
- validationRules: Object mapping field names to validation rules
- apiEndpoint: API endpoint if provided
- gdprCompliant: boolean indicating GDPR compliance

Component should use TypeScript and Tailwind CSS.`;

    const schema = await llmService.generateJSON<FormSchema>(prompt, systemPrompt);
    return schema;
  }

  async createValidationRules(field: FormField): Promise<{
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    custom?: string;
  }> {
    const rules: {
      required?: boolean;
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      custom?: string;
    } = {};

    if (field.required) {
      rules.required = true;
    }

    if (field.validation) {
      if (field.validation.pattern) {
        rules.pattern = field.validation.pattern;
      }
      if (field.validation.minLength) {
        rules.minLength = field.validation.minLength;
      }
      if (field.validation.maxLength) {
        rules.maxLength = field.validation.maxLength;
      }
    }

    // Add type-specific validations
    if (field.type === 'email') {
      rules.pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    }

    if (field.type === 'phone') {
      rules.pattern = '^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,9}$';
    }

    return rules;
  }

  async addGDPRCompliance(formSchema: FormSchema): Promise<FormSchema> {
    const systemPrompt = `You are a GDPR compliance expert.`;

    const prompt = `Add GDPR compliance to this form:

${JSON.stringify(formSchema, null, 2)}

Ensure:
1. Consent checkbox is present
2. Privacy policy link is included
3. Clear explanation of data usage
4. Right to withdraw consent mentioned

Return updated form schema in JSON format.`;

    const updatedSchema = await llmService.generateJSON<FormSchema>(prompt, systemPrompt);
    return updatedSchema;
  }
}

