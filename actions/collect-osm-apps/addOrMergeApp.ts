import { App } from "@shared/data/App";
import { findEqualApp } from "@actions/lib/findEqualApp";
import { mergeApps } from "@actions/lib/mergeApps";

export function addOrMergeApp(
  apps: App[],
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
    // only add if external sources exists
    if (
      app.name !== "" &&
      (app.website ||
        app.documentation ||
        app.install.appleStoreID ||
        app.install.asin ||
        app.install.fDroidID ||
        app.install.googlePlayID ||
        app.install.obtainiumLink ||
        app.install.huaweiAppGalleryID ||
        app.install.macAppStoreID ||
        app.install.microsoftAppID ||
        app.sourceCode)
    ) {
      apps.push(app);
    }
  } else {
    mergeApps(duplicate, app, options);
  }
}
