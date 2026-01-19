import { mergeAppSources } from "@shared/utilities/mergeAppSources";
import { App } from "@shared/data/App";
import { uniq, uniqBy } from "lodash";

export function mergeApps(
  app: App,
  obj: App,
  options: {
    onlyAddLanguageIfEmpty: boolean;
  },
) {
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

  app.source = mergeAppSources(app.source, obj.source);

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
}

// Todo: replace mit lodash?
export function merge<T extends Record<string, string[]>>(
  o1: T | undefined,
  o2: T | undefined,
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
