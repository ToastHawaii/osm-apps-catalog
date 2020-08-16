import md5 = require("md5");
import { httpRegex } from "./url";
import { startsWithIgnoreCase } from "./string";

export function toWikimediaUrl(source: string) {
  if (!source) return undefined;

  let fileName = "";

  if (httpRegex.test(source)) {
    return source;
  } else if (startsWithIgnoreCase(source, "File:"))
    fileName = source.substring(5, source.length);
  else if (
    startsWithIgnoreCase(source, "https://wiki.openstreetmap.org/wiki/File:")
  )
    fileName = source.substring(40, source.length);
  else if (
    startsWithIgnoreCase(source, "http://wiki.openstreetmap.org/wiki/File:")
  )
    fileName = source.substring(39, source.length);
  else fileName = source;

  fileName = decodeURI(fileName).replace(/ /g, "_");

  const hash = md5(fileName);
  return `https://wiki.openstreetmap.org/w/images/thumb/${hash.substring(
    0,
    1
  )}/${hash.substring(0, 2)}/${fileName}/320px-${fileName}`;
}
