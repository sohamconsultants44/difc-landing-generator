'use client';

import { useState } from 'react';

interface CampaignInput {
  campaignObjective: 'lead-gen' | 'sales' | 'signup';
  primaryConversionKPI: string;
  targetAudience: string;
  buyerPersonaKeywords: string[];
  productServiceName: string;
  primaryOffer: string;
  uniqueValueProposition: string;
  top3To5Benefits: string[];
  featureList: string[];
  emotionalTriggers: string[];
  objectionsToOvercome: string[];
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    quote: string;
    image?: string;
  }>;
  trustIndicators: Array<{
    type: 'badge' | 'certification' | 'award' | 'statistic';
    label: string;
    value?: string;
    image?: string;
  }>;
  primaryCTAText: string;
  secondaryCTAText?: string;
  formFields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox';
    required: boolean;
    placeholder?: string;
    options?: string[];
    validation?: {
      pattern?: string;
      minLength?: number;
      maxLength?: number;
    };
  }>;
  apiConfig?: {
    endpoint: string;
    method: 'POST' | 'PUT';
    headers?: Record<string, string>;
  };
  heroImage?: string;
  secondaryImages?: string[];
  videoURL?: string;
  toneOfVoice: 'formal' | 'friendly' | 'playful';
  brandColorPalette?: string[];
  fontStyleGuide?: string[];
  logo?: string;
  pageLayoutPreference: 'scroll' | 'modular' | 'storytelling';
  targetSEOKeywords: string[];
  eventTrackingSetup?: string[];
  analyticsIDs?: {
    googleAnalytics?: string;
    googleTagManager?: string;
  };
  privacyPolicyURL: string;
  gdprCCPAConsentText: string;
}

interface CampaignInputFormProps {
  onSubmit: (data: CampaignInput) => void;
  initialData?: Partial<CampaignInput>;
  isLoading?: boolean;
}

export default function CampaignInputForm({ onSubmit, initialData, isLoading }: CampaignInputFormProps) {
  const [formData, setFormData] = useState<CampaignInput>({
    campaignObjective: initialData?.campaignObjective || 'lead-gen',
    primaryConversionKPI: initialData?.primaryConversionKPI || '',
    targetAudience: initialData?.targetAudience || '',
    buyerPersonaKeywords: initialData?.buyerPersonaKeywords || [],
    productServiceName: initialData?.productServiceName || '',
    primaryOffer: initialData?.primaryOffer || '',
    uniqueValueProposition: initialData?.uniqueValueProposition || '',
    top3To5Benefits: initialData?.top3To5Benefits || [],
    featureList: initialData?.featureList || [],
    emotionalTriggers: initialData?.emotionalTriggers || [],
    objectionsToOvercome: initialData?.objectionsToOvercome || [],
    testimonials: initialData?.testimonials || [],
    trustIndicators: initialData?.trustIndicators || [],
    primaryCTAText: initialData?.primaryCTAText || '',
    secondaryCTAText: initialData?.secondaryCTAText,
    formFields: initialData?.formFields || [],
    apiConfig: initialData?.apiConfig,
    heroImage: initialData?.heroImage,
    secondaryImages: initialData?.secondaryImages,
    videoURL: initialData?.videoURL,
    toneOfVoice: initialData?.toneOfVoice || 'friendly',
    brandColorPalette: initialData?.brandColorPalette,
    fontStyleGuide: initialData?.fontStyleGuide,
    logo: initialData?.logo,
    pageLayoutPreference: initialData?.pageLayoutPreference || 'scroll',
    targetSEOKeywords: initialData?.targetSEOKeywords || [],
    eventTrackingSetup: initialData?.eventTrackingSetup,
    analyticsIDs: initialData?.analyticsIDs,
    privacyPolicyURL: initialData?.privacyPolicyURL || '',
    gdprCCPAConsentText: initialData?.gdprCCPAConsentText || '',
  });

  const [activeTab, setActiveTab] = useState('basic');

  const updateField = <K extends keyof CampaignInput>(field: K, value: CampaignInput[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: keyof CampaignInput, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), item],
    }));
  };

  const removeArrayItem = (field: keyof CampaignInput, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'social', label: 'Social Proof' },
    { id: 'form', label: 'Form Builder' },
    { id: 'visuals', label: 'Visuals' },
    { id: 'seo', label: 'SEO & Analytics' },
    { id: 'compliance', label: 'Compliance' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-difc-primary text-difc-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Objective *
              </label>
              <select
                value={formData.campaignObjective}
                onChange={(e) => updateField('campaignObjective', e.target.value as CampaignInput['campaignObjective'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              >
                <option value="lead-gen">Lead Generation</option>
                <option value="sales">Sales</option>
                <option value="signup">Signup</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Conversion KPI *
              </label>
              <input
                type="text"
                value={formData.primaryConversionKPI}
                onChange={(e) => updateField('primaryConversionKPI', e.target.value)}
                placeholder="e.g., 5% sign-ups"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience *
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                placeholder="Role, industry, pain points"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buyer Persona Keywords
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add keyword"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        addArrayItem('buyerPersonaKeywords', input.value.trim());
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.buyerPersonaKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-difc-primary text-white"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('buyerPersonaKeywords', index)}
                      className="ml-2 hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product/Service Name *
              </label>
              <input
                type="text"
                value={formData.productServiceName}
                onChange={(e) => updateField('productServiceName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Offer *
              </label>
              <input
                type="text"
                value={formData.primaryOffer}
                onChange={(e) => updateField('primaryOffer', e.target.value)}
                placeholder="e.g., Free trial, 20% discount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unique Value Proposition *
              </label>
              <textarea
                value={formData.uniqueValueProposition}
                onChange={(e) => updateField('uniqueValueProposition', e.target.value)}
                placeholder="What makes you different from competitors"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Layout Preference *
              </label>
              <select
                value={formData.pageLayoutPreference}
                onChange={(e) => updateField('pageLayoutPreference', e.target.value as CampaignInput['pageLayoutPreference'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              >
                <option value="scroll">Scroll</option>
                <option value="modular">Modular</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tone of Voice *
              </label>
              <select
                value={formData.toneOfVoice}
                onChange={(e) => updateField('toneOfVoice', e.target.value as CampaignInput['toneOfVoice'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              >
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
                <option value="playful">Playful</option>
              </select>
            </div>
          </div>
        )}

        {/* Messaging Tab */}
        {activeTab === 'messaging' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top 3-5 Benefits
              </label>
              <div className="space-y-2">
                {formData.top3To5Benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const updated = [...formData.top3To5Benefits];
                        updated[index] = e.target.value;
                        updateField('top3To5Benefits', updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('top3To5Benefits', index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('top3To5Benefits', '')}
                  className="text-sm text-difc-primary hover:underline"
                >
                  + Add Benefit
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature List
              </label>
              <div className="space-y-2">
                {formData.featureList.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const updated = [...formData.featureList];
                        updated[index] = e.target.value;
                        updateField('featureList', updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('featureList', index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('featureList', '')}
                  className="text-sm text-difc-primary hover:underline"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emotional Triggers
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add trigger (e.g., trust, urgency)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        addArrayItem('emotionalTriggers', input.value.trim());
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.emotionalTriggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {trigger}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('emotionalTriggers', index)}
                      className="ml-2 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objections to Overcome
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add objection"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        addArrayItem('objectionsToOvercome', input.value.trim());
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.objectionsToOvercome.map((objection, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                  >
                    {objection}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('objectionsToOvercome', index)}
                      className="ml-2 hover:text-yellow-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary CTA Text *
              </label>
              <input
                type="text"
                value={formData.primaryCTAText}
                onChange={(e) => updateField('primaryCTAText', e.target.value)}
                placeholder="e.g., Start Free Trial"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary CTA Text (Optional)
              </label>
              <input
                type="text"
                value={formData.secondaryCTAText || ''}
                onChange={(e) => updateField('secondaryCTAText', e.target.value)}
                placeholder="e.g., Learn More"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>
          </div>
        )}

        {/* Social Proof Tab */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonials
              </label>
              <div className="space-y-4">
                {formData.testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={testimonial.name}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateField('testimonials', updated);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={testimonial.role}
                        onChange={(e) => {
                          const updated = [...formData.testimonials];
                          updated[index] = { ...updated[index], role: e.target.value };
                          updateField('testimonials', updated);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={testimonial.company}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[index] = { ...updated[index], company: e.target.value };
                        updateField('testimonials', updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <textarea
                      placeholder="Quote"
                      value={testimonial.quote}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[index] = { ...updated[index], quote: e.target.value };
                        updateField('testimonials', updated);
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateField('testimonials', formData.testimonials.filter((_, i) => i !== index));
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Testimonial
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    updateField('testimonials', [
                      ...formData.testimonials,
                      { name: '', role: '', company: '', quote: '' },
                    ]);
                  }}
                  className="text-sm text-difc-primary hover:underline"
                >
                  + Add Testimonial
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trust Indicators
              </label>
              <div className="space-y-2">
                {formData.trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={indicator.type}
                      onChange={(e) => {
                        const updated = [...formData.trustIndicators];
                        updated[index] = { ...updated[index], type: e.target.value as any };
                        updateField('trustIndicators', updated);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    >
                      <option value="badge">Badge</option>
                      <option value="certification">Certification</option>
                      <option value="award">Award</option>
                      <option value="statistic">Statistic</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Label"
                      value={indicator.label}
                      onChange={(e) => {
                        const updated = [...formData.trustIndicators];
                        updated[index] = { ...updated[index], label: e.target.value };
                        updateField('trustIndicators', updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateField('trustIndicators', formData.trustIndicators.filter((_, i) => i !== index));
                      }}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    updateField('trustIndicators', [
                      ...formData.trustIndicators,
                      { type: 'badge', label: '' },
                    ]);
                  }}
                  className="text-sm text-difc-primary hover:underline"
                >
                  + Add Trust Indicator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Builder Tab */}
        {activeTab === 'form' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Fields
              </label>
              <div className="space-y-3">
                {formData.formFields.map((field, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Field Name"
                        value={field.name}
                        onChange={(e) => {
                          const updated = [...formData.formFields];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateField('formFields', updated);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                      />
                      <select
                        value={field.type}
                        onChange={(e) => {
                          const updated = [...formData.formFields];
                          updated[index] = { ...updated[index], type: e.target.value as any };
                          updateField('formFields', updated);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="select">Select</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) => {
                        const updated = [...formData.formFields];
                        updated[index] = { ...updated[index], label: e.target.value };
                        updateField('formFields', updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-difc-primary"
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => {
                            const updated = [...formData.formFields];
                            updated[index] = { ...updated[index], required: e.target.checked };
                            updateField('formFields', updated);
                          }}
                          className="mr-2"
                        />
                        Required
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          updateField('formFields', formData.formFields.filter((_, i) => i !== index));
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Field
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    updateField('formFields', [
                      ...formData.formFields,
                      { name: '', label: '', type: 'text', required: false },
                    ]);
                  }}
                  className="text-sm text-difc-primary hover:underline"
                >
                  + Add Form Field
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Endpoint (Optional)
              </label>
              <input
                type="url"
                value={formData.apiConfig?.endpoint || ''}
                onChange={(e) => {
                  updateField('apiConfig', {
                    ...formData.apiConfig,
                    endpoint: e.target.value,
                    method: formData.apiConfig?.method || 'POST',
                  });
                }}
                placeholder="https://api.example.com/submit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>
          </div>
        )}

        {/* Visuals Tab */}
        {activeTab === 'visuals' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.heroImage || ''}
                onChange={(e) => updateField('heroImage', e.target.value)}
                placeholder="https://example.com/hero.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL (Optional)
              </label>
              <input
                type="url"
                value={formData.videoURL || ''}
                onChange={(e) => updateField('videoURL', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL (Optional)
              </label>
              <input
                type="url"
                value={formData.logo || ''}
                onChange={(e) => updateField('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Colors (Hex codes, comma-separated)
              </label>
              <input
                type="text"
                value={formData.brandColorPalette?.join(', ') || ''}
                onChange={(e) => {
                  const colors = e.target.value.split(',').map(c => c.trim()).filter(c => c);
                  updateField('brandColorPalette', colors);
                }}
                placeholder="#001E60, #FFFFFF"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>
          </div>
        )}

        {/* SEO & Analytics Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target SEO Keywords
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add keyword"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      if (input.value.trim()) {
                        addArrayItem('targetSEOKeywords', input.value.trim());
                        input.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.targetSEOKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('targetSEOKeywords', index)}
                      className="ml-2 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Analytics ID (Optional)
              </label>
              <input
                type="text"
                value={formData.analyticsIDs?.googleAnalytics || ''}
                onChange={(e) => {
                  updateField('analyticsIDs', {
                    ...formData.analyticsIDs,
                    googleAnalytics: e.target.value,
                  });
                }}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Tag Manager ID (Optional)
              </label>
              <input
                type="text"
                value={formData.analyticsIDs?.googleTagManager || ''}
                onChange={(e) => {
                  updateField('analyticsIDs', {
                    ...formData.analyticsIDs,
                    googleTagManager: e.target.value,
                  });
                }}
                placeholder="GTM-XXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
              />
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy URL *
              </label>
              <input
                type="url"
                value={formData.privacyPolicyURL}
                onChange={(e) => updateField('privacyPolicyURL', e.target.value)}
                placeholder="https://example.com/privacy"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GDPR/CCPA Consent Text *
              </label>
              <textarea
                value={formData.gdprCCPAConsentText}
                onChange={(e) => updateField('gdprCCPAConsentText', e.target.value)}
                placeholder="I agree to the privacy policy and terms of service"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-difc-primary"
                required
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-difc-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? 'Generating...' : 'Generate Landing Page'}
        </button>
      </div>
    </form>
  );
}

