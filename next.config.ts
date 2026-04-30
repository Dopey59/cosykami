import type { NextConfig } from 'next';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? 'cosy-kami.myshopify.com';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Shopify generates checkoutUrls using the store's primary domain (cosykami.com).
      // Since Next.js serves that domain, these paths would 404 — redirect to myshopify.com.
      {
        source: '/cart/:path*',
        destination: `https://${SHOPIFY_DOMAIN}/cart/:path*`,
        permanent: false,
      },
      {
        source: '/checkouts/:path*',
        destination: `https://${SHOPIFY_DOMAIN}/checkouts/:path*`,
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
