module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4000/api/:path*'
            }
        ];
    },
    images: {
        domains:['localhost'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '4000',
            pathname: '/news-portal/backend/**',
          },
        ],
      },
};