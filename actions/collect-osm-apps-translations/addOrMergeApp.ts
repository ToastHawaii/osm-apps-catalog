import { App } from "@shared/data/App";
import { equals } from "@actions/lib/equalApp";
import { mergeApps } from "@actions/lib/mergeApps";

export function addOrMergeApp(
  apps: App[],
  knownApps: App[],
  obj: App,
  options: {
    includeRepositoryForUniqueCheck: boolean;
    checkWebsiteWithRepo: boolean;
    includeSourceForUniqueCheck: boolean;
    onlyAddLanguageIfEmpty: boolean;
  },
) {
  const duplicate = apps.find((app) => equals(app, obj, options));

  if (!duplicate) {
    const existingApp = knownApps.find((app) => equals(app, obj, options));

    // only add if en app is already known
    if (existingApp) {
      obj.id = existingApp.id;
      apps.push(obj);
    } else {
      console.log(
        `Could not find existing app for ${obj.name} (${obj.source[0].url})`,
      );
    }
  } else {
    mergeApps(duplicate, obj, options);
  }
}
