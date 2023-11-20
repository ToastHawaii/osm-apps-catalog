import { removeDuplicates } from "../ui/utilities/array";
import { equalsIgnoreCase } from "../ui/utilities/string";
import { App } from "./template/utilities";
import { apps, extendFilter } from "../script";

export function addApp(obj: App) {
  const duplicates = apps.filter(
    (app) =>
      equalsIgnoreCase(app.name, obj.name) ||
      (app.website && obj.website && equalsIgnoreCase(app.website, obj.website))
  );

  if (duplicates.length === 0) {
    apps.push(obj);
    extendFilter(obj);
  } else {
    const app = duplicates[0];

    if (app.lastRelease && obj.lastRelease && app.lastRelease < obj.lastRelease)
      app.lastRelease = obj.lastRelease;
    else app.lastRelease = app.lastRelease || obj.lastRelease;

    app.description = app.description || obj.description;
    app.images.push(...obj.images);
    app.images = removeDuplicates(app.images);
    app.languages.push(...obj.languages);
    app.languages = removeDuplicates(app.languages);

    app.topics.push(...obj.topics);
    app.topics = removeDuplicates(app.topics);

    app.platform.push(...obj.platform);
    app.platform = removeDuplicates(app.platform);

    app.website = app.website || obj.website;

    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    // make the first source the newest
    if (
      app.source[0].lastChange.toUpperCase() >
      obj.source[0].lastChange.toUpperCase()
    ) {
      app.source = [...app.source, ...obj.source];
    } else {
      app.source = [...obj.source, ...app.source];
    }

    app.author = app.author || obj.author;
    app.sourceCode = app.sourceCode || obj.sourceCode;

    app.install.asin = app.install.asin || obj.install.asin;
    app.install.fDroidID = app.install.fDroidID || obj.install.fDroidID;
    app.install.googlePlayID =
      app.install.googlePlayID || obj.install.googlePlayID;
    app.install.huaweiAppGalleryID =
      app.install.huaweiAppGalleryID || obj.install.huaweiAppGalleryID;
    app.install.appleStoreID =
      app.install.appleStoreID || obj.install.appleStoreID;
    app.install.macAppStoreID =
      app.install.macAppStoreID || obj.install.macAppStoreID;
    app.install.microsoftAppID =
      app.install.microsoftAppID || obj.install.microsoftAppID;

    extendFilter(app);
  }
}
