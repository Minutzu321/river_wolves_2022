/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/nm',
        destination: '/noaptea-muzeelor',
        permanent: true,
      },
      {
        source: '/',
        destination: '/acasa',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
}

module.exports = nextConfig
