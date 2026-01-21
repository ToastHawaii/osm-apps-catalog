import { App } from "@shared/data/App";
import { equals } from "@actions/lib/utilities/equalApp";
import { mergeApps } from "@actions/lib/utilities/mergeApps";

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
  const duplicates = apps.filter((app) => equals(app, obj, options));

  if (duplicates.length === 0) {
    const existingApp = knownApps.filter((app) => equals(app, obj, options));

    // only add if en app is already known
    if (existingApp.length > 0) {
      obj.id = existingApp[0].id;
      apps.push(obj);
    } else {
      console.log(
        `Could not find existing app for ${obj.name} (${obj.source[0].url})`,
      );
    }
  } else {
    const app = duplicates[0];

    mergeApps(app, obj, options);
  }
}
