import { chain } from "lodash";
import { useFuzzySearchList } from "@nozbe/microfuzz/react";
import createFuzzySearch from "@nozbe/microfuzz";

import { normalizeSearchText } from "@lib/utils/normalizeSearchText";
import { App } from "@shared/data/App";
import { includes, some } from "@shared/utils/array";
import {
  contribute as contributeFilter,
  edit,
  offlineUse,
  navigation,
  qa,
} from "@shared/lib/filters";
import { equalsYes, upperCase } from "@shared/utils/string";
import { State } from "../app/ui/lib/State";

export function useFilter({
  apps,
  category,
  search,
  tags,
  topics,
  languages,
  platforms,
  programmingLanguages,
  coverage,
  contribute,
}: { apps: App[] } & State) {
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
    filteredApps = filteredApps.filter(offlineUse);
  } else if (category === "navigation") {
    filteredApps = filteredApps.filter(navigation);
  } else if (category === "edit") {
    filteredApps = filteredApps.filter(contributeFilter);
  }

  search = normalizeSearchText(search);

  filteredApps = useFuzzySearchList({
    list: filteredApps,
    queryText: search,
    getText: (app) => [app.cache.search],
    strategy: "off",
    mapResultItem: ({ item }) => item,
  });

  if (tags.length > 0)
    filteredApps = filteredApps.filter((a) => includes(a.tags, tags));

  const topicsUp = upperCase(topics);
  if (topicsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(a.cache.topics, topicsUp),
    );

  const languagesUp = upperCase(languages);
  if (languagesUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(a.cache.languages, languagesUp),
    );

  const platformsUp = upperCase(platforms);
  if (platformsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(a.cache.platform, platformsUp),
    );

  const programmingLanguagesUp = programmingLanguages.map((t) =>
    t.toUpperCase(),
  );
  if (programmingLanguagesUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(a.cache.programmingLanguages, programmingLanguagesUp),
    );

  const coverageUp = upperCase(coverage);
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
        !app.source.some((s) => s.name === "Software" || s.name === "Layer") ||
        !app.source.some((s) => s.name === "Wikidata"),
    );
  }
  if (contribute.includes("edit")) {
    filteredApps = filteredApps.filter((app) => edit(app));
  }
  if (contribute.includes("resolve")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(app.editing?.editNotes),
    );
  }
  if (contribute.includes("review")) {
    filteredApps = filteredApps.filter((app) =>
      some(app.cache.topics, ["CHANGESET REVIEW TOOL"]),
    );
  }
  if (contribute.includes("photos")) {
    filteredApps = filteredApps.filter(
      (app) => app.hasGoal?.crowdsourcingStreetLevelImagery,
    );
  }
  if (contribute.includes("tracks")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(app.tracking?.uploadGPX),
    );
  }
  if (contribute.includes("qa")) {
    filteredApps = filteredApps.filter((app) => qa(app));
  }
  if (contribute.includes("welcome")) {
    filteredApps = filteredApps.filter((app) =>
      some(app.cache.topics, ["WELCOMING TOOL"]),
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

      if (search) {
        const fuzzySearch = createFuzzySearch(similarApps, {
          getText: (app) => [app.cache.search],
          strategy: "off",
        });
        similarApps = fuzzySearch(search).map(({ item }) => item);
      }

      if (tags.length > 0)
        similarApps = similarApps.filter((a) => some(a.tags, tags));

      if (languagesUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(a.cache.languages, languagesUp),
        );

      if (platformsUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(a.cache.platform, platformsUp),
        );

      if (programmingLanguagesUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(a.cache.programmingLanguages, programmingLanguagesUp),
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
