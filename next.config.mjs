/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
