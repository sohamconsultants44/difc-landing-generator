'use client';

import { useState } from 'react';
import CampaignInputForm from '../../components/CampaignInputForm';
import LandingPagePreview from '../../components/LandingPagePreview';
import SectionEditor from '../../components/SectionEditor';
import SitecoreExport from '../../components/SitecoreExport';

interface GenerationResult {
  success: boolean;
  result?: {
    sections: Array<{
      type: string;
      component: string;
      props: Record<string, unknown>;
    }>;
  };
  errors?: string[];
}

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [explanationReport, setExplanationReport] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async (campaignData: any) => {
    setIsGenerating(true);
    setResult(null);
    setExplanationReport(null);

    try {
      // Step 1: Generate landing page
      const generateResponse = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });

      const generateData = await generateResponse.json();
      setResult(generateData);

      // Step 2: Generate explanation report
      try {
        const explanationResponse = await fetch('http://localhost:3001/api/explanation/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignInput: campaignData,
            generatedPage: generateData.result,
            designDecisions: generateData.result?.sections?.map((section: any) => ({
              section: section.type,
              element: section.component,
              decision: `Generated ${section.type} section`,
              rationale: `Based on campaign data and insights`,
              dataSource: 'AI Generation',
            })) || [],
          }),
        });

        const explanationData = await explanationResponse.json();
        if (explanationData.success) {
          setExplanationReport(explanationData.report);
        }
      } catch (error) {
        console.error('Explanation generation failed:', error);
      }

      setShowPreview(true);
    } catch (error) {
      console.error('Generation failed:', error);
      setResult({
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!explanationReport) return;

    try {
      const response = await fetch('http://localhost:3001/api/explanation/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: explanationReport }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `explanation-${Date.now()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download failed:', error);
      alert('Failed to download PDF');
    }
  };

  const handleSaveTemplate = async (campaignData: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/templates/from-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignInput: campaignData,
          templateName: `${campaignData.productServiceName || 'Campaign'} Template`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Template saved successfully!');
      }
    } catch (error) {
      console.error('Template save failed:', error);
      alert('Failed to save template');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-difc-primary">
            Generate Landing Page
          </h1>
          {result?.success && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Download Explanation PDF
              </button>
              <button
                onClick={() => handleSaveTemplate(result)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Save as Template
              </button>
              {result.result?.sections && (
                <SitecoreExport sections={result.result.sections} />
              )}
            </div>
          )}
        </div>

        {!showPreview ? (
          <div className="bg-white rounded-lg shadow p-6">
            <CampaignInputForm
              onSubmit={handleGenerate}
              isLoading={isGenerating}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Section Editor */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Sections</h2>
                <div className="space-y-2">
                  {result?.result?.sections?.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index.toString())}
                      className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-colors ${
                        activeSection === index.toString()
                          ? 'border-difc-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{section.type}</div>
                      <div className="text-sm text-gray-500">{section.component}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back to Form
                </button>
              </div>
            </div>

            {/* Middle: Section Editor */}
            <div className="lg:col-span-1">
              {activeSection !== null && result?.result?.sections?.[parseInt(activeSection)] && (
                <SectionEditor
                  section={result.result.sections[parseInt(activeSection)]}
                  onUpdate={(updatedSection) => {
                    const updated = { ...result };
                    if (updated.result?.sections) {
                      updated.result.sections[parseInt(activeSection)] = updatedSection;
                      setResult(updated);
                    }
                  }}
                />
              )}
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                {result?.result && (
                  <LandingPagePreview
                    sections={result.result.sections}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Explanation Report */}
        {explanationReport && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Explanation Report</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Data Usage Summary</h3>
                <div className="text-sm text-gray-600">
                  <p>Campaign Fields Used: {explanationReport.dataUsageSummary?.campaignFieldsUsed?.join(', ')}</p>
                  <p>Insights Generated: {explanationReport.dataUsageSummary?.insightsGenerated?.join(', ')}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Overall Rationale</h3>
                <p className="text-sm text-gray-600">{explanationReport.overallRationale}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
