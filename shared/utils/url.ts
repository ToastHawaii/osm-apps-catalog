import {
  Github01Icon,
  GitlabIcon,
  MountainIcon,
} from "@hugeicons/core-free-icons";

export function newUrl(url: string) {
  try {
    return new URL(url);
  } catch (e) {
    console.info(`Error with new URL: ${url}`);
    throw e;
  }
}

export const httpRegex = /^https?:\/\//i;

export function toUrl(url: string | undefined) {
  if (!url) return undefined;

  if (!httpRegex.test(url)) return newUrl(`https://${url}`).toString();

  return newUrl(url).toString();
}

export function toWikiUrl(wiki: string) {
  if (!wiki) return undefined;

  if (httpRegex.test(wiki)) return wiki;

  return `https://wiki.openstreetmap.org/wiki/${wiki}`;
}

export function utilQsString(
  obj: Record<string, string | number | boolean>,
  noEncode?: boolean,
) {
  // encode everything except special characters used in certain hash parameters:
  // "/" in map states, ":", ",", {" and "}" in background
  function softEncode(s: string | number | boolean) {
    return encodeURIComponent(s).replace(
      /(%2F|%3A|%2C|%7B|%7D)/g,
      decodeURIComponent,
    );
  }
  return Object.keys(obj)
    .sort()
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${
          noEncode ? softEncode(obj[key]) : encodeURIComponent(obj[key])
        }`,
    )
    .join("&");
}

export function convertToHttps(value: string | undefined) {
  return value?.replace(/^http:/, "https:");
}

/**
 * returns a normalized host name from a string or URL, e.g. "www.Example.com" -> "example.com"
 */
export function extractHost(stringOrUrl: string | URL) {
  let url;

  if (typeof stringOrUrl === "string") {
    url = newUrl(stringOrUrl);
  } else {
    url = stringOrUrl;
  }

  const host = url.host;

  return normalizeHost(host);
}

export function normalizeHost(host: string) {
  return host.toLowerCase().replace(/^www\./, "");
}

export function hasHost(stringOrUrl: string | URL, allowedHosts: string[]) {
  try {
    const host = extractHost(stringOrUrl);

    return allowedHosts.some((allowedHost) => {
      allowedHost = normalizeHost(allowedHost);
      return host === allowedHost;
    });
  } catch {
    return false;
  }
}

// Copy from @hugeicons/core-free-icons
type IconSvgObject =
  | [string, Record<string, string | number>][]
  | readonly (readonly [string, Readonly<Record<string, string | number>>])[];

export function getHostIcon(
  stringOrUrl: string | URL | undefined,
  defaultIcon: IconSvgObject,
) {
  if (stringOrUrl) {
    switch (extractHost(stringOrUrl)) {
      case "codeberg.org":
        return MountainIcon;
      case "gitlab.com":
        return GitlabIcon;
      case "github.com":
        return Github01Icon;
    }
  }
  return defaultIcon;
}
