const path = require("path");

const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");

let config = webpackMerge({}, BaseConfig, {
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://yapi.batmobi.cn",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    host: "192.168.5.120",
    port: "8002",
    contentBase: path.join(__dirname, "dist"),
  },
});
module.exports = config;
