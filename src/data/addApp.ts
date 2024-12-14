import { removeDuplicates } from "../ui/utilities/array";
import { equalsIgnoreCase, notNo } from "../ui/utilities/string";
import { App } from "./template/utilities";
import { apps, extendFilter } from "../script";
import { display, edit } from "../ui/utilities/filter";

function calculateCommunityScore(app: App) {
  // Community-Score / Contribution Score?
  // A, B, C, D, E
  // A >= 8
  // B >= 6
  // C >= 4
  // D >= 2
  // E < 2

  // Wenn weder OpenSource noch Editieren möglich ist nicht über C kommen

  let score = 0;

  // # OSM Participation (max. 4 Points)

  if (edit(app)) {
    // Supports OSM contribution
    score += 2;
  }

  if (
    (app.editing?.addPOI || app.editing?.addWay) &&
    (app.editing?.editPOI ||
      app.editing?.editGeom ||
      app.editing?.editRelations ||
      app.editing?.editTags)
  ) {
    // Supports add and edit
    score += 1;
  }

  if (display(app) || app.map?.map) {
    // Supports displaying of map data
    score += 1;
  }

  // # Development Participation (max. 3 Points)
  if (app.libre) {
    // Open source
    score += 0.5;
  }
  // - Open Source (Copy Left 1.5, ohne Copy Left 1.0)

  //All: "(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|WTFPL|ISC.*|MIT.*|Unlicense|ODbL.*|MPL.*|CC.*|Ms-PL.*)"
  //Permessive: "(?:Apache.*|MIT.*|.*BSD.*|PD|ISC.*|Unlicense|Ms-PL.*)"
  if ((app.license || "").match("(?:.*GPL.*|ODbL.*|MPL.*|CC.*)")) {
    // Copy Left
    score += 0.5;
  }

  if (app.sourceCode) {
    score += 0.5;
  }

  if (app.community.issueTracker) {
    // Issue Tracker exists
    score += 0.5;
  }
  if (app.lastRelease) {
    const lastRelease = new Date(app.lastRelease);

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (lastRelease > threeMonthsAgo) {
      // The last update was 3 months ago.
      score += 0.25;
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    if (lastRelease > oneYearAgo) {
      // The last update was 1 year ago
      score += 0.25;
    }
  }

  if (app.languagesUrl) {
    // Translateable
    score += 0.5;
  }

  // # Documentation/Help/Availability/Accessbility (max. 3 Points)
  if (
    Object.entries(app.community).filter((e) => e[1] && e[0] !== "issueTracker")
      .length > 0
  ) {
    // A community communication channel exists
    score += 0.25;
  }
  if (
    app.community.irc?.channel ||
    app.community.matrix ||
    app.community.mastodon ||
    app.community.bluesky
  ) {
    // A community communication channel on a open source media exists
    score += 0.25;
  }

  if (app.languages.length >= 3) {
    // App is translated in 3 languages
    score += 0.25;
  }

  if (app.languages.length >= 10) {
    // App is translated in 10 languages
    score += 0.25;
  }
  if (app.gratis) {
    // App is gratis
    score += 0.25;
  }

  const i = app.install;
  if (
    [
      i.appleStoreID || i.macAppStoreID,
      i.asin,
      i.fDroidID || i.googlePlayID || i.huaweiAppGalleryID || i.obtainiumLink,
      i.microsoftAppID,
    ].filter((i) => i).length > 1 ||
    app.platform.length > 1 ||
    app.platform.filter((p) =>
      ["web", "web-based", "webapp", "web-app", "browser"].includes(
        p.toLowerCase()
      )
    ).length >= 1
  ) {
    // Available on multiple platforms
    score += 0.25;
  }
  if (
    i.fDroidID ||
    i.obtainiumLink ||
    app.platform.filter((p) =>
      ["web", "web-based", "webapp", "web-app", "browser"].includes(
        p.toLowerCase()
      )
    ).length >= 1
  ) {
    // Available over a free store
    score += 0.25;
  }
  if (app.documentation) {
    // Documentation link exists
    score += 0.125;
  }
  if (
    [
      app.source.filter((s) => s.name === "taginfo"),
      app.source.filter((s) => s.name === "Wikidata"),
      app.source.filter(
        (s) =>
          s.name === "Layer" ||
          s.name === "ServiceItem" ||
          s.name === "Software"
      ),
    ].length > 2
  ) {
    // Documented on multiple plattformes
    score += 0.125;
  }
  if (app.coverage.includes("Worldwide")) {
    // Worldwide coverage
    score += 0.5;
  }
  if (Object.values(app.accessibility || {}).filter((e) => notNo(e))) {
    // Some accessbility support
    score += 0.5;
  }
  
  return score;
}

export function addApp(obj: App) {
  const duplicates = apps.filter(
    (app) =>
      equalsIgnoreCase(app.name, obj.name) ||
      (app.website && obj.website && equalsIgnoreCase(app.website, obj.website))
  );

  if (duplicates.length === 0) {
    // only add if external sources exists
    if (
      obj.website ||
      obj.documentation ||
      obj.install.appleStoreID ||
      obj.install.asin ||
      obj.install.fDroidID ||
      obj.install.obtainiumLink ||
      obj.install.huaweiAppGalleryID ||
      obj.install.macAppStoreID ||
      obj.install.microsoftAppID ||
      obj.sourceCode
    ) {
      obj.score = calculateCommunityScore(obj);
      apps.push(obj);
      extendFilter(obj);
    }
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

    if (
      // only add if not same source
      !app.source.some(
        (s) =>
          s.lastChange === obj.source[0].lastChange &&
          s.name === obj.source[0].name
      )
    ) {
      // make the first source the newest
      if (
        app.source[0].lastChange.toUpperCase() >
        obj.source[0].lastChange.toUpperCase()
      ) {
        app.source = [...app.source, ...obj.source];
      } else {
        app.source = [...obj.source, ...app.source];
      }
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
    app.install.obtainiumLink =
      app.install.obtainiumLink || obj.install.obtainiumLink;
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

    app.community.forum = app.community.forum || obj.community.forum;
    app.community.forumTag = app.community.forumTag || obj.community.forumTag;
    app.community.irc = app.community.irc || obj.community.irc;
    app.community.matrix = app.community.matrix || obj.community.matrix;
    app.community.mastodon = app.community.mastodon || obj.community.mastodon;
    app.community.bluesky = app.community.bluesky || obj.community.bluesky;
    app.community.issueTracker =
      app.community.issueTracker || obj.community.issueTracker;
    app.community.githubDiscussions =
      app.community.githubDiscussions || obj.community.githubDiscussions;
    app.community.telegram = app.community.telegram || obj.community.telegram;
    app.community.slack = app.community.slack || obj.community.slack;
    app.community.reddit = app.community.reddit || obj.community.reddit;

    app.score = calculateCommunityScore(app);
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
        return;
      }

      o1[k].push(...o2[k]);
      o1[k] = removeDuplicates(o1[k]);
    });
    return o1;
  }
  throw new Error("Not expected...");
}
