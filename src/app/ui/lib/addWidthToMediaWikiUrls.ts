import { newUrl } from "@shared/utils/url";

/**
 * Add mediaWikiMaxSize to Special:FilePath URLs if width is missing
 */

const MediaWikiHosts = ["wiki.openstreetmap.org", "commons.wikimedia.org"];

/**
 * All standard thumbnail widths MediaWiki offers for scaling.
 * https://www.mediawiki.org/wiki/Common_thumbnail_sizes/en
 */
const MediaWikiWidths = [20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840];

/**
 * Special:FilePath URL of a raster image. SVGs are excluded because
 * its not needed to create a resized image.
 */
function isMediaWikiFilePath(url: URL) {
  return (
    MediaWikiHosts.includes(url.hostname) &&
    url.pathname.includes("/wiki/Special:FilePath/") &&
    !url.pathname.toUpperCase().endsWith(".SVG")
  );
}

export function setWidthOnMediaWikiUrls(sources: string[], size: number) {
  return sources.map((src) => {
    const url = newUrl(src);

    if (isMediaWikiFilePath(url)) {
      url.searchParams.set("width", String(size));
    }

    return url.toString();
  });
}

/**
 * Build a srcset with all MediaWiki sizes for a MediaWiki Special:FilePath
 * URL (non-SVG), or undefined for any other URL. MediaWiki serves the
 * original file if a requested width exceeds it, so every entry is safe.
 */
export function getMediaWikiSrcSet(src: string) {
  let url: URL;

  try {
    url = newUrl(src);
  } catch {
    return undefined;
  }

  if (!isMediaWikiFilePath(url)) {
    return undefined;
  }

  return MediaWikiWidths.map((width) => {
    const sizedUrl = newUrl(src);
    sizedUrl.searchParams.set("width", String(width));
    return `${sizedUrl.toString()} ${width}w`;
  }).join(", ");
}
