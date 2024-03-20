const fs = require("fs");
const path = require("path");

const { expect, describe, it, beforeEach } = require("@jest/globals");
const {
  getAllDomain,
  getPrefetchHtmlString,
  getAllScript,
  getAllLink,
} = require("../lib/util");

describe("util", () => {
  let html;
  beforeEach(async () => {
    html =
      html ||
      (await fs.promises.readFile(
        path.resolve(__dirname, "./template/base.html"),
        "utf8",
      ));
  });

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
    it("with custom domains", async () => {
      const customDomains = ["a.com", "b.com"];
      const dnsPrefetchHtml = getPrefetchHtmlString(html, customDomains);
      expect(dnsPrefetchHtml).toMatchSnapshot();
    });

    it("without custom domain", () => {
      const dnsPrefetchHtml = getPrefetchHtmlString(html);
      expect(dnsPrefetchHtml).toMatchSnapshot();
    });
  });
});
