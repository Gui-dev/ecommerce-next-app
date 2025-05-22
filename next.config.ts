import type { NextConfig } from 'next'
import { createSecureHeaders } from 'next-secure-headers'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: createSecureHeaders(),
      },
    ]
  },
}

export default nextConfig
