import { isDevelopment } from "./isDevelopment";
import { utilQsString } from "@shared/utilities/url";

export async function getJson(
  url: string,
  params: any = {},
  headers: any = {},
  isRetry = false,
): Promise<any> {
  if (isDevelopment) {
    const response = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(`${url}?${utilQsString(params)}`) +
        "%26asdf",
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
      `Error on loading ${url}?${utilQsString(params)}: ${JSON.stringify(e)}`,
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
