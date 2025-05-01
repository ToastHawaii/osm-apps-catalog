import { uniq, uniqBy } from "lodash";
import {
  equalsName,
  equalsString,
  equalsWebsite,
  notDiffrentString,
  notDiffrentWebsite,
} from "../shared/utilities/string";
import { App } from "../shared/data/App";
import { calculateScore } from "../shared/data/calculateScore";
import { newUrl } from "../shared/utilities/url";

// if both have a source code or an other unique value, they must be equal
function notDiffrent(app: App, obj: App) {
  return (
    notDiffrentString(app.install.appleStoreID, obj.install.appleStoreID) &&
    notDiffrentString(app.install.asin, obj.install.asin) &&
    notDiffrentString(app.install.fDroidID, obj.install.fDroidID) &&
    notDiffrentString(app.install.googlePlayID, obj.install.googlePlayID) &&
    notDiffrentWebsite(app.install.obtainiumLink, obj.install.obtainiumLink) &&
    notDiffrentString(
      app.install.huaweiAppGalleryID,
      obj.install.huaweiAppGalleryID
    ) &&
    notDiffrentString(app.install.macAppStoreID, obj.install.macAppStoreID) &&
    notDiffrentString(app.install.microsoftAppID, obj.install.microsoftAppID)
  );
}

/**
 * Returns a hash code from a string
 * @param str The string to hash.
 * @return A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function calcId(obj: App): number {
  if (obj.website) {
    const url = newUrl(obj.website.toLowerCase());
    return hashCode(url.hostname + url.pathname + url.search);
  }

  return hashCode(obj.name.toUpperCase());
}

export function addApp(
  apps: App[],
  obj: App,
  options: {
    includeRepositoryForUniqueCheck: boolean;
    checkWebsiteWithRepo: boolean;
    onlyAddLanguageIfEmpty: boolean;
  }
) {
  const duplicates = apps.filter(
    (app) =>
      // if name are equals but websites not we ignore this condition
      equalsName(app.name, obj.name) ||
      equalsWebsite(app.website, obj.website) ||
      (options.includeRepositoryForUniqueCheck &&
        equalsWebsite(app.sourceCode, obj.sourceCode)) ||
      (options.checkWebsiteWithRepo &&
        equalsWebsite(app.sourceCode, obj.website)) ||
      equalsString(app.install.appleStoreID, obj.install.appleStoreID) ||
      equalsString(app.install.asin, obj.install.asin) ||
      equalsString(app.install.fDroidID, obj.install.fDroidID) ||
      equalsString(app.install.googlePlayID, obj.install.googlePlayID) ||
      equalsWebsite(app.install.obtainiumLink, obj.install.obtainiumLink) ||
      equalsString(
        app.install.huaweiAppGalleryID,
        obj.install.huaweiAppGalleryID
      ) ||
      equalsString(app.install.macAppStoreID, obj.install.macAppStoreID) ||
      equalsString(app.install.microsoftAppID, obj.install.microsoftAppID)
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
    app.images = uniqBy(app.images, (v) => v.toUpperCase());
    app.logos.push(...obj.logos);
    app.logos = uniqBy(app.logos, (v) => v.toUpperCase());
    app.imageWiki = app.imageWiki || obj.imageWiki;
    app.commons = app.commons || [];
    app.commons.push(...(obj.commons || []));
    app.commons = uniqBy(app.commons, (v) => v.toUpperCase());
    app.videos = app.videos || [];
    app.videos.push(...(obj.videos || []));
    app.videos = uniqBy(app.videos, (v) => v.toUpperCase());

    app.website = app.website || obj.website;

    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    app.coverage.push(...obj.coverage);
    app.coverage = uniqBy(app.coverage, (v) => v.toUpperCase());

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
    app.price = app.price || obj.price;

    app.license = app.license || [];
    app.license.push(...(obj.license || []));
    app.license = uniqBy(app.license, (v) => v.toUpperCase());

    app.sourceCode = app.sourceCode || obj.sourceCode;

    if (!options.onlyAddLanguageIfEmpty || app.languages.length === 0) {
      app.languages.push(...obj.languages);
    }

    app.languages = uniqBy(app.languages, (v) => v.toUpperCase()).sort();
    app.languagesUrl = app.languagesUrl || obj.languagesUrl;

    app.genre.push(...obj.genre);
    app.genre = uniqBy(app.genre, (v) => v.toUpperCase());
    app.topics.push(...obj.topics);
    app.topics = uniqBy(app.topics, (v) => v.toUpperCase()).sort();

    app.platform.push(...obj.platform);
    app.platform = uniqBy(app.platform, (v) => v.toUpperCase()).sort();

    app.coverage.push(...obj.coverage);
    app.coverage = uniqBy(app.coverage, (v) => v.toUpperCase()).sort();

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
    app.community.lemmy = app.community.lemmy || obj.community.lemmy;
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
