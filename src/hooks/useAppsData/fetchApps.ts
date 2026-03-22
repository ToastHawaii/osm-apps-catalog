import { set, get } from "@lib/utils/storage";
import { App } from "@shared/data/App";
import { isDevelopment } from "@shared/utils/isDevelopment";
import { getJson } from "@shared/utils/jsonRequest";

export async function fetchApps(): Promise<App[]> {
  try {
    let data;
    if (!isDevelopment) {
      data = await getJson("/api/apps/all.json", {});
    } else {
      data = await getJson("https://osm-apps.org/api/apps/all.json", {});
    }

    try {
      set("appsData", data);
    } catch (error) {
      console.error("Data could not be cached.", error);
    }

    return data;
  } catch (error) {
    console.error("Data could not be loaded, try to use local cache.", error);
    return get("appsData") || [];
  }
}
