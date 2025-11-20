import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4 text-difc-primary">
          DIFC AI Landing Page Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the AI-Powered Landing Page Generator
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-difc-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/generate"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            Generate Page
          </Link>
        </div>
      </div>
    </main>
  );
}

