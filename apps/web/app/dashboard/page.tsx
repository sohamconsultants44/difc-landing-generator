'use client';

import { useState } from 'react';
import Link from 'next/link';
import TemplateBrowser from '../../components/TemplateBrowser';

export default function DashboardPage() {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-difc-primary mb-8">
          DIFC Landing Page Generator Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Create New</h2>
            <p className="text-gray-600 mb-4">Generate a new landing page from scratch</p>
            <Link
              href="/generate"
              className="inline-block bg-difc-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Start Generation
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Templates</h2>
            <p className="text-gray-600 mb-4">Use a saved template</p>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Templates
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Insights</h2>
            <p className="text-gray-600 mb-4">View campaign insights</p>
            <Link
              href="/insights"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              View Insights
            </Link>
          </div>
        </div>

        {showTemplates && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Templates</h2>
            <TemplateBrowser
              onSelectTemplate={(template) => {
                // Navigate to generate page with template data
                window.location.href = `/generate?template=${template.templateID}`;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
