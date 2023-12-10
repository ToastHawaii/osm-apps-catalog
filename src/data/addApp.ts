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

    app.unmaintained = app.unmaintained || obj.unmaintained;

    app.description = app.description || obj.description;
    app.images.push(...obj.images);
    app.images = removeDuplicates(app.images);
    app.imageWiki = app.imageWiki || obj.imageWiki;

    app.website = app.website || obj.website;

    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    app.coverage.push(...obj.coverage);
    app.coverage = removeDuplicates(app.coverage);

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

    app.gratis = app.gratis || obj.gratis;
    app.libre = app.libre || obj.libre;

    app.license = app.license || obj.license;

    app.sourceCode = app.sourceCode || obj.sourceCode;

    app.languages.push(...obj.languages);
    app.languages = removeDuplicates(app.languages);
    app.languagesUrl = app.languagesUrl || obj.languagesUrl;

    app.genre.push(...obj.genre);
    app.genre = removeDuplicates(app.genre);
    app.topics.push(...obj.topics);
    app.topics = removeDuplicates(app.topics);

    app.platform.push(...obj.platform);
    app.platform = removeDuplicates(app.platform);

    app.coverage.push(...obj.coverage);
    app.coverage = removeDuplicates(app.coverage);

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

    app.map = merge(app.map, obj.map);
    app.routing = merge(app.routing, obj.routing);
    app.navigating = merge(app.navigating, obj.navigating);
    app.tracking = merge(app.tracking, obj.tracking);
    app.monitoring = merge(app.monitoring, obj.monitoring);
    app.editing = merge(app.editing, obj.editing);
    app.rendering = merge(app.rendering, obj.rendering);
    app.accessibility = merge(app.accessibility, obj.accessibility);

    extendFilter(app);
  }
}

function merge<T extends { [name: string]: string[] }>(
  o1: T | undefined,
  o2: T | undefined
) {
  if (!o1 && !o2) {
    return undefined;
  }
  if (o1 && !o2) {
    return o1;
  }
  if (!o1 && o2) {
    return o2;
  }
  if (o1 && o2) {
    const keys = Object.keys(o1);
    keys.push(...Object.keys(o2));
    keys.forEach((k) => {
      if (o1[k] && !o2[k]) {
        return;
      }
      if (!o1[k] && o2[k]) {
        o1[k] = o2[k];
        return
      }

      o1[k].push(...o2[k]);
      o1[k] = removeDuplicates(o1[k]);
    });
    return o1;
  }
  throw new Error("Not expected...");
}
