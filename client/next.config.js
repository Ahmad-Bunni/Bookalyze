/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: { serverActions: true },

  async redirects() {
    return [
      {
        source: '/main',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
