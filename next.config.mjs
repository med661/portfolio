import nextI18NextConfig from './next-i18next.config.js';

export default {
  i18n: nextI18NextConfig.i18n,
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'ih1.redbubble.net',
      'encrypted-tbn0.gstatic.com',
      'adware-technologies.s3.amazonaws.com',
      'media.licdn.com',
      'miro.medium.com'
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};