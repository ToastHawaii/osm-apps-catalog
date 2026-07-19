import { delay } from "@shared/utils/delay";
import { isDevelopment } from "./isDevelopment";
import { utilQsString } from "@shared/utils/url";

export async function getJson(
  url: string,
  params: Record<string, string | number | boolean> = {},
  headers: Record<string, string> = {},
  isRetry = false,
) {
  const requestUrl = [url, utilQsString(params)].filter((s) => s).join("?");

  if (isDevelopment) {
    const response = await fetch(
      url.startsWith("https://osm-apps.org/")
        ? url.replace(
            "https://osm-apps.org/",
            "https://raw.githubusercontent.com/ToastHawaii/osm-apps-catalog/refs/heads/main/docs/",
          )
        : "https://corsproxy.io/?" +
            encodeURIComponent(requestUrl) +
            // change to avoid caching during testing
            "%262026-04-15",
    );

    return await response.json();
  }

  console.info(`Load: ${requestUrl}`);

  try {
    const response = await fetch(requestUrl, {
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
    console.error(`Error on loading ${requestUrl}: ${JSON.stringify(e)}`);

    if (!isRetry) {
      // retry one time after a delay of 3 seconds
      await delay(3000);
      return getJson(url, params, headers, true);
    }

    throw e;
  }
}
