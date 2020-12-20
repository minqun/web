const path = require("path");

const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");

let config = webpackMerge({}, BaseConfig, {
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    host: "127.0.0.1",
    port: "8007",
    contentBase: path.join(__dirname, "dist"),
  },
});
module.exports = config;
