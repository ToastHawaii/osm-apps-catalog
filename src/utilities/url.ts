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

export function newUrl(url: string) {
  try {
    return new URL(url);
  } catch (e) {
    console.error(`Error with new URL: ${url}`);
  }
}

export const httpRegex = /^https?:\/\//i;

export function toUrl(url: string | undefined) {
  if (!url) return undefined;

  if (!httpRegex.test(url)) return new URL(`http://${url}`).toString();

  return new URL(url).toString();
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
      (key) =>
        `${encodeURIComponent(key)}=${
          noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key])
        }`
    )
    .join("&");
}

export function findGetParameter(parameterName: string) {
  let result: string | undefined;
  let tmp = [];
  window.location.search
    .substring(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
