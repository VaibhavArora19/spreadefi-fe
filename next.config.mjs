const COMPASS_SERVER_URL = process.env.NEXT_PUBLIC_COMPASS_SERVER_URL;
const SCOUT_SERVER_URL = process.env.NEXT_PUBLIC_SCOUT_SERVER_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      's2.coinmarketcap.com',
      'assets.coingecko.com',
      'tokens.pancakeswap.finance',
      'axelarscan.io',
      'assets-cdn.trustwallet.com',
      'app.mento.org',
      'assets.spooky.fi',
      'ethereum-optimism.github.io',
      'assets.smold.app',
      'polygonscan.com',
      'i.ibb.co',
      'oceanprotocol.com',
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/compass/:path*',
          destination: `${COMPASS_SERVER_URL}/:path*`,
        },
        {
          source: '/scout/:path*',
          destination: `${SCOUT_SERVER_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
