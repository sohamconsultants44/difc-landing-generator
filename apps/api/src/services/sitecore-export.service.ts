import { GeneratedComponent } from './component-generator.service';

export interface SitecoreComponent {
  id: string;
  name: string;
  category: string;
  fields: Array<{
    name: string;
    type: string;
    defaultValue?: string;
    required: boolean;
  }>;
  datasource: string;
  rendering: string;
  compatible: boolean;
  files: {
    component: string;
    styles: string;
    schema: string;
  };
}

export class SitecoreExportService {
  exportToSitecoreFormat(component: GeneratedComponent): SitecoreComponent {
    return {
      id: `component-${component.name.toLowerCase()}`,
      name: component.name,
      category: this.getCategory(component.name),
      fields: this.extractFields(component.props),
      datasource: '',
      rendering: component.component,
      compatible: true,
      files: {
        component: component.component,
        styles: component.styles,
        schema: JSON.stringify(component.props, null, 2),
      },
    };
  }

  private getCategory(componentName: string): string {
    if (componentName.includes('Hero')) return 'Headers';
    if (componentName.includes('Pricing')) return 'Sections';
    if (componentName.includes('Testimonial')) return 'Sections';
    if (componentName.includes('FAQ')) return 'Sections';
    if (componentName.includes('CTA')) return 'Sections';
    if (componentName.includes('Footer')) return 'Footers';
    if (componentName.includes('Form')) return 'Forms';
    return 'Components';
  }

  private extractFields(props: Record<string, unknown>): Array<{
    name: string;
    type: string;
    defaultValue?: string;
    required: boolean;
  }> {
    return Object.entries(props).map(([name, value]) => ({
      name,
      type: this.inferType(value),
      defaultValue: typeof value === 'string' ? value : undefined,
      required: true,
    }));
  }

  private inferType(value: unknown): string {
    if (typeof value === 'string') return 'Single-Line Text';
    if (typeof value === 'number') return 'Number';
    if (typeof value === 'boolean') return 'Checkbox';
    if (Array.isArray(value)) return 'Multilist';
    if (typeof value === 'object') return 'Rich Text';
    return 'Single-Line Text';
  }

  generateExportPackage(components: GeneratedComponent[]): {
    components: SitecoreComponent[];
    manifest: {
      version: string;
      components: number;
      generated: string;
    };
  } {
    return {
      components: components.map((c) => this.exportToSitecoreFormat(c)),
      manifest: {
        version: '1.0.0',
        components: components.length,
        generated: new Date().toISOString(),
      },
    };
  }
}

