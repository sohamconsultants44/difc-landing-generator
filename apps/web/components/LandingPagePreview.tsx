'use client';

interface Section {
  type: string;
  component: string;
  props: Record<string, unknown>;
}

interface LandingPagePreviewProps {
  sections: Section[];
}

export default function LandingPagePreview({ sections }: LandingPagePreviewProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No sections to preview</p>
        <p className="text-sm mt-2">Generate a landing page to see the preview</p>
      </div>
    );
  }

  const renderSection = (section: Section, index: number) => {
    const { type, component, props } = section;

    switch (type.toLowerCase()) {
      case 'hero':
        return (
          <section key={index} className="bg-gradient-to-r from-difc-primary to-blue-800 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {String(props.title || props.heading || 'Welcome')}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {String(props.subtitle || props.description || '')}
              </p>
              {props.ctaText && (
                <button className="bg-white text-difc-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  {String(props.ctaText)}
                </button>
              )}
            </div>
          </section>
        );

      case 'features':
      case 'benefits':
        return (
          <section key={index} className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-difc-primary">
                {String(props.title || 'Features')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(props.items as string[])?.map((item: string, i: number) => (
                  <div key={i} className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="font-semibold mb-2">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section key={index} className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-difc-primary">
                {String(props.title || 'What Our Customers Say')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(props.items as Array<{ name: string; quote: string; role?: string }>)?.map((testimonial, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    {testimonial.role && <div className="text-sm text-gray-500">{testimonial.role}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'form':
      case 'cta':
        return (
          <section key={index} className="py-16 px-6 bg-difc-primary text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {String(props.title || 'Get Started Today')}
              </h2>
              <p className="mb-8 opacity-90">
                {String(props.description || '')}
              </p>
              <div className="bg-white rounded-lg p-6 text-gray-900">
                {(props.fields as Array<{ label: string; type: string }>)?.map((field, i) => (
                  <div key={i} className="mb-4">
                    <label className="block text-left mb-2 font-medium">{field.label}</label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      placeholder={field.label}
                    />
                  </div>
                ))}
                <button className="w-full bg-difc-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  {String(props.submitText || props.ctaText || 'Submit')}
                </button>
              </div>
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer key={index} className="bg-gray-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">About</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href={String(props.privacyPolicyURL || '#')} className="hover:underline">Privacy Policy</a></li>
                    <li><a href="#" className="hover:underline">Terms</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} All rights reserved</p>
              </div>
            </div>
          </footer>
        );

      default:
        return (
          <section key={index} className="py-12 px-6 bg-white border-b">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-difc-primary">{type}</h2>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(props, null, 2)}
              </pre>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-sm text-gray-600">Preview</span>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
}
