import * as core from "@actions/core";
import { delay } from "@shared/utils/delay";
import { getJson } from "@shared/utils/jsonRequest";

export async function getStats() {
  let { hits } = await requestStats();

  if (!hits) {
    await delay(5000);
    hits = (await requestStats()).hits;
  }

  return (
    hits
      // get all stats to apps
      .filter((hit) => /app\/\d+$/.test(hit.path))
      .map((hit) => ({
        app: parseInt(hit.path.match(/app\/(\d+)$/)?.[1] as string, 10),
        count: hit.count,
      }))
  );
}

async function requestStats() {
  const today = new Date();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = formatDate(today);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const currentMinus7 = formatDate(sevenDaysAgo);

  return (await getJson(
    "https://osm-apps.goatcounter.com/api/v0/stats/hits",
    {
      start: currentMinus7,
      end: currentDate,
      group: "day",
      limit: 50,
    },
    {
      Authorization: `Bearer ${core.getInput("goatcounterToken")}`,
    },
  )) as { hits: { count: number; path: string }[] };
}
