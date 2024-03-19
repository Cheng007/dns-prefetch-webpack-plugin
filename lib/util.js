const SCRIPT_TAG_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi;
const LINK_TAG_REGEX = /<(link)\s+.*?>/gis;
const DNS_PREFETCH = "dns-prefetch";

const getHostname = (url) => new URL(url).hostname;

const getAllTag = (htmlString, tagRegEx) => {
  const match = htmlString.matchAll(tagRegEx);
  return Array.from(match)
    .map((i) => i?.[0])
    .filter(Boolean);
};

const getAllScript = (htmlString = "") =>
  getAllTag(htmlString, SCRIPT_TAG_REGEX);
const getAllLink = (htmlString = "") => getAllTag(htmlString, LINK_TAG_REGEX);

const getAttributeFromTag = (tagString, attribute) => {
  const regex = new RegExp(`\\s+(?=${attribute}="(.+)")(?!\\s+)`);
  return tagString.match(regex)?.[1];
};

function getAllDomain(htmlString) {
  const getDomains = (tag = [], attribute = "") => {
    return tag
      .map((i) => getAttributeFromTag(i, attribute))
      .filter((i) => !!i && /^(https?:)?\/\//.test(i))
      .map((i) => getHostname(i));
  };

  const scripts = getAllScript(htmlString);
  const scriptDomains = getDomains(scripts, "src");
  const links = getAllLink(htmlString);
  const linkDomains = getDomains(links, "href");

  const exist = links.filter(
    (i) => getAttributeFromTag(i, "rel") === DNS_PREFETCH,
  );
  const existPrefetchDomains = Array.from(new Set(getDomains(exist, "href")));

  const allDomains = Array.from(new Set(scriptDomains.concat(linkDomains)));

  return allDomains.filter((i) => !existPrefetchDomains.includes(i));
}

function getPrefetchHtmlString(htmlString, customDomain = []) {
  if (!htmlString) return "";
  if (customDomain && !Array.isArray(customDomain)) {
    throw new Error(
      `customDomain should be array, but get ${typeof customDomain}`,
    );
  }

  const domains = customDomain.length ? customDomain : getAllDomain(htmlString);
  if (!domains.length) return htmlString;

  const prefetchHtmlString = domains.reduce(
    (prev, cur) => prev + `<link rel="${DNS_PREFETCH}" href="//${cur}" />\n`,
    "",
  );

  const result = htmlString.replace(
    /<head[^>]*>([\s\S]*?)<\/head>/,
    `<head>$1\n${prefetchHtmlString}\n</head>`,
  );

  return result;
}

module.exports = {
  getAllScript,
  getAllLink,
  getAllDomain,
  getPrefetchHtmlString,
};
