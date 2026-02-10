import * as core from "@actions/core";

import "../../src/app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { shuffle } from "@shared/utilities/array";
import { uploadToRepo } from "@actions/collect-osm-apps/uploadToRepo";
import { enrichFocus } from "@actions/collect-osm-apps/enrichFocus";
import { enrichFirstCrawled } from "@actions/collect-osm-apps/enrichFirstCrawled";
import { generateSitemap } from "@actions/collect-osm-apps/generateSitemap";
import { getKnownApps } from "@actions/lib/utilities/getKnownApps";
import { enrichSpotlight } from "@actions/collect-osm-apps/enrichSpotlight";

export const lastUpdate = new Date("2025-05-03");

// todo: statistik erstellen, neuer ablauf,
// apps loaden
// jmergen
// ignorierte Apps mit wiedersprüchen ausgeben & ignorieren

/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let apps = await loadApps(core.getInput("ghToken"));

    // Shuffle before sorting to get a random order for apps with the same score
    shuffle(apps);
    apps = apps.sort((a, b) => b.score - a.score);

    // remove details from score to reduce file size, can be re-calculated on client side
    apps.forEach((app: any) => {
      delete app.score.details;
    });

    const knownApps = await getKnownApps();

    await enrichFirstCrawled(apps, knownApps);
    await enrichFocus(apps, knownApps);
    await enrichSpotlight(apps, knownApps);

    await uploadToRepo(
      [
        { filePath: "docs/api/apps/all.json", content: JSON.stringify(apps) },
        { filePath: "docs/sitemap.xml", content: await generateSitemap(apps) },
      ],
      "chore: auto update apps data and sitemap",
      core.getInput("ghToken"),
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
