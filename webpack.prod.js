const path = require("path");
const HtmlPluginReplace = require("./webpackPlugin/HtmlPluginReplace.js");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");
let config = webpackMerge({}, BaseConfig, {
  plugins: [
    new CleanWebpackPlugin({
      patterns: [
        { from: "./src/publish", to: "dist/publish" },
      ],
    }),
    new HtmlPluginReplace(),
    ...BaseConfig.plugins,
  ],
  output: {
    // 编译后的输出路径
    // 注意此处必须是绝对路径，不然 webpack 将会抛错（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, "dist"),
    publicPath: '../',  //可能导致图片路径问题
    filename: "[name].[hash].js",
  },

  devtool: "inline-source-map",
  stats: "errors-only",
  mode: "production",
});
module.exports = config;
