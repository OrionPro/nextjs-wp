/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['kuhni.orionpro.in'],
  }
}

module.exports = nextConfig
