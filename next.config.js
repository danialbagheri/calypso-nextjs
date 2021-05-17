const path = require("path");
// const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withImages({
  // exclude: path.resolve(__dirname, "public/svg"),
  images: {
    domains: ["service.calypsosun.com"],
  },
  redirects: async () => {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: "/carrot-oil",
        destination: "/products/carrot-oil",
        permanent: false,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config, options) {
    return config;
  },
});

// module.exports = withImages({
//   exclude: path.resolve(__dirname, "src/assets/svg"),
//   webpack(config, options) {
//     return config;
//   },
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
// });

// module.exports = withCSS({
//   webpack: function (config) {
//     config.module.rules.push({
//       test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//       use: {
//         loader: "url-loader",
//         options: {
//           limit: 100000,
//           name: "[name].[ext]",
//         },
//       },
//     });
//     return config;
//   },
// });
