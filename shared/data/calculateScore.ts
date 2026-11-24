import { sum } from "lodash";
import { App } from "./App";
import { display, edit, web } from "../lib/filters";
import { equalsYes, notNo, upperCase } from "../utils/string";
import i18next from "i18next";

const multilingual = [
  "MUL",
  i18next.t("multilingual", { lng: "en" }).toUpperCase(),
  i18next.t("multilingual").toUpperCase(),
];

export const Criterias: {
  category:
    | "osmParticipation"
    | "developmentParticipation"
    | "availabilityAccessibility"
    | "communityChannelsDocumentation";
  translationKey: string;
  check: (app: App) => boolean;
  points: number;
}[] = [
  // OSM Participation
  {
    category: "osmParticipation",
    translationKey: "supportsContributions",
    check: (app) => edit(app),
    points: 2,
  },
  {
    category: "osmParticipation",
    translationKey: "addingAndEditingPossible",
    check: (app) =>
      equalsYes(app.editing?.addPOI, app.editing?.addWay) &&
      equalsYes(
        app.editing?.editPOI,
        app.editing?.editGeom,
        app.editing?.editRelations,
        app.editing?.editTags,
      ),
    points: 1,
  },
  {
    category: "osmParticipation",
    translationKey: "displaysMaps",
    check: (app) => display(app) || equalsYes(app.map?.map),
    points: 1,
  },

  // Development Participation
  {
    category: "developmentParticipation",
    translationKey: "openSource",
    check: (app) => !!app.libre,
    points: 1.0,
  },
  {
    category: "developmentParticipation",
    translationKey: "copyleftLicense",
    check: (app) =>
      !!app.license?.find((l) => l?.match("(?:.*GPL.*|ODbL.*|MPL.*|CC.*)")),
    points: 0.5,
  },
  {
    category: "developmentParticipation",
    translationKey: "sourceCodeReference",
    check: (app) => !!app.sourceCode,
    points: 0.25,
  },
  {
    category: "developmentParticipation",
    translationKey: "issueTracker",
    check: (app) => !!app.community.issueTracker,
    points: 0.25,
  },
  {
    category: "developmentParticipation",
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
    category: "developmentParticipation",
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
    category: "developmentParticipation",
    translationKey: "translationContributions",
    check: (app) => !!app.languagesUrl,
    points: 0.5,
  },
  
  // Availability/Accessibility
  {
    category: "availabilityAccessibility",
    translationKey: "multipleLanguages",
    check: (app) =>
      app.languages.length >= 3 ||
      app.languages.some((l) => multilingual.includes(l?.toUpperCase())),
    points: 0.125,
  },
  {
    category: "availabilityAccessibility",
    translationKey: "tenLanguages",
    check: (app) => app.languages.length >= 10,
    points: 0.125,
  },

  {
    category: "availabilityAccessibility",
    translationKey: "freeOfCharge",
    check: (app) => !!app.gratis,
    points: 0.25,
  },
  {
    category: "availabilityAccessibility",
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
    category: "availabilityAccessibility",
    translationKey: "openSourceStores",
    check: (app) => {
      const i = app.install;
      return !!(i.fDroidID || i.obtainiumLink || web(app));
    },
    points: 0.25,
  },
  {
    category: "availabilityAccessibility",
    translationKey: "worldwideData",
    check: (app) => app.coverage.includes("Worldwide"),
    points: 0.5,
  },
  {
    category: "availabilityAccessibility",
    translationKey: "accessibilitySupported",
    check: (app) =>
      Object.values(app.accessibility || {}).filter((e) => notNo(e)).length >
        0 ||
      upperCase(app.routing?.profiles).includes("WHEELCHAIR") ||
      false,
    points: 0.5,
  },

  // Community channels & Documentation
  {
    category: "communityChannelsDocumentation",
    translationKey: "communityChannelExists",
    check: (app) =>
      Object.entries(app.community).filter(
        (e) => e[1] && e[0] !== "issueTracker",
      ).length > 0,
    points: 0.5,
  },
  {
    category: "communityChannelsDocumentation",
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
    category: "communityChannelsDocumentation",
    translationKey: "documentationLink",
    check: (app) => !!app.documentation,
    points: 0.125,
  },
  {
    category: "communityChannelsDocumentation",
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
  // Open Community Score (A - E)
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
