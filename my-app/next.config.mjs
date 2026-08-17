/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  optimizePackageImports: ['react', 'react-dom'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
