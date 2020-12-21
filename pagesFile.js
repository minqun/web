const HtmlWebpackPlugin = require("html-webpack-plugin");

const createFiles = () => {
  const path = require("path");
  const glob = require("glob");
  const result = [];
  const files = glob.sync(path.join(__dirname, "./src/pages/**/*.html"));
  let obj = {};
  for (file of files) {
    let name = file.match(/\w{0,}(?=\.html)/)[0];
    let template = `./src/pages/${name}/${name}.html`;
    let chunks =
      process.env.NODE_ENV == "development"
        ? [name]
        : [name, "verndor", "commons"];
    let tplName = name;
    result.push(
      new HtmlWebpackPlugin({
        template: template,
        filename: `${tplName}.html`,
        inject: "body",
        minify: false,
        chunks: chunks,
      })
    );
    obj[name] = `./src/pages/${name}/${name}.js`;
  }
  return { htmlPlugins: result, mainEntries: obj };
};

const files = createFiles();
module.exports = files;
