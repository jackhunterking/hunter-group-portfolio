/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['resend'],
  },
  async redirects() {
    return [
      {
        source: '/rehber',
        destination: '/#rehberler',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
