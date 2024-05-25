const COMPASS_SERVER_URL = process.env.COMPASS_SERVER_URL;
const SCOUT_SERVER_URL = process.env.SCOUT_SERVER_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        // {
        //   source: '/compass/:path*',
        //   destination: `${COMPASS_SERVER_URL}/:path*`,
        // },
        {
          source: '/scout/:path*',
          destination: `${SCOUT_SERVER_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
