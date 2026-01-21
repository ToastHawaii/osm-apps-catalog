import { App } from "@shared/data/App";
import { calculateScore } from "@shared/data/calculateScore";
import { calcId } from "@actions/lib/utilities/calcId";
import { equals } from "@actions/lib/utilities/equalApp";
import { mergeApps } from "@actions/lib/utilities/mergeApps";

export function addOrMergeApp(
  apps: App[],
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
    // only add if external sources exists
    if (
      obj.name !== "" &&
      (obj.website ||
        obj.documentation ||
        obj.install.appleStoreID ||
        obj.install.asin ||
        obj.install.fDroidID ||
        obj.install.googlePlayID ||
        obj.install.obtainiumLink ||
        obj.install.huaweiAppGalleryID ||
        obj.install.macAppStoreID ||
        obj.install.microsoftAppID ||
        obj.sourceCode)
    ) {
      obj.id = calcId(obj);
      obj.score = calculateScore(obj).total;
      apps.push(obj);
    }
  } else {
    const app = duplicates[0];

    mergeApps(app, obj, options);

    app.score = calculateScore(app).total;
  }
}
