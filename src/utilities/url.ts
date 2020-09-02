export const httpRegex = /^https?:\/\//i;

export function toUrl(url: string | undefined) {
  if (!url) return undefined;

  if (!httpRegex.test(url)) return `http://${url}`;

  return url;
}

export function toWikiUrl(wiki: string) {
  if (!wiki) return undefined;

  if (httpRegex.test(wiki)) return wiki;

  return `https://wiki.openstreetmap.org/wiki/${wiki}`;
}

export function utilQsString(obj: any, noencode?: boolean) {
  // encode everything except special characters used in certain hash parameters:
  // "/" in map states, ":", ",", {" and "}" in background
  function softEncode(s: string | number | boolean) {
    return encodeURIComponent(s).replace(
      /(%2F|%3A|%2C|%7B|%7D)/g,
      decodeURIComponent
    );
  }
  return Object.keys(obj)
    .sort()
    .map(
      key =>
        `${encodeURIComponent(key)}=${
          noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key])
        }`
    )
    .join("&");
}

export function findGetParameter(parameterName: string) {
  let result: string | undefined;
  let tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}