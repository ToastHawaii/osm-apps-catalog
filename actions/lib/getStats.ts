import * as core from "@actions/core";
import { getJson } from "@shared/utils/jsonRequest";

export async function getStats() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = formatDate(yesterday);

  const sevenDaysAgo = new Date(yesterday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
  const currentMinus7 = formatDate(sevenDaysAgo);

  return (
    (
      (await getJson(
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
      )) as { hits: { count: number; path: string }[] }
    ).hits
      // get all stats to apps
      .filter((hit) => /app\/\d+$/.test(hit.path))
      .map((hit) => ({
        app: parseInt(hit.path.match(/app\/(\d+)$/)?.[1] as string, 10),
        count: hit.count,
      }))
  );
}
