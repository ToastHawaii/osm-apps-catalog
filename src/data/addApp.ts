import { removeDuplicates } from "../utilities/array";
import { equalsIgnoreCase, equalsYes, notNo } from "../utilities/string";
import { App, hashCode } from "./template/utilities";
import { extendFilter } from "../extendFilter";
import { display, edit, web } from "../utilities/filter";

const Criterias: {
  translationKey: string;
  check: (app: App) => boolean;
  points: number;
}[] = [
  // OSM Participation
  {
    translationKey: "supportsContributions",
    check: (app) => edit(app),
    points: 2,
  },
  {
    translationKey: "addingAndEditingPossible",
    check: (app) =>
      equalsYes(
        ...[...(app.editing?.addPOI || []), ...(app.editing?.addWay || [])]
      ) &&
      equalsYes(
        ...[
          ...(app.editing?.editPOI || []),
          ...(app.editing?.editGeom || []),
          ...(app.editing?.editRelations || []),
          ...(app.editing?.editTags || []),
        ]
      ),
    points: 1,
  },
  {
    translationKey: "displaysMaps",
    check: (app) => !!(display(app) || equalsYes(...(app.map?.map || []))),
    points: 1,
  },

  // Development Participation
  {
    translationKey: "openSource",
    check: (app) => !!app.libre,
    points: 1.0,
  },
  {
    translationKey: "copyleftLicense",
    check: (app) =>
      !!(app.license || "").match("(?:.*GPL.*|ODbL.*|MPL.*|CC.*)"),
    points: 0.5,
  },
  {
    translationKey: "sourceCodeReference",
    check: (app) => !!app.sourceCode,
    points: 0.25,
  },
  {
    translationKey: "issueTracker",
    check: (app) => !!app.community.issueTracker,
    points: 0.25,
  },
  {
    translationKey: "lastUpdateThreeMonths",
    check: (app) => {
      if (!app.lastRelease) {
        return false;
      }
      const lastRelease = new Date(app.lastRelease);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return lastRelease > threeMonthsAgo;
    },
    points: 0.25,
  },
  {
    translationKey: "lastUpdateYear",
    check: (app) => {
      if (!app.lastRelease) {
        return false;
      }
      const lastRelease = new Date(app.lastRelease);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return lastRelease > oneYearAgo;
    },
    points: 0.25,
  },
  {
    translationKey: "translationContributions",
    check: (app) => !!app.languagesUrl,
    points: 0.5,
  },
  // Availability/Accessibility
  {
    translationKey: "multipleLanguages",
    check: (app) =>
      app.languages.length >= 3 ||
      app.languages.some((l) => l?.toUpperCase() === "MUL"),
    points: 0.125,
  },
  {
    translationKey: "tenLanguages",
    check: (app) => app.languages.length >= 10,
    points: 0.125,
  },

  {
    translationKey: "freeOfCharge",
    check: (app) => !!app.gratis,
    points: 0.25,
  },
  {
    translationKey: "multiplePlatforms",
    check: (app) => {
      const i = app.install;
      return (
        [
          i.appleStoreID || i.macAppStoreID,
          i.asin,
          i.fDroidID ||
            i.googlePlayID ||
            i.huaweiAppGalleryID ||
            i.obtainiumLink,
          i.microsoftAppID,
        ].filter((i) => i).length > 1 ||
        app.platform.length > 1 ||
        web(app)
      );
    },
    points: 0.25,
  },
  {
    translationKey: "openSourceStores",
    check: (app) => {
      const i = app.install;
      return !!(i.fDroidID || i.obtainiumLink || web(app));
    },
    points: 0.25,
  },
  {
    translationKey: "worldwideData",
    check: (app) => app.coverage.includes("Worldwide"),
    points: 0.5,
  },
  {
    translationKey: "accessibilitySupported",
    check: (app) =>
      Object.values(app.accessibility || {}).filter((e) => notNo(e)).length >
        0 ||
      app.routing?.profiles
        .map((p) => p.toUpperCase())
        .includes("WHEELCHAIR") ||
      false,
    points: 0.5,
  },

  // Community channels & Documentation
  {
    translationKey: "communityChannelExists",
    check: (app) =>
      Object.entries(app.community).filter(
        (e) => e[1] && e[0] !== "issueTracker"
      ).length > 0,
    points: 0.5,
  },
  {
    translationKey: "openSourceChannel",
    check: (app) =>
      !!(
        app.community.irc?.channel ||
        app.community.matrix ||
        app.community.mastodon ||
        app.community.bluesky
      ),
    points: 0.25,
  },
  {
    translationKey: "documentationLink",
    check: (app) => !!app.documentation,
    points: 0.125,
  },
  {
    translationKey: "documentedMultiplePlatforms",
    check: (app) =>
      [
        app.source.some((s) => s.name === "taginfo"),
        app.source.some((s) => s.name === "Wikidata"),
        app.source.some(
          (s) =>
            s.name === "Layer" ||
            s.name === "ServiceItem" ||
            s.name === "Software"
        ),
      ].filter((s) => s).length >= 2,
    points: 0.125,
  },
];

/** Sum all values in a array. */
export function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

export function calculateScore(app: App) {
  // Community Contribution Score (A - E)
  // A >= 8
  // B >= 6
  // C >= 4
  // D >= 2
  // E < 2

  let results = Criterias.map((c) => ({
    translationKey: c.translationKey,
    points: c.points,
    fulfilled: c.check(app),
  }));

  return {
    total: sum(results.filter((r) => r.fulfilled).map((r) => r.points)),
    details: results,
  };
}

export function addApp(apps: App[], obj: App) {
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
      obj.id = hashCode(obj.website || obj.name);
      obj.score = calculateScore(obj);
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

    app.score = calculateScore(app);
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
        (o1 as any)[k] = o2[k];
        return;
      }

      o1[k].push(...o2[k]);
      (o1 as any)[k] = removeDuplicates(o1[k]);
    });
    return o1;
  }
  throw new Error("Not expected...");
}
