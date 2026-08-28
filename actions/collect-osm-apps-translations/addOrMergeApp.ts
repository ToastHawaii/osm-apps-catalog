import { App } from "@shared/data/App";
import { findEqualApp } from "@actions/lib/findEqualApp";
import { mergeApps } from "@actions/lib/mergeApps";

export function addOrMergeApp(
  apps: App[],
  knownApps: App[],
  app: App,
  options: {
    includeRepositoryForUniqueCheck: boolean;
    checkWebsiteWithRepo: boolean;
    includeSourceForUniqueCheck: boolean;
    onlyAddLanguageIfEmpty: boolean;
  },
) {
  const duplicate = findEqualApp(apps, app, options);

  if (!duplicate) {
    const existingApp = findEqualApp(knownApps, app, options);

    // only add if en app is already known
    if (existingApp) {
      app.id = existingApp.id;
      apps.push(app);
    } else {
      console.log(
        `Could not find existing app for ${app.name} (${app.source[0].url})`,
      );
    }
  } else {
    mergeApps(duplicate, app, options);
  }
}
