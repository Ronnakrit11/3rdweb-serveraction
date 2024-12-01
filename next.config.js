/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export since it's incompatible with middleware
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;