const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/api/asset/Jacob Daitzman Resume.pdf',
        permanent: true,
      },
    ]
  },
  // Fix for Sentry not working with Next.js
  outputFileTracing: false,
}

module.exports = withSentryConfig(moduleExports)
