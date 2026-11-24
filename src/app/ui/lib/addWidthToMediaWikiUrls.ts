import { newUrl } from "@shared/utils/url";

/**
 * Add mediaWikiMaxSize to Special:FilePath URLs if width is missing.
 */
export const MediaWikiHosts = [
  "wiki.openstreetmap.org",
  "commons.wikimedia.org",
];

/**
 * All standard thumbnail widths MediaWiki offers for scaling.
 * https://www.mediawiki.org/wiki/Common_thumbnail_sizes/en
 */
export const MediaWikiWidths = [
  20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840,
] as const;

export type MediaWikiWidth = (typeof MediaWikiWidths)[number];

/**
 * Special:FilePath URL of a raster image.
 * SVGs are excluded because resizing is not needed.
 */
export function isMediaWikiFilePath(url: URL) {
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
 * Build a MediaWiki srcSet using density descriptors.
 *
 * Only standard MediaWiki widths are allowed.
 * The maximum requested size is three times expectedWidth.
 */
export function getMediaWikiSrcSet(src: string, expectedWidth: MediaWikiWidth) {
  let url: URL;

  try {
    url = newUrl(src);
  } catch {
    return undefined;
  }

  if (!isMediaWikiFilePath(url)) {
    return undefined;
  }

  return MediaWikiWidths.filter(
    (width) => width >= expectedWidth && width <= expectedWidth * 3,
  )
    .map((width) => {
      const sizedUrl = newUrl(src);
      sizedUrl.searchParams.set("width", String(width));

      const density = width / expectedWidth;

      return `${sizedUrl.toString()} ${density}x`;
    })
    .join(", ");
}
