import { App } from "@shared/data/App";

export async function getKnownApps() {
  console.info(`Load: https://osm-apps.org/api/apps/all.json`);
  try {
    return (await (
      await fetch("https://osm-apps.org/api/apps/all.json", {})
    ).json()) as App[];
  } catch (e) {
    console.error(
      `Error on loading https://osm-apps.org/api/apps/all.json: ${JSON.stringify(
        e,
      )}`,
    );
    throw e;
  }
}
