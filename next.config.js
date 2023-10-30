// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// const withCSS = require("@zeit/next-css");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images')

module.exports = withImages({
  // exclude: path.resolve(__dirname, "public/svg"),
  images: {
    domains: [
      'service.calypsosun.com',
      'calypso-static.s3.amazonaws.com',
      'linco-cabana.s3.amazonaws.com',
    ],
  },
  redirects: async () => {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: '/carrot-oil',
        destination: '/products/carrot-oil',
        permanent: false,
      },
      {
        source: '/kids-disappearing-blue-lotion',
        destination: '/products/kids-disappearing-blue-lotion',
        permanent: false,
      },
      {
        source: '/products/once-a-day-suitable-for-kids',
        destination: '/products/once-a-day-lotion',
        permanent: false,
      },
      {
        source: '/products/carrot-oil-2',
        destination: '/products/carrot-oil',
        permanent: false,
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    return config
  },
  output: 'standalone', // This will build the project as a standalone app inside the Docker image.
})
