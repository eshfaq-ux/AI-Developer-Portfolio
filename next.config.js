/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
  // Remove output: 'export' to enable API routes on Vercel
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig
