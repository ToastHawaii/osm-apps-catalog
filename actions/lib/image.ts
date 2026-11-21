function extractFromWikiText(input: string) {
  const match = input.match(/\[\[(?:File|Image):([^|\]]+)/i);
  return match?.[1].trim();
}

/**
 * For a osm.wiki file or image create a list of possible files urls.
 * The target can be the osm.wiki or commons.
 */
export function toWikimediaUrl(fileName: string) {
  if (!fileName) return [];

  const extracted = extractFromWikiText(fileName);
  if (extracted) {
    fileName = extracted;
  }

  const encodedFileName = encodeURIComponent(fileName.replace(/ /g, "_"));

  return [
    `https://wiki.openstreetmap.org/wiki/Special:FilePath/${encodedFileName}`,
  ];
}
