import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [{ source: '/tuningforks', destination: '/energy-work', permanent: true }]
  },
}

export default nextConfig;
