'use client';

interface SitecoreExportProps {
  sections: Array<{
    type: string;
    component: string;
    props: Record<string, unknown>;
  }>;
}

export default function SitecoreExport({ sections }: SitecoreExportProps) {
  const exportToSitecore = () => {
    // Convert sections to Sitecore BYOC format
    const sitecoreComponents = sections.map((section, index) => ({
      id: `component-${index}`,
      name: section.component,
      type: section.type,
      props: section.props,
      // Sitecore-specific metadata
      sitecore: {
        componentName: section.component,
        renderingName: section.type,
        dataSource: {
          ...section.props,
        },
      },
    }));

    const exportData = {
      version: '1.0.0',
      components: sitecoreComponents,
      metadata: {
        exportedAt: new Date().toISOString(),
        format: 'Sitecore BYOC',
      },
    };

    // Download as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sitecore-components-${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToSitecore}
      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
    >
      Export to Sitecore BYOC
    </button>
  );
}

