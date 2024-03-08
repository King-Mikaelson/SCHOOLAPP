const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
         port: '',
        pathname: '/photos/**',
      },
    ],
  },
  
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "img-src 'self' data: https://res.cloudinary.com https://unsplash.com; frame-src 'self';",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
