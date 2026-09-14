import { getJson } from "@shared/utils/jsonRequest";

export async function getBlackList() {
  return (await getJson("https://osm-apps.org/api/blacklist.json")) as {
    name: string[];
    repository: string[];
    author: string[];
  }[];
}
