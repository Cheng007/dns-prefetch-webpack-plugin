# dns-prefetch-webpack-plugin

<div align="center">

[![test](https://github.com/Cheng007/dns-prefetch-webpack-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/Cheng007/dns-prefetch-webpack-plugin/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Cheng007/dns-prefetch-webpack-plugin/graph/badge.svg?token=P65X9X5ISR)](https://codecov.io/gh/Cheng007/dns-prefetch-webpack-plugin)
![NPM Version](https://img.shields.io/npm/v/dns-prefetch-webpack-plugin)
![NPM Downloads](https://img.shields.io/npm/dw/dns-prefetch-webpack-plugin)

</div>

[中文文档](./README.zh.md)

A webpack plugin for dns-prefetch

## Why use dns-prefetch?

`dns-prefetch` can reduce third party DNS resolution latency：

When a browser requests a resource from a (third party) server, that cross-origin's domain name must be resolved to an IP address before the browser can issue the request. This process is known as DNS resolution. While DNS caching can help to reduce this latency, DNS resolution can add significant latency to requests. For websites that open connections to many third parties, this latency can significantly reduce loading performance.

## Installation

```bash
npm install dns-prefetch-webpack-plugin -D
```

## How to use?

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

you can mannualy define the domains

```js
{
  plugins: [new DnsPrefetchWebpackPlugin(['example1.com', 'example2.com'])],
}
```

use with [`html-webpack-plugin`](https://www.npmjs.com/package/html-webpack-plugin)

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

## Changelog

see[here](./CHANGELOG.md)
