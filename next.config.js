/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withLess = require('next-with-less');
/** @type {import('next').NextConfig} */
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
         // Add variables here
        "primaryColor":'red',
        "menu-highlight-color":"red"
      },
    },
  },
  compiler: {
    styledComponents: true,
  },
});

module.exports = nextConfig
