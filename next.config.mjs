/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['v0.blob.com'],
    unoptimized: true,
  },
  // Disable static optimization for pages that use browser APIs
  experimental: {
    // Disable static optimization for pages that use browser APIs
    optimizeCss: false,
    // Increase memory limit for build
    memoryLimit: 4096,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add output: 'export' for static site generation if needed
  // output: 'export',
}

export default nextConfig
