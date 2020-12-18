const path = require("path");

const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");

let config = webpackMerge({}, BaseConfig, {
  devtool: "inline-source-map",
  stats: "errors-only",
  mode: "production",
});
module.exports = config;
