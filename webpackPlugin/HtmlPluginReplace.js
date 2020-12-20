const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");
class HtmlPluginReplace {
  constructor(options) {
    console.log(options);
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("HtmlPluginReplace", (compilation) => {
     
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "HtmlPluginReplace", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          console.log(
            "The compiler is starting a new compilation..................."
          );
          console.log(data.plugin.childCompilerHash)
          // Manipulate the content
          var patt = /(<link[\s\S]+?href=")(\S+)?(.css"[\s\S]*?\/>)/g;
          // console.log(data.html.replace(patt, `$1$2$3hhh$4`))
          data.html = String(data.html).replace(patt, `$1$2.${data.plugin.childCompilerHash}$3`);
          // Tell webpack to move on
          console.log(data.html)
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlPluginReplace;
// compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。
