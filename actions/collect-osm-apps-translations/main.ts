import * as core from "@actions/core";

import "../../src/app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { uploadToRepo } from "@actions/collect-osm-apps/uploadToRepo";
import { chain } from "lodash";

/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apps = chain(await loadApps(/* core.getInput("ghToken") */))
      .map((apps, lang) => ({
        filePath: `docs/api/apps/all.${lang}.json`,
        content: JSON.stringify(
          chain(apps)
            .map((app) => ({
              id: app.id,
              name: app.name,
              description: app.description,
              descriptionShort: app.descriptionShort,
              documentation: app.documentation,
              community: app.community,
              source: app.source,
            }))
            // sort apps in translation files by id to have a constant order
            .orderBy((a) => a.id)
            .value(),
        ),
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
