const { RawSource } = require("webpack-sources");
const { getPrefetchHtmlString } = require("./util");

class DnsPrefetchPlugin {
  constructor(domains = []) {
    this.domains = Array.isArray(domains) ? domains : [domains].filter(Boolean);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "DnsPrefetchPlugin",
      (compilation, callback) => {
        const htmlPath = Object.keys(compilation.assets).find((path) =>
          path.endsWith(".html"),
        );
        if (!htmlPath) {
          callback();
          return;
        }

        const source = compilation.assets[htmlPath].source();
        const dnsPrefetchHtmlString = getPrefetchHtmlString(
          source,
          this.domains,
        );

        compilation.assets[htmlPath] = new RawSource(dnsPrefetchHtmlString);

        callback();
      },
    );
  }
}

module.exports = DnsPrefetchPlugin;
