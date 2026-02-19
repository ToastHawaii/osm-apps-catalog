import { trimEnd, trimStart, upperFirst } from "lodash";
import { newUrl } from "./url";
import { plainText } from "@shared/utils/plainText";

export function equalsIgnoreCase(a: string | undefined, b: string | undefined) {
  return typeof a === "string" && typeof b === "string"
    ? a.toUpperCase() === b.toUpperCase()
    : a === b;
}

export function equalsString(a: string | undefined, b: string | undefined) {
  return a && b && a === b;
}

export function equalsName(a: string, b: string) {
  return (
    a.toUpperCase().replaceAll("-", " ").replaceAll("_", " ") ===
    b.toUpperCase().replaceAll("-", " ").replaceAll("_", " ")
  );
}

export function equalsWebsite(a: string | undefined, b: string | undefined) {
  if (!a || !b) {
    return false;
  }

  const aUrl = newUrl(a.toLowerCase());
  const bUrl = newUrl(b.toLowerCase());
  return (
    trimStart(aUrl.hostname, "www.") +
      trimEnd(aUrl.pathname, "/") +
      aUrl.search ===
    trimStart(bUrl.hostname, "www.") + trimEnd(bUrl.pathname, "/") + bUrl.search
  );
}

export function equalsYes(...values: (string | undefined)[]) {
  for (const value of values) if (value?.toUpperCase() === "YES") return true;

  return false;
}

export function notNo(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value.some(
      (v) => v && !equalsIgnoreCase(v, "no") && !equalsIgnoreCase(v, "none"),
    );
  }
  return !equalsIgnoreCase(value, "no") && !equalsIgnoreCase(value, "none");
}

export function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number,
) {
  return s?.toUpperCase().startsWith(searchString.toUpperCase(), position);
}

export function findClosingBracketIndex(str: string, pos: number) {
  if (str[pos] !== "{") {
    throw new Error("The position must contain an opening bracket");
  }
  let level = 1;
  for (let index = pos + 1; index < str.length; index++) {
    if (str[index] === "{") {
      level++;
    } else if (str[index] === "}") {
      level--;
    }

    if (level === 0) {
      return index;
    }
  }
  return -1;
}

export function appendFullStop(value: string): string {
  if (value && value[value.length - 1] !== ".") return `${value}.`;
  return value;
}

export function trim(value: string | undefined): string {
  return (value || "").replace(/^[.\s]+|[.\s]+$/gm, "");
}

export function toDate(value: string) {
  value = trim(value);
  if (/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/gi.test(value)) return value;
  else return "";
}

export function textToColor(s: string) {
  let r = 0;
  let g = 0;
  let b = 0;

  // fixed colors
  switch (s.toUpperCase()) {
    case "FREE":
    case "YES":
      return { r: 153, g: 255, b: 153 };
    case "NO":
    case "NONE":
      return { r: 255, g: 153, b: 153 };
  }

  for (let i = 0; i < s.length; i++) {
    if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;
    else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;
    else b = (b + s.charCodeAt(i)) % 256;
  }
  return { r, g, b };
}

export const splitBySemicolonButNotInsideBraceRegex = /[;]+(?![^(]*\))/;
export const splitByCommaButNotInsideBraceRegex = /[,;]+(?![^(]*\))/;

export function toValues(value = "") {
  return value
    .split(splitByCommaButNotInsideBraceRegex)
    .map(trim)
    .filter((v) => v)
    .map(upperFirst);
}

export function minText(s1: string, s2: string) {
  if (
    plainText(s1).length > 0 &&
    plainText(s1).length <= plainText(s2).length
  ) {
    return s1;
  }

  return s2;
}

export function maxText(s1: string, s2: string) {
  if (plainText(s1).length >= plainText(s2).length) {
    return s1;
  }

  return s2;
}

/** get text near but not greater to a given length */
export function shorterThenLength(s1: string, s2: string, length: number) {
  const s1Plain = plainText(s1);
  if (s1Plain.length <= length) {
    return s1;
  }

  const s2Plain = plainText(s2);
  if (s2Plain.length <= length) {
    return s2;
  }

  return minText(s1, s2);
}
