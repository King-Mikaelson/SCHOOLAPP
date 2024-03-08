const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/photos',
        port:""
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: 'res.cloudinary.com',
        port:""
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
