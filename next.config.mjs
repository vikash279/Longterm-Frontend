/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'assets.mixkit.co' },
    ],
  },
  poweredByHeader: false,
  compress: true,
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
