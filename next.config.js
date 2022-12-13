/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LIFF_ID: process.env.LIFF_ID,
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://go:8080'
  },
}

module.exports = nextConfig
