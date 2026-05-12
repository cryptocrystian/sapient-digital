/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  trailingSlash: false,
  images: {
    remotePatterns: [],
  },
  compiler: {
    // Strip console.* from production bundles, but keep error + warn.
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

export default nextConfig;
