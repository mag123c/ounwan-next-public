/** @type {import('next').NextConfig} */
module.exports = {  
  assetPrefix: '.',
  async redirects() {
    return [
      {
        source: '/',
        destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/main`,
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['app.ounwan.net', 'localhost', '127.0.0.1', 'api.ounwan.net']
  },  
};