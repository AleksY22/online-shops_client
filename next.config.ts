import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  env: {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    SERVER_URL: process.env.SERVER_URL,
  },

  images: {
    //Для доступу к изображениям на локальном сервере
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'online-shops-liard.vercel.app',
      },
      { hostname: '*.public.blob.vercel-storage.com' },
      {
        protocol: 'https',
        hostname: 'online-shops-liard.vercel.app',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },

  //функция для подгрузки файлов (картинок) с сервера
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.SERVER_URL}/uploads/:path*`,
      },
    ];
  },

  devIndicators: false,
};

export default nextConfig;
