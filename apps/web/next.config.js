/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static export for deployment
  output: 'standalone',
  // API proxy for development - only proxy /api routes, not root
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api/:path*',
      },
    ];
  },
  // SEO optimization
  compress: true,
  poweredByHeader: false,
  // Image optimization
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
