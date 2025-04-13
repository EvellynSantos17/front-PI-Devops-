/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${
          process.env.BACKEND_SERVICE_NAME ?? "localhost"
        }:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
