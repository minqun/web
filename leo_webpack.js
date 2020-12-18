const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");
let moduleID = 0;
const createAssets = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  const dependencies = []; // 用于收集文件依赖的路径
  const ast = parser.parse(content, {
    sourceType: "module",
  });
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });
  let id = moduleID++; // 设置当前处理的模块ID
  return {
    id,
    filename,
    code,
    dependencies,
  };
};

function createGraph(entry) {
  const mainAsset = createAssets(entry); // 获取入口文件下的内容
  const queue = [mainAsset]; // 入口文件的结果作为第一项
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath); // 转换文件路径为绝对路径
      const child = createAssets(absolutePath);
      asset.mapping[relativePath] = child.id; // 保存模块ID
      queue.push(child); // 递归去遍历所有子节点的文件
    });
  }
  return queue;
}
function bundle(graph) {
  let modules = "";
  graph.forEach((item) => {
    modules += `
          ${item.id}: [
              function (require, module, exports){
                  ${item.code}
              },
              ${JSON.stringify(item.mapping)}
          ],
      `;
  });
}
console.log(createGraph("./src/index.js"));
