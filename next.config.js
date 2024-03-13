/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    domains: ['unsplash.com',"media.istockphoto.com","images.unsplash.com"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://unsplash.com;",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: "*",
          }
        ],
      },
    ];
  }
}

module.exports = nextConfig










// const nextConfig = {
//   images: {
//     unoptimized:true,
//     domains: ['localhost','unsplash.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'unsplash.com',
//          port: '',
//         pathname: '/photos/**',
//       },
//     ],
//   },
  
//   // async headers() {
//   //   return [
//   //     {
//   //       source: '/(.*)',
//   //       headers: [
//   //         {
//   //           key: 'Content-Security-Policy',
//   //           value: "img-src 'self' data: http://localhost:3001 https://unsplash.com;",
//   //         },
//   //       ],
//   //     },
//   //   ];
//   // },
// };

// module.exports = nextConfig;
