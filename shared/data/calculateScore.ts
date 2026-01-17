import { sum } from "lodash";
import { App } from "./App";
import { display, edit, web } from "../utilities/filters";
import { equalsYes, notNo } from "../utilities/string";
import i18next from "i18next";

const multilingual = [
  "MUL",
  i18next.t("multilingual", { lng: "en" }).toUpperCase(),
  i18next.t("multilingual").toUpperCase(),
];

export const Criterias: {
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
        ...[...(app.editing?.addPOI || []), ...(app.editing?.addWay || [])],
      ) &&
      equalsYes(
        ...[
          ...(app.editing?.editPOI || []),
          ...(app.editing?.editGeom || []),
          ...(app.editing?.editRelations || []),
          ...(app.editing?.editTags || []),
        ],
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
      !!app.license?.find((l) => l?.match("(?:.*GPL.*|ODbL.*|MPL.*|CC.*)")),
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
      app.languages.some((l) => multilingual.includes(l?.toUpperCase())),
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
        (e) => e[1] && e[0] !== "issueTracker",
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
        app.community.lemmy ||
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
        app.source.some((s) => s.name === "GitHub"),
        app.source.some((s) => s.name === "Wikidata"),
        app.source.some(
          (s) =>
            s.name === "Layer" ||
            s.name === "ServiceItem" ||
            s.name === "Software",
        ),
      ].filter((s) => s).length >= 2,
    points: 0.125,
  },
];

export function calculateScore(app: App) {
  // Community Contribution Score (A - E)
  // A >= 8
  // B >= 6
  // C >= 4
  // D >= 2
  // E < 2
  const results = Criterias.map((c) => ({
    translationKey: c.translationKey,
    points: c.points,
    fulfilled: c.check(app),
  }));

  return {
    total: sum(results.filter((r) => r.fulfilled).map((r) => r.points)),
    details: results,
  };
}
