'use client';

import { useState } from 'react';

interface Section {
  type: string;
  component: string;
  props: Record<string, unknown>;
}

interface SectionEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export default function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const [editedSection, setEditedSection] = useState(section);

  const updateProp = (key: string, value: unknown) => {
    const updated = {
      ...editedSection,
      props: {
        ...editedSection.props,
        [key]: value,
      },
    };
    setEditedSection(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Section: {section.type}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Type
          </label>
          <input
            type="text"
            value={editedSection.type}
            onChange={(e) => {
              const updated = { ...editedSection, type: e.target.value };
              setEditedSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Component
          </label>
          <input
            type="text"
            value={editedSection.component}
            onChange={(e) => {
              const updated = { ...editedSection, component: e.target.value };
              setEditedSection(updated);
              onUpdate(updated);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Properties
          </label>
          <div className="space-y-2">
            {Object.entries(editedSection.props).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="w-1/3 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  value={String(value)}
                  onChange={(e) => {
                    let parsedValue: unknown = e.target.value;
                    // Try to parse as number or boolean
                    if (e.target.value === 'true') parsedValue = true;
                    else if (e.target.value === 'false') parsedValue = false;
                    else if (!isNaN(Number(e.target.value))) parsedValue = Number(e.target.value);
                    updateProp(key, parsedValue);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

