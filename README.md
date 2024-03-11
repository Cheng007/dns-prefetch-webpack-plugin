# dns-prefetch-webpack-plugin

[中文文档](./README.zh.md)

A webpack plugin for dns-prefetch

## Why use dns-prefetch?

`dns-prefetch` can reduce third party DNS resolution latency：

When a browser requests a resource from a (third party) server, that cross-origin's domain name must be resolved to an IP address before the browser can issue the request. This process is known as DNS resolution. While DNS caching can help to reduce this latency, DNS resolution can add significant latency to requests. For websites that open connections to many third parties, this latency can significantly reduce loading performance.

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
