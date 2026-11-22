import { newUrl } from "@shared/utils/url";

/**
 * Add mediaWikiMaxSize to Special:FilePath URLs if width is missing
 */

export function setWidthOnMediaWikiUrls(sources: string[], size: number) {
  return sources.map((src) => {
    const url = newUrl(src);

    const isMediaWikiSpecialFilePath =
      ["wiki.openstreetmap.org", "commons.wikimedia.org"].includes(
        url.hostname,
      ) &&
      url.pathname.includes("/wiki/Special:FilePath/") &&
      !url.pathname.toUpperCase().endsWith(".SVG");

    if (isMediaWikiSpecialFilePath) {
      url.searchParams.set("width", String(size));
    }

    return url.toString();
  });
}
