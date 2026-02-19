import * as core from "@actions/core";

import "../../src/app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { shuffle } from "@shared/utilities/array";
import { uploadToRepo } from "../lib/utilities/uploadToRepo";
import { enrichFocus } from "./enrichFocus";
import { enrichFirstCrawled } from "./enrichFirstCrawled";
import { generateSitemap } from "./generateSitemap";
import { getKnownApps } from "@actions/lib/utilities/getKnownApps";
import { enrichSpotlight } from "./enrichSpotlight";
import { enrichId } from "./enrichId";
import { enrichScoreTotal } from "./enrichScoreTotal";


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

    enrichId(apps);
    enrichScoreTotal(apps);

    const knownApps = await getKnownApps();
    enrichFirstCrawled(apps, knownApps);
    enrichFocus(apps, knownApps);
    enrichSpotlight(apps, knownApps);

    // Shuffle before sorting to get a random order for apps with the same score
    shuffle(apps);
    apps = apps.sort((a, b) => b.score - a.score);

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
