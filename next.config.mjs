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
  },
};