import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'DIFC AI Landing Page Generator',
  description: 'AI-Powered Landing Page Generator for DIFC - Create responsive, SEO-first, brand-compliant landing pages',
  keywords: ['DIFC', 'landing page', 'AI', 'generator', 'marketing'],
  authors: [{ name: 'DIFC' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="h-full font-sans antialiased">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-difc-primary">
                    DIFC Generator
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-difc-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/generate"
                  className="bg-difc-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
                >
                  Generate
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
