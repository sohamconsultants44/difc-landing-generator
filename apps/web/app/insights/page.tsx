'use client';

import { useState, useEffect } from 'react';

interface Insights {
  topPerformingLayouts: Array<{
    layout: string;
    conversionRate: number;
    sessions: number;
  }>;
  deviceSpecificPatterns: {
    desktop: { avgConversionRate: number; topElements: string[] };
    mobile: { avgConversionRate: number; topElements: string[] };
    tablet: { avgConversionRate: number; topElements: string[] };
  };
  conversionRateBenchmarks: {
    average: number;
    top10Percent: number;
  };
  abTestLearnings: Array<{
    element: string;
    winner: string;
    improvement: number;
  }>;
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/insights')
      .then(res => res.json())
      .then(data => {
        setInsights(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load insights:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading insights...</div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Failed to load insights</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-difc-primary mb-8">Campaign Insights</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Layouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top Performing Layouts</h2>
            <div className="space-y-3">
              {insights.topPerformingLayouts.slice(0, 5).map((layout, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">{layout.layout}</div>
                    <div className="text-sm text-gray-500">{layout.sessions} sessions</div>
                  </div>
                  <div className="text-lg font-bold text-difc-primary">
                    {layout.conversionRate.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Patterns */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Device-Specific Patterns</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Desktop</span>
                  <span className="text-difc-primary font-bold">
                    {insights.deviceSpecificPatterns.desktop.avgConversionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Top elements: {insights.deviceSpecificPatterns.desktop.topElements.join(', ')}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Mobile</span>
                  <span className="text-difc-primary font-bold">
                    {insights.deviceSpecificPatterns.mobile.avgConversionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Top elements: {insights.deviceSpecificPatterns.mobile.topElements.join(', ')}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Tablet</span>
                  <span className="text-difc-primary font-bold">
                    {insights.deviceSpecificPatterns.tablet.avgConversionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Top elements: {insights.deviceSpecificPatterns.tablet.topElements.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Benchmarks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Conversion Benchmarks</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Average</span>
                <span className="font-bold">{insights.conversionRateBenchmarks.average.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Top 10%</span>
                <span className="font-bold text-difc-primary">
                  {insights.conversionRateBenchmarks.top10Percent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* A/B Test Learnings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">A/B Test Learnings</h2>
            <div className="space-y-3">
              {insights.abTestLearnings.length > 0 ? (
                insights.abTestLearnings.map((test, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div className="font-medium">{test.element}</div>
                    <div className="text-sm text-gray-600">
                      Winner: {test.winner} (+{test.improvement.toFixed(1)}%)
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No A/B test data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

