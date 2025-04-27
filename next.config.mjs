/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['v0.blob.com'],
    unoptimized: true,
  },
  // Optimize for production
  swcMinify: true,
  // Disable static optimization for pages that use browser APIs
  experimental: {
    // Increase memory limit for build
    memoryLimit: 4096,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Improve page loading
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Add trailing slash for consistent routing
  trailingSlash: false,
  // Improve asset loading
  assetPrefix: undefined,
  // Improve error handling
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  }
}

export default nextConfig
