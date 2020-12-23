## 介绍

快速网站开发 webpack 配置

## 配置支持

- jsx 语法
- es6
- less

  ### 拓展

  - 配置目录 babel 支持

## 文件目录

- babel
- publish /_ copy 到 dist 文件_/
- src /_ 资源目录_/
- webpackPlugin

启动

```
npm run dev

```

构建

```
npm run build
```

备注： 开发时可以在 /src/page/\*_/_.js 引入同目录 html 文件实现热更新，打包时移除，参考/src/pages/index

```
require('./同目录下html文件')
```
