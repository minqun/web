const path = require("path");
const HtmlPluginReplace = require("./webpackPlugin/HtmlPluginReplace.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpackMerge = require("webpack-merge");
const BaseConfig = require("./webpack.base");
let config = webpackMerge({}, BaseConfig, {
  plugins: [
    new CleanWebpackPlugin(["dist"]), // 打包前，先将dist文件中的内容全部清除
    new CopyPlugin({
      patterns: [{ from: "publish", to: "publish" }],
    }),
    // new HtmlPluginReplace(),
  ],
  output: {
    // 编译后的输出路径
    // 注意此处必须是绝对路径，不然 webpack 将会抛错（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, "dist"),
    publicPath: "./", //可能导致图片路径问题
    filename: "js/[name].[hash].js",
  },

  devtool: "inline-source-map",
  stats: "errors-only",
  mode: "production",
});
module.exports = config;
