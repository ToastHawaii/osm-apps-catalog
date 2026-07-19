import { Funding } from "@actions/lib/getValidatedFundings";
import { set, get } from "@lib/utils/storage";
import { isDevelopment } from "@shared/utils/isDevelopment";
import { getJson } from "@shared/utils/jsonRequest";

export async function fetchFundings(): Promise<Funding[]> {
  try {
    let data;
    if (!isDevelopment) {
      data = await getJson("/api/fundings.json", {});
    } else {
      data = await getJson("https://osm-apps.org/api/fundings.json", {});
    }

    try {
      set("appsFundingsData", data);
    } catch (error) {
      console.error("Data could not be cached.", error);
    }

    return data;
  } catch (error) {
    console.error("Data could not be loaded, try to use local cache.", error);
    return get("appsFundingsData") || [];
  }
}
