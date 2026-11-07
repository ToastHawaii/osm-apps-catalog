import { App } from "@shared/data/App";
import { findEqualApp } from "@actions/lib/findEqualApp";
import { mergeApps } from "@actions/lib/mergeApps";

function isDeprecated(app: App) {
  if (!app.unmaintained) {
    return false;
  }

  if (!app.lastRelease) {
    // without a date we do not know when the last change was
    return false;
  }

  const lastRelease = new Date(app.lastRelease);
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  return lastRelease < tenYearsAgo;
}

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
    if (
      app.name !== "" &&
      // only add if external sources exists
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
        app.sourceCode) &&
      !isDeprecated(app)
    ) {
      apps.push(app);
    }
  } else {
    mergeApps(duplicate, app, options);
  }
}
