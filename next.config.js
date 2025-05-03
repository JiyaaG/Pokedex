/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Ensure images from the Pokemon API are allowed
  images: {
    domains: ['raw.githubusercontent.com'],
  }
};

module.exports = nextConfig; 