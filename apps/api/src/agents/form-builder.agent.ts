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
    const systemPrompt = `Expert React developer. Create accessible GDPR forms.`;

    // SIMPLIFIED - Only send essential field info
    const fieldsSummary = fields.map(f => ({
      name: f.name,
      type: f.type,
      required: f.required,
      label: f.label,
    }));

    const prompt = `React form component:
Fields: ${JSON.stringify(fieldsSummary)}
${apiConfig ? `API: ${apiConfig.endpoint} (${apiConfig.method})` : ''}

Return JSON:
- component: React functional component code (TypeScript, Tailwind CSS, React Hook Form)
- validationRules: {fieldName: {required, pattern, minLength, maxLength}}
- apiEndpoint: "${apiConfig?.endpoint || ''}"
- gdprCompliant: true

Keep component concise (<150 lines).`;

    try {
      const schema = await llmService.generateJSON<FormSchema>(prompt, systemPrompt, 50000); // 50s timeout
      return schema;
    } catch (error) {
      // FALLBACK: Generate basic form schema without LLM
      console.warn('Form generation LLM failed, using fallback:', error);
      const validationRules: Record<string, any> = {};
      fields.forEach(field => {
        validationRules[field.name] = {
          required: field.required,
          ...(field.validation || {}),
        };
        if (field.type === 'email') {
          validationRules[field.name].pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        }
      });

      const formFieldsCode = fields.map(f => 
        `<div className="mb-4">
          <label className="block text-sm font-medium mb-1">{f.label}${f.required ? ' *' : ''}</label>
          <input type="${f.type}" name="${f.name}" required={${f.required}} className="w-full px-4 py-2 border rounded" />
        </div>`
      ).join('\n');

      return {
        component: `export function LandingPageForm() {
  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      ${formFieldsCode}
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" required className="mr-2" />
          <span className="text-sm">I agree to the privacy policy</span>
        </label>
      </div>
      <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold">
        Submit
      </button>
    </form>
  );
}`,
        validationRules,
        apiEndpoint: apiConfig?.endpoint,
        gdprCompliant: true,
      };
    }
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

