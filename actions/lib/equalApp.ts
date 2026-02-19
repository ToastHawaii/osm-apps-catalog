import { App } from "@shared/data/App";
import { equalsName, equalsWebsite, equalsString } from "@shared/utils/string";

export function equals(
  app1: App,
  app2: App,
  options: {
    includeRepositoryForUniqueCheck: boolean;
    checkWebsiteWithRepo: boolean;
    includeSourceForUniqueCheck: boolean;
  },
) {
  return (
    equalsName(app1.name, app2.name) ||
    equalsWebsite(app1.website, app2.website) ||
    (options.includeRepositoryForUniqueCheck &&
      equalsWebsite(app1.sourceCode, app2.sourceCode)) ||
    (options.checkWebsiteWithRepo &&
      equalsWebsite(app1.sourceCode, app2.website)) ||
    equalsString(app1.install.appleStoreID, app2.install.appleStoreID) ||
    equalsString(app1.install.asin, app2.install.asin) ||
    equalsString(app1.install.fDroidID, app2.install.fDroidID) ||
    equalsString(app1.install.googlePlayID, app2.install.googlePlayID) ||
    equalsWebsite(app1.install.obtainiumLink, app2.install.obtainiumLink) ||
    equalsString(
      app1.install.huaweiAppGalleryID,
      app2.install.huaweiAppGalleryID,
    ) ||
    equalsString(app1.install.macAppStoreID, app2.install.macAppStoreID) ||
    equalsString(app1.install.microsoftAppID, app2.install.microsoftAppID) ||
    (options.includeSourceForUniqueCheck &&
      app1.source.find((s1) =>
        app2.source.find((s2) => s1.name === s2.name && s1.id === s2.id),
      ))
  );
}
