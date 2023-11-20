// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import * as md5 from "md5";
import { httpRegex } from "./url";
import { startsWithIgnoreCase } from "./string";

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
      size
    );
  else if (
    startsWithIgnoreCase(source, "http://commons.wikimedia.org/wiki/File:")
  )
    return generateCommonsWikimediaUrls(
      source.substring(39, source.length),
      size
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
    size
  );
}

function generateCommonsWikimediaUrls(fileName: string, size: number) {
  return generateWikimediaUrls(
    "https://upload.wikimedia.org/wikipedia/commons",
    fileName,
    size
  );
}

function generateWikimediaUrls(base: string, fileName: string, size: number) {
  fileName = decodeURI(fileName).replace(/ /g, "_");
  const hash = md5(fileName);

  return [
    `${base}/thumb/${hash.substring(0, 1)}/${hash.substring(
      0,
      2
    )}/${fileName}/${size}px-${fileName}${
      fileName.toUpperCase().endsWith(".SVG") ? ".png" : ""
    }`,

    `${base}/${hash.substring(0, 1)}/${hash.substring(0, 2)}/${fileName}`,
  ];
}
