const COMPASS_SERVER_URL = process.env.NEXT_PUBLIC_COMPASS_SERVER_URL;
const SCOUT_SERVER_URL = process.env.NEXT_PUBLIC_SCOUT_SERVER_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
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
