import { App } from "@shared/data/App";
import { getJson } from "@shared/utils/jsonRequest";

export async function getKnownApps() {
  return (await getJson("https://osm-apps.org/api/apps/all.json")) as App[];
}
