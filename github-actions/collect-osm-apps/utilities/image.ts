import * as md5 from "md5";
import { httpRegex } from "@shared/utilities/url";
import { startsWithIgnoreCase } from "@shared/utilities/string";

export function toWikimediaUrl(source: string, size: number) {
  if (!source) return [] as string[];

  if (httpRegex.test(source)) {
    return [source];
  } else if (startsWithIgnoreCase(source, "File:")) {
    const fileName = source.substring(5, source.length);

    return [
      ...generateOsmWikimediaUrls(fileName, size),
      ...generateCommonsWikimediaUrls(fileName, size),
    ];
  } else if (
    startsWithIgnoreCase(source, "https://wiki.openstreetmap.org/wiki/File:")
  )
    return generateOsmWikimediaUrls(source.substring(41, source.length), size);
  else if (
    startsWithIgnoreCase(source, "http://wiki.openstreetmap.org/wiki/File:")
  )
    return generateOsmWikimediaUrls(source.substring(40, source.length), size);
  else if (
    startsWithIgnoreCase(source, "https://commons.wikimedia.org/wiki/File:")
  )
    return generateCommonsWikimediaUrls(
      source.substring(40, source.length),
      size,
    );
  else if (
    startsWithIgnoreCase(source, "http://commons.wikimedia.org/wiki/File:")
  )
    return generateCommonsWikimediaUrls(
      source.substring(39, source.length),
      size,
    );
  else
    return [
      ...generateOsmWikimediaUrls(source, size),
      ...generateCommonsWikimediaUrls(source, size),
    ];
}

function generateOsmWikimediaUrls(fileName: string, size: number) {
  return generateWikimediaUrls(
    "https://wiki.openstreetmap.org/w/images",
    fileName,
    size,
  );
}

function generateCommonsWikimediaUrls(fileName: string, size: number) {
  return generateWikimediaUrls(
    "https://upload.wikimedia.org/wikipedia/commons",
    fileName,
    size,
  );
}

function generateWikimediaUrls(base: string, fileName: string, size: number) {
  fileName = decodeURI(fileName).replace(/ /g, "_");
  const hash = (md5 as any)(fileName);

  return [
    `${base}/thumb/${hash.substring(0, 1)}/${hash.substring(
      0,
      2,
    )}/${fileName}/${size}px-${fileName}${
      fileName.toUpperCase().endsWith(".SVG") ? ".png" : ""
    }`,

    `${base}/${hash.substring(0, 1)}/${hash.substring(0, 2)}/${fileName}`,
  ];
}
