import * as core from "@actions/core";

import "../../src/app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { uploadToRepo } from "@actions/collect-osm-apps/uploadToRepo";
//import { getKnownApps } from "@actions/lib/utilities/getKnownApps";
import { chain } from "lodash";
import { calcId } from "@actions/lib/utilities/calcId";

/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apps = chain((await loadApps(/* core.getInput("ghToken") */))[0])
      .map((app) => ({
        id: calcId(app),
        name: app.name,
        description: app.description,
        community: app.community,
        source: app.source,
      }))
      .groupBy((app) => app.source[0].language)
      .map((apps, lang) => ({
        filePath: `docs/api/apps/all.${lang}.json`,
        content: JSON.stringify(apps),
      }))
      .value();

    await uploadToRepo(
      apps,
      "chore: auto update apps translations",
      core.getInput("ghToken"),
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
