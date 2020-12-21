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
          const fileName = data.outputName.split("/")[0];
          console.log("步骤：转换主页面js路径:", fileName);
          // Manipulate the content
          // var patt = /(<script[\s\S]+?src=")(\S+)?(.js"[\s\S]*?>)/g;
          var patt = /(<script[\s\S]+?src=")(\S+)?(.js"[\s\S]*?>)/g;
          var transArr = data.html
            .match(patt)
            .map((item) => item.replace(patt, "$2"))
            .filter((item) => item.indexOf(`${fileName}/${fileName}`) > -1);
          transArr.forEach((item) => {
            const trf = item.split("/")[item.split("/").length - 1];
            const patter = new RegExp(encodeURIComponent(item), "g");
            let html = encodeURIComponent(data.html).replace(
              patter,
              ".%2F" + trf
            );
            console.log(html, patter);
            data.html = decodeURIComponent(html);
          });

          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlPluginReplace;
// compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。
