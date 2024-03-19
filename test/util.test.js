const { expect, describe, it } = require("@jest/globals");
const {
  getAllDomain,
  getPrefetchHtmlString,
  getAllScript,
  getAllLink,
} = require("../lib/util");

describe("util", () => {
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Webpack App</title>
  <link href="http://example.com/path.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script defer src="main.bundle.js"></script>
  <script src="https://zhongan.com/path/test.js"></script>
</head>
<body>
  hell world
</body>
</html>`;

  it("get all script", () => {
    const scripts = getAllScript(html);
    const expeted = [
      '<script defer src="main.bundle.js"></script>',
      '<script src="https://zhongan.com/path/test.js"></script>',
    ];

    expect(scripts).toEqual(expeted);
  });

  it("get all link", () => {
    const scripts = getAllLink(html);
    const expeted = ['<link href="http://example.com/path.css" />'];

    expect(scripts).toEqual(expeted);
  });

  it("get all domain", () => {
    const domains = getAllDomain(html);

    expect(domains).toHaveLength(2);
    expect(domains).toEqual(
      expect.arrayContaining(["example.com", "zhongan.com"]),
    );
  });

  describe("dns-prefetch", () => {
    it("with custom domains", () => {
      const customDomains = ["a.com", "b.com"];
      const dnsPrefetchHtml = getPrefetchHtmlString(html, customDomains);

      const targetHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Webpack App</title>
  <link href="http://example.com/path.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script defer src="main.bundle.js"></script>
  <script src="https://zhongan.com/path/test.js"></script>

<link rel="dns-prefetch" href="//a.com" />
<link rel="dns-prefetch" href="//b.com" />

</head>
<body>
  hell world
</body>
</html>`;

      expect(dnsPrefetchHtml).toBe(targetHtml);
    });

    it("without custom domain", () => {
      const dnsPrefetchHtml = getPrefetchHtmlString(html);
      const targetHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Webpack App</title>
  <link href="http://example.com/path.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script defer src="main.bundle.js"></script>
  <script src="https://zhongan.com/path/test.js"></script>

<link rel="dns-prefetch" href="//zhongan.com" />
<link rel="dns-prefetch" href="//example.com" />

</head>
<body>
  hell world
</body>
</html>`;

      expect(dnsPrefetchHtml).toBe(targetHtml);
    });
  });
});
