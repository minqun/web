const path = require("path");

const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");

let config = webpackMerge({}, BaseConfig, {
  output: {
    // 编译后的输出路径
    // 注意此处必须是绝对路径，不然 webpack 将会抛错（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, "dist"),
    publicPath: '../',  //可能导致图片路径问题
    filename: "index/index.js",
  },
  devtool: "inline-source-map",
  stats: "errors-only",
  mode: "production",
});
module.exports = config;
