# dns-prefetch-webpack-plugin

<div align="center">

[![test](https://github.com/Cheng007/dns-prefetch-webpack-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/Cheng007/dns-prefetch-webpack-plugin/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Cheng007/dns-prefetch-webpack-plugin/graph/badge.svg?token=P65X9X5ISR)](https://codecov.io/gh/Cheng007/dns-prefetch-webpack-plugin)
![NPM Version](https://img.shields.io/npm/v/dns-prefetch-webpack-plugin)
![NPM Downloads](https://img.shields.io/npm/dw/dns-prefetch-webpack-plugin)

</div>

[English Doc](./README.md)

一个 dns-prefetch 的 webpack 插件

## 为什么要使用 dns-prefetch？

`dns-prefetch` 可以减少第三方 DNS 解析延迟：

当浏览器从（第三方）服务器请求资源时，必须先将该跨源域名解析为 IP 地址，然后浏览器才能发出请求。此过程称为 DNS 解析。虽然 DNS 缓存可以帮助减少此延迟，但 DNS 解析可能会给请求增加明显的延迟。

## 如何使用?

**webpack.config.js**

```js
const DnsPrefetchWebpackPlugin = require("dns-prefetch-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [new DnsPrefetchWebpackPlugin()],
};
```

你也可以手动指定域名

```js
{
  plugins: [new DnsPrefetchWebpackPlugin(['example1.com', 'example2.com'])],
}
```

配合 [`html-webpack-plugin`](https://www.npmjs.com/package/html-webpack-plugin)

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DnsPrefetchWebapckPlugin = require("dns-prefetch-webpack-plugin");

module.exports = {
  entry: "index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [new HtmlWebpackPlugin(), new DnsPrefetchWebpackPlugin()],
};
```

## 版本日志

见[这里](./CHANGELOG.md)
