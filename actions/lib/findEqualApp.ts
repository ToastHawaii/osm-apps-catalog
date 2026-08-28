import { App } from "@shared/data/App";
import { equalsName, equalsWebsite, equalsString } from "@shared/utils/string";

export function findEqualApp(
  apps: App[],
  app: App,
  options: {
    includeRepositoryForUniqueCheck: boolean;
    checkWebsiteWithRepo: boolean;
    includeSourceForUniqueCheck: boolean;
  },
) {
  // Some values reflect equality more evidently than others.
  return (
    apps.find(
      (a) =>
        (options.includeRepositoryForUniqueCheck &&
          equalsWebsite(a.sourceCode, app.sourceCode)) ||
        (options.checkWebsiteWithRepo &&
          equalsWebsite(a.sourceCode, app.website)) ||
        equalsString(a.install.appleStoreID, app.install.appleStoreID) ||
        equalsString(a.install.asin, app.install.asin) ||
        equalsString(a.install.fDroidID, app.install.fDroidID) ||
        equalsString(a.install.googlePlayID, app.install.googlePlayID) ||
        equalsWebsite(a.install.obtainiumLink, app.install.obtainiumLink) ||
        equalsString(
          a.install.huaweiAppGalleryID,
          app.install.huaweiAppGalleryID,
        ) ||
        equalsString(a.install.macAppStoreID, app.install.macAppStoreID) ||
        equalsString(a.install.microsoftAppID, app.install.microsoftAppID) ||
        (options.includeSourceForUniqueCheck &&
          a.source.find((s1) =>
            app.source.find((s2) => s1.name === s2.name && s1.id === s2.id),
          )),
    ) ||
    apps.find((a) => equalsWebsite(a.website, app.website)) ||
    apps.find((a) => equalsName(a.name, app.name))
  );
}
