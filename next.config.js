module.exports = {
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
}
