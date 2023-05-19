/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false,
  trailingSlash: true,
  env: {

    // HOST
    HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
    // MAPBOX
    MAPBOX_API: '',
  
    
  },
};
