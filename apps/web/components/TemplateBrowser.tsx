'use client';

import { useState, useEffect } from 'react';

interface Template {
  templateID: string;
  templateName: string;
  templateVersion: string;
  createdAt: string;
  description?: string;
  campaignObjective: string;
  productServiceName: string;
}

export default function TemplateBrowser({ onSelectTemplate }: { onSelectTemplate: (template: Template) => void }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/templates')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load templates:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading templates...</div>;
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No templates found</p>
        <p className="text-sm mt-2">Create a template to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template.templateID}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectTemplate(template)}
        >
          <h3 className="font-semibold text-difc-primary mb-2">{template.templateName}</h3>
          <p className="text-sm text-gray-600 mb-2">{template.productServiceName}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {template.campaignObjective}
            </span>
            <span>{new Date(template.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

