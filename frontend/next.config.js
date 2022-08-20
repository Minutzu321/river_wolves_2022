/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/h',
        destination: '/halloween',
        permanent: true,
      },
      {
        source: '/a',
        destination: '/halloween/admin',
        permanent: true,
      },
      {
        source: '/v',
        destination: '/halloween/voluntar',
        permanent: true,
      },
      {
        source: '/l',
        destination: '/halloween/login',
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
