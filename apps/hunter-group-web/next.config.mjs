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
        destination: '/#kaynaklar',
        permanent: true,
      },
      // Retired capital sub-pages — the funds-first dashboard is the single entry
      // point; the map and documents now live inside each fund.
      { source: '/hunter-group-capital/offerings', destination: '/hunter-group-capital', permanent: false },
      { source: '/hunter-group-capital/map', destination: '/hunter-group-capital', permanent: false },
      { source: '/hunter-group-capital/learn', destination: '/hunter-group-capital', permanent: false },
      { source: '/hunter-group-capital/investment-process', destination: '/hunter-group-capital', permanent: false },
    ];
  },
  // Reverse proxy for PostHog so analytics + session replay survive ad-blockers.
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  // Required to support PostHog trailing-slash API requests through the proxy.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
