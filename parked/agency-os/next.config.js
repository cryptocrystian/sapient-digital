/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@pravado/types',
    '@pravado/validators',
    '@pravado/utils',
    '@pravado/feature-flags',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control',          value: 'on' },
          { key: 'X-Frame-Options',                  value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',           value: 'nosniff' },
          { key: 'Referrer-Policy',                  value: 'strict-origin-when-cross-origin' },
          ...(isProd ? [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }] : []),
        ],
      },
    ];
  },

  // Webpack — WSL polling only in dev
  ...(isProd ? {} : {
    onDemandEntries: {
      maxInactiveAge: 120 * 1000,
      pagesBufferLength: 10,
    },
    webpack: (config) => {
      config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
      config.cache = { type: 'memory' };
      return config;
    },
  }),
};

export default nextConfig;
