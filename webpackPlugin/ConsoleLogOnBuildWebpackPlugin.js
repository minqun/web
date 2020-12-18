const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");
class HtmlPluginReplace {
  constructor(options) {
    console.log(options);
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("HtmlPluginReplace", (compilation) => {
      console.log(
        "The compiler is starting a new compilation..................."
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "HtmlPluginReplace", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          console.log(data);
          // Manipulate the content
          data.html += "The Magic Footer";
          // Tell webpack to move on
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlPluginReplace;
// compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。
