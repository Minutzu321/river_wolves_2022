/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },  
  async redirects() {
    return [
      {
        source: '/h',
        destination: '/halloween',
        permanent: true,
      },
      {
        source: '/d',
        destination: '/dashboard',
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
}

module.exports = nextConfig

