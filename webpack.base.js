const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPluginReplace = require("./webpackPlugin/HtmlPluginReplace.js");
const babelCommonConfig = require("./babel/babelCommonConfig");
const babelConfig = babelCommonConfig(false);
console.log(process.env.NODE_ENV, "环境");
module.exports = {
  mode: "development",
  //  起点或是应用程序的起点入口
  entry: "./src/pages/index/index",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === "development"? "style-loader": {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: "./",
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: process.env.NODE_ENV == "development", // 仅dev环境启用HMR功能
            },
          },
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: babelConfig,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]?[hash]",
        },
      },
      {
        test: /\.(htm|html)$/i,
        use: ["html-withimg-loader"],
      },
    ],
  },
  plugins: [
    // new HtmlPluginReplace(),
    new HtmlWebpackPlugin({
      template: 'html-withimg-loader!' + path.resolve(__dirname, './src/pages/index/index.html'),
      filename: `index/index.html`,
      inject: "body",
      minify: false,
      chunks: ["index", "verndor", "commons"],
    }),
    new MiniCssExtractPlugin({
      filename: "index/index.[hash].css",
      // publicPath: path.resolve(__dirname, '/dist'),
      chunkFilename: "index/[id].[hash].css",
    }),
  ],
  output: {
    // 编译后的输出路径
    // 注意此处必须是绝对路径，不然 webpack 将会抛错（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',  //可能导致图片路径问题
    filename: "index/index.js",
  },
};
