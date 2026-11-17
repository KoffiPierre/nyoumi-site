/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // The admin space is a static app in public/admin/index.html.
    return [{ source: '/admin', destination: '/admin/index.html' }];
  },
  async redirects() {
    // Old addresses that moved during the redesign keep working.
    return [
      { source: '/:locale(fr|en)/formation', destination: '/:locale/activites', permanent: true },
      { source: '/:locale(fr|en)/ouvrage', destination: '/:locale/publications#ouvrage', permanent: true },
    ];
  },
};

module.exports = nextConfig;
