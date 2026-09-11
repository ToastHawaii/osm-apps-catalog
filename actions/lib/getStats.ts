import * as core from "@actions/core";

export async function getStats() {
  const today = new Date();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const currentDate = formatDate(today);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const currentMinus7 = formatDate(sevenDaysAgo);

  try {
    return (
      (await (
        await fetch(
          `https://osm-apps.goatcounter.com/api/v0/stats/hits?start=${currentMinus7}&end=${currentDate}&group=day&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${core.getInput("goatcounterToken")}`,
            },
          },
        )
      ).json()) as { hits: { count: number; path: string }[] }
    ).hits
      .filter((hit) => /app\/\d+$/.test(hit.path))
      .map((hit) => ({
        app: parseInt(hit.path.match(/app\/(\d+)$/)?.[1] as string, 10),
        count: hit.count,
      }));
  } catch (e) {
    console.error(
      `Error on loading stats from osm-apps.goatcounter.com: ${JSON.stringify(e)}`,
    );
    throw e;
  }
}
