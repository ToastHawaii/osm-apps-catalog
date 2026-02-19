import { App } from "@shared/data/App";
import { newUrl } from "@shared/utils/url";

/**
 * Returns a hash code from a string
 * @param str The string to hash.
 * @return A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function calcId(obj: App): number {
  if (obj.website) {
    const url = newUrl(obj.website.toLowerCase());
    return hashCode(url.hostname + url.pathname + url.search);
  }

  return hashCode(obj.name.toUpperCase());
}

export function enrichId(apps: App[]) {
  apps.forEach((a) => {
    a.id = calcId(a);
  });
}
