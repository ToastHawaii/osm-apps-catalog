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

import { isDevelopment } from "./isDevelopment";
import { utilQsString } from "../../shared/utilities/url";

export async function getJson(
  url: string,
  params: any = {},
  headers: any = {},
  isRetry = false
): Promise<any> {
  if (isDevelopment) {
    const response = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(`${url}?${utilQsString(params)}`) +
        "%26asdf"
    );

    return await response.json();
  }

  console.info(`Load: ${url}?${utilQsString(params)}`);

  try {
    const response = await fetch(`${url}?${utilQsString(params)}`, {
      headers: {
        ...headers,
        ...{
          "User-Agent":
            "OsmAppsCatalogBot/1.0 (osm-apps.org;markus@zottelig.ch)",
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      },
    });

    return await response.json();
  } catch (e) {
    console.error(
      `Error on loading ${url}?${utilQsString(params)}: ${JSON.stringify(e)}`
    );

    if (!isRetry) {
      // retry one time after a delay of 3 seconds
      await delay(3000);
      return getJson(url, params, headers, true);
    }

    throw e;
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
