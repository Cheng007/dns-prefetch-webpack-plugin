const { parseFromString } = require("dom-parser");

const DNS_PREFETCH = "dns-prefetch";
const getHostname = (url) => new URL(url).hostname;

function getAllDomain(htmlString) {
  const dom = parseFromString(htmlString);

  const getDomains = (elements, attribute) => {
    return elements
      .map((i) => i.getAttribute(attribute))
      .filter((i) => !!i && /^(https?:)?\/\//.test(i))
      .map((i) => getHostname(i));
  };

  const scripts = dom.getElementsByTagName("script");
  const scriptDomains = getDomains(scripts, "src");
  const links = dom.getElementsByTagName("link");
  const linkDomains = getDomains(links, "href");

  const exist = links.filter(
    (i) => i.getAttribute("rel") === DNS_PREFETCH && !!i.getAttribute("href"),
  );
  const existPrefetchDomains = Array.from(new Set(getDomains(exist, "href")));

  const allDomains = Array.from(new Set(scriptDomains.concat(linkDomains)));

  return allDomains.filter((i) => !existPrefetchDomains.includes(i));
}

function getPrefetchHtmlString(htmlString, customDomain) {
  if (!htmlString) return "";
  if (customDomain && !Array.isArray(customDomain)) {
    throw new Error(
      `customDomain should be array, but get ${typeof customDomain}`,
    );
  }

  const domains = customDomain.length ? customDomain : getAllDomain(htmlString);
  if (!domains.length) return htmlString;

  const prefetchHtmlString = domains.reduce(
    (prev, cur) => prev + `<link ref="${DNS_PREFETCH}" href="//${cur}">`,
    "",
  );

  const result = htmlString.replace(
    /<head[^>]*>([\s\S]*?)<\/head>/,
    `<head>$1${prefetchHtmlString}</head>`,
  );

  return result;
}

module.exports = {
  getPrefetchHtmlString,
};
