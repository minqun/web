const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlPluginReplace = require("./webpackPlugin/HtmlPluginReplace.js");
const CopyPlugin = require("copy-webpack-plugin");
const babelCommonConfig = require("./babel/babelCommonConfig");
const babelConfig = babelCommonConfig(false);
const files = require("./pagesFile");
module.exports = {
  mode: "development",
  //  起点或是应用程序的起点入口
  entry: files.mainEntries,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : {
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
  plugins:
    process.env.NODE_ENV == "production"
      ? [
          // new HtmlPluginReplace(),
          ...files.htmlPlugins,
          new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            // publicPath: path.resolve(__dirname, '/dist'),
            chunkFilename: "css/[id].[hash].css",
          }),
          new CopyPlugin({
            patterns: [{ from: "publish", to: "publish" }],
          }),
        ]
      : process.env.NODE_ENV == "development"
      ? [
          new CopyPlugin({
            patterns: [{ from: "publish", to: "publish" }],
          }),
          ...files.htmlPlugins,
          new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            // publicPath: path.resolve(__dirname, '/dist'),
            chunkFilename: "css/[id].[hash].css",
          }),
          require("autoprefixer"),
        ]
      : [
          new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            // publicPath: path.resolve(__dirname, '/dist'),
            chunkFilename: "css/[id].[hash].css",
          }),
        ],
  output: {
    // 编译后的输出路径
    // 注意此处必须是绝对路径，不然 webpack 将会抛错（使用 Node.js 的 path 模块）
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", //可能导致图片路径问题
    filename: "js/[name].[hash].js",
  },
  optimization: {
    //webpack4新增
    splitChunks: {
      //可以在这里直接设置抽离代码的参数，最后将符合条件的代码打包至一个公共文件
      cacheGroups: {
        //设置缓存组用来抽取满足不同规则的chunk,下面以生成common、vender为例
        // 根据不同的参数设置抽取不同条件的公共js
        common: {
          //
          name: "common",
          chunks: "all",
          minSize: 10,
          minChunks: 1,
          priority: 1, //设置匹配优先级，数字越小，优先级越低
        },
        vendor: {
          name: "vender",
          test: /[\\/]node_modules[\\/]/, //匹配node模块中匹配的的模块
          priority: 11, //设置匹配优先级，数字越大，优先级越高
          chunks: "all",
        },
      },
    },
  },
};
