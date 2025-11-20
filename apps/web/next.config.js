/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static export for deployment
  output: 'standalone',
  // API proxy for development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL || 'http://localhost:3001/api/:path*',
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
