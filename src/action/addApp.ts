import { uniq } from "lodash";
import { equalsIgnoreCase, equalsWebsite } from "../utilities/string";
import { hashCode } from "./utilities";
import { App } from "../data/App";
import { calculateScore } from "../data/calculateScore";

export function addApp(apps: App[], obj: App) {
  const duplicates = apps.filter(
    (app) =>
      equalsIgnoreCase(app.name, obj.name) ||
      (app.website && obj.website && equalsWebsite(app.website, obj.website)) ||
      (app.install.appleStoreID &&
        app.install.appleStoreID &&
        app.install.appleStoreID === obj.install.appleStoreID) ||
      (app.install.asin &&
        app.install.asin &&
        app.install.asin === obj.install.asin) ||
      (app.install.fDroidID &&
        app.install.fDroidID &&
        app.install.fDroidID === obj.install.fDroidID) ||
      (app.install.googlePlayID &&
        app.install.googlePlayID &&
        app.install.googlePlayID === obj.install.googlePlayID) ||
      (app.install.obtainiumLink &&
        app.install.obtainiumLink &&
        app.install.obtainiumLink === obj.install.obtainiumLink) ||
      (app.install.huaweiAppGalleryID &&
        app.install.huaweiAppGalleryID &&
        app.install.huaweiAppGalleryID === obj.install.huaweiAppGalleryID) ||
      (app.install.macAppStoreID &&
        app.install.macAppStoreID &&
        app.install.macAppStoreID === obj.install.macAppStoreID) ||
      (app.install.microsoftAppID &&
        app.install.microsoftAppID &&
        app.install.microsoftAppID === obj.install.microsoftAppID)
  );

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

    if (app.lastRelease && obj.lastRelease && app.lastRelease < obj.lastRelease)
      app.lastRelease = obj.lastRelease;
    else app.lastRelease = app.lastRelease || obj.lastRelease;

    app.unmaintained = app.unmaintained || obj.unmaintained;

    app.description = app.description || obj.description;
    app.images.push(...obj.images);
    app.images = uniq(app.images);
    app.logos.push(...obj.logos);
    app.logos = uniq(app.logos);
    app.imageWiki = app.imageWiki || obj.imageWiki;
    app.commons = app.commons || [];
    app.commons.push(...(obj.commons || []));
    app.commons = uniq(app.commons);
    app.videos = app.videos || [];
    app.videos.push(...(obj.videos || []));
    app.videos = uniq(app.videos);

    app.website = app.website || obj.website;

    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    app.coverage.push(...obj.coverage);
    app.coverage = uniq(app.coverage);

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
    app.languages = uniq(app.languages).sort();
    app.languagesUrl = app.languagesUrl || obj.languagesUrl;

    app.genre.push(...obj.genre);
    app.genre = uniq(app.genre);
    app.topics.push(...obj.topics);
    app.topics = uniq(app.topics).sort();

    app.platform.push(...obj.platform);
    app.platform = uniq(app.platform).sort();

    app.coverage.push(...obj.coverage);
    app.coverage = uniq(app.coverage).sort();

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

    app.hasGoal = {
      crowdsourcingStreetLevelImagery:
        app.hasGoal?.crowdsourcingStreetLevelImagery ||
        obj.hasGoal?.crowdsourcingStreetLevelImagery,
    };

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

    app.score = calculateScore(app).total;
  }
}

function calcId(obj: App): number {
  if (obj.website) {
    const url = new URL(obj.website.toLowerCase());
    return hashCode(url.hostname + url.pathname + url.search);
  }

  return hashCode(obj.name.toUpperCase());
}

// Todo: replace mit lodash?
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
        (o1 as any)[k] = o2[k];
        return;
      }

      o1[k].push(...o2[k]);
      (o1 as any)[k] = uniq(o1[k]);
    });
    return o1;
  }
  throw new Error("Not expected...");
}
