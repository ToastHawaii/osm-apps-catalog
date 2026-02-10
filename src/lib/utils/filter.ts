import { chain } from "lodash";
import { App } from "@shared/data/App";
import { includes, some } from "@shared/utilities/array";
import { edit, mobile, navigation } from "@shared/utilities/filters";
import { equalsYes } from "@shared/utilities/string";
import { State } from "../../app/ui/State";

export function filter({
  apps,
  app,
  category,
  search,
  topics,
  platforms,
  languages,
  coverage,
  contribute,
}: { apps: App[] } & State) {
  if (app) {
    return [apps.filter((a) => a.id === app), () => [] as App[]] as const;
  }

  let filteredApps: App[] = apps.slice();

  if (category === "latest") {
    filteredApps = chain(filteredApps)
      .sortBy((a) => a.source[0].lastChange || "")
      .sortBy((a) => a.lastRelease || "")
      .reverse()
      .value();
  } else if (category === "focus") {
    filteredApps = chain(filteredApps)
      .sortBy((a) => a.lastFocus)
      .reverse()
      .take(10)
      .value();
  } else if (category === "mobile") {
    filteredApps = filteredApps.filter(mobile);
  } else if (category === "navigation") {
    filteredApps = filteredApps.filter(navigation);
  } else if (category === "edit") {
    filteredApps = filteredApps.filter(edit);
  }

  search = search.toUpperCase();
  if (search) {
    filteredApps = filteredApps.filter(
      (a) =>
        a.name.toUpperCase().includes(search) ||
        a.subtitle?.toUpperCase().includes(search) ||
        a.description.toUpperCase().includes(search) ||
        a.descriptionShort?.toUpperCase().includes(search) ||
        a.cache.topics.some((t) => t.includes(search)) ||
        a.cache.platform.some((t) => t.includes(search)) ||
        a.cache.coverage.some((t) => t.includes(search)),
    );
  }

  const topicsUp = topics.map((t) => t.toUpperCase());
  if (topicsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(a.cache.topics, topicsUp),
    );

  const platformsUp = platforms.map((t) => t.toUpperCase());
  if (platformsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(a.cache.platform, platformsUp),
    );

  const languagesUp = languages.map((t) => t.toUpperCase());
  if (languagesUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(a.cache.languages, languagesUp),
    );

  const coverageUp = coverage.map((t) => t.toUpperCase());
  const containsWorldWide = coverageUp.includes("WORLDWIDE");
  if (coverageUp.length > 0) {
    filteredApps = filteredApps.filter(
      (a) =>
        a.cache.coverage.some((a) =>
          coverageUp.some((c) => a.startsWith(c) || c.startsWith(a)),
        ) ||
        (containsWorldWide && a.coverage.length === 0),
    );
  }

  if (contribute.includes("discuss")) {
    filteredApps = filteredApps.filter((app) =>
      Object.values(app.community).some((v) => v),
    );
  }
  if (contribute.includes("test")) {
    filteredApps = filteredApps.filter((app) => !!app.community.issueTracker);
  }
  if (contribute.includes("translate")) {
    filteredApps = filteredApps.filter((app) => !!app.languagesUrl);
  }
  if (contribute.includes("develop")) {
    filteredApps = filteredApps.filter((app) => app.libre && !!app.sourceCode);
  }
  if (contribute.includes("document")) {
    filteredApps = filteredApps.filter(
      (app) =>
        !app.source.find((s) => s.name === "Software" || s.name === "Layer") ||
        !app.source.find((s) => s.name === "Wikidata"),
    );
  }
  if (contribute.includes("edit")) {
    filteredApps = filteredApps.filter(
      (app) =>
        equalsYes(...(app.editing?.createNotes || [])) ||
        app.cache.topics.some((topic) =>
          [
            "ADD POIS",
            "EDIT",
            "EDITING",
            "EDITOR",
            "EDITOR SOFTWARE",
            "EDITOR TOOL",
          ].includes(topic),
        ),
    );
  }
  if (contribute.includes("resolve")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(...(app.editing?.editNotes || [])),
    );
  }
  if (contribute.includes("review")) {
    filteredApps = filteredApps.filter((app) =>
      app.cache.topics.some((topic) =>
        ["CHANGESET REVIEW TOOL"].includes(topic),
      ),
    );
  }
  if (contribute.includes("photos")) {
    filteredApps = filteredApps.filter(
      (app) => app.hasGoal?.crowdsourcingStreetLevelImagery,
    );
  }
  if (contribute.includes("tracks")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(...(app.tracking?.uploadGPX || [])),
    );
  }
  if (contribute.includes("qa")) {
    filteredApps = filteredApps.filter((app) =>
      app.cache.topics.some((topic) =>
        ["ANALYSE", "ANALYSER", "ANALYSIS", "QA", "QUALITY CONTROL"].includes(
          topic,
        ),
      ),
    );
  }
  if (contribute.includes("welcome")) {
    filteredApps = filteredApps.filter((app) =>
      app.topics
        .map((topic) => topic.toUpperCase())
        .some((topic) => ["WELCOMING TOOL"].includes(topic)),
    );
  }

  function findSimilarApps() {
    // similar apps
    let similarApps: App[] = [];
    if (topicsUp.length > 0) {
      similarApps = apps.filter((a) => !filteredApps.includes(a));

      similarApps = similarApps.filter((a) =>
        topicsUp.every(
          (t) =>
            a.name.toUpperCase().includes(t) ||
            a.subtitle?.toUpperCase().includes(t) ||
            a.description.toUpperCase().includes(t) ||
            a.descriptionShort?.toUpperCase().includes(t),
        ),
      );

      if (search)
        similarApps = similarApps.filter(
          (a) =>
            a.name.toUpperCase().includes(search) ||
            a.subtitle?.toUpperCase().includes(search) ||
            a.description.toUpperCase().includes(search) ||
            a.descriptionShort?.toUpperCase().includes(search) ||
            a.cache.topics.filter((t) => t.includes(search)).length > 0 ||
            a.cache.platform.filter((t) => t.includes(search)).length > 0 ||
            a.cache.coverage.filter((t) => t.includes(search)).length > 0,
        );

      if (platformsUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(a.cache.platform, platformsUp),
        );

      if (languagesUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(a.cache.languages, languagesUp),
        );

      if (coverageUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(a.cache.coverage, coverageUp),
        );
    }
    return similarApps;
  }

  return [filteredApps, findSimilarApps] as const;
}
