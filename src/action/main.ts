import * as core from "@actions/core";

import "../app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { shuffle } from "../shared/utilities/array";
import { App } from "../shared/data/App";
import { uploadToRepo } from "@/action/uploadToRepo";
import { enrichFocus } from "@/action/enrichFocus";
import { enrichFirstCrawled } from "@/action/enrichFirstCrawled";
import { generateSitemap } from "@/action/generateSitemap";

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

    const knownApps = await getKnownApps();

    await enrichFirstCrawled(apps, knownApps);
    await enrichFocus(apps, knownApps);

    // Shuffle before sorting to get a random order for apps with the same score
    shuffle(apps);
    apps = apps.sort((a, b) => b.score - a.score);

    // remove details from score to reduce file size, can be re-calculated on client side
    apps.forEach((app: any) => {
      delete app.score.details;
    });

    await uploadToRepo(
      "docs/api/apps/all.json",
      JSON.stringify(apps),
      "Update app catalog",
      core.getInput("ghToken"),
    );
    await uploadToRepo(
      "docs/sitemap.xml",
      await generateSitemap(apps),
      "Update sitemap",
      core.getInput("ghToken"),
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {core.setFailed(error.message);}
  }
}

async function getKnownApps() {
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
