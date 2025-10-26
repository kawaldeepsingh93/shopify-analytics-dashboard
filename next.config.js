/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/shopify-analytics-dashboard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/shopify-analytics-dashboard/' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig