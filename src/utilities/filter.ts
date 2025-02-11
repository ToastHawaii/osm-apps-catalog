import { App } from "../data/App";
import { State } from "../State";
import { includes, some } from "./array";
import { edit, mobile, navigation } from "./filters";
import { equalsIgnoreCase, equalsYes } from "./string";

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
    filteredApps = filteredApps.sort(function (a, b) {
      const nameA = a.source[0].lastChange || "";
      const nameB = b.source[0].lastChange || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    });

    filteredApps = filteredApps.sort(function (a, b) {
      const nameA = a.lastRelease || "";
      const nameB = b.lastRelease || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    });
  } else if (category === "focus") {
    let latestApps = filteredApps.sort(function (a, b) {
      const nameA = a.source[0].lastChange || "";
      const nameB = b.source[0].lastChange || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    });

    filteredApps = [];
    for (const app of latestApps) {
      if (filteredApps.length < 10) {
        if (
          !filteredApps.some(
            (a) =>
              equalsIgnoreCase(a.source[0].url, app.source[0].url) ||
              (a.source[0].url.startsWith(
                "https://taginfo.openstreetmap.org/projects/"
              ) &&
                app.source[0].url.startsWith(
                  "https://taginfo.openstreetmap.org/projects/"
                ))
          )
        ) {
          filteredApps.push(app);
        }
      } else {
        break;
      }
    }
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
        a.name.toUpperCase().indexOf(search) !== -1 ||
        a.description.toUpperCase().indexOf(search) !== -1 ||
        a.topics.filter((t) => t.toUpperCase().indexOf(search) !== -1).length >
          0 ||
        a.platform.filter((t) => t.toUpperCase().indexOf(search) !== -1)
          .length > 0 ||
        a.coverage.filter((t) => t.toUpperCase().indexOf(search) !== -1)
          .length > 0
    );
  }

  const topicsUp = topics.map((t) => t.toUpperCase());
  if (topicsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(
        a.topics.map((t) => t.toUpperCase()),
        topicsUp
      )
    );

  const platformsUp = platforms.map((t) => t.toUpperCase());
  if (platformsUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(
        a.platform.map((t) => t.toUpperCase()),
        platformsUp
      )
    );

  const languagesUp = languages.map((t) => t.toUpperCase());
  if (languagesUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      some(
        a.languages.map((t) => t.toUpperCase()),
        languagesUp
      )
    );

  const coverageUp: string[] = [];
  coverage.forEach((t) => {
    const regions = t.toUpperCase().split(", ");
    let entry = [];
    for (let index = 0; index < regions.length; index++) {
      entry.push(regions[index]);
      coverageUp.push(entry.join(", "));
    }
  });
  if (coverageUp.length > 0) {
    filteredApps = filteredApps.filter((a) =>
      some(
        a.coverage.map((t) => t.toUpperCase()),
        coverageUp
      )
    );
  }

  if (contribute.includes("discuss")) {
    filteredApps = filteredApps.filter(
      (app) => Object.values(app.community).filter((v) => v).length > 0
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
        !app.source.find((s) => s.name === "Wikidata")
    );
  }
  if (contribute.includes("edit")) {
    filteredApps = filteredApps.filter(
      (app) =>
        equalsYes(...(app.editing?.createNotes || [])) ||
        app.topics
          .map((topic) => topic.toUpperCase())
          .some((topic) =>
            [
              "ADD POIS",
              "EDIT",
              "EDITING",
              "EDITOR",
              "EDITOR SOFTWARE",
              "EDITOR TOOL",
            ].includes(topic)
          )
    );
  }
  if (contribute.includes("resolve")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(...(app.editing?.editNotes || []))
    );
  }
  if (contribute.includes("review")) {
    filteredApps = filteredApps.filter((app) =>
      app.topics
        .map((topic) => topic.toUpperCase())
        .some((topic) => ["CHANGESET REVIEW TOOL"].includes(topic))
    );
  }
  if (contribute.includes("photos")) {
    filteredApps = filteredApps.filter(
      (app) => app.hasGoal?.crowdsourcingStreetLevelImagery
    );
  }
  if (contribute.includes("tracks")) {
    filteredApps = filteredApps.filter((app) =>
      equalsYes(...(app.tracking?.uploadGPX || []))
    );
  }
  if (contribute.includes("qa")) {
    filteredApps = filteredApps.filter((app) =>
      app.topics
        .map((topic) => topic.toUpperCase())
        .some((topic) =>
          ["ANALYSE", "ANALYSER", "ANALYSIS", "QA", "QUALITY CONTROL"].includes(
            topic
          )
        )
    );
  }
  if (contribute.includes("welcome")) {
    filteredApps = filteredApps.filter((app) =>
      app.topics
        .map((topic) => topic.toUpperCase())
        .some((topic) => ["WELCOMING TOOL"].includes(topic))
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
            a.name.toUpperCase().indexOf(t) !== -1 ||
            a.description.toUpperCase().indexOf(t) !== -1
        )
      );

      if (search)
        similarApps = similarApps.filter(
          (a) =>
            a.name.toUpperCase().indexOf(search) !== -1 ||
            a.description.toUpperCase().indexOf(search) !== -1 ||
            a.topics.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0 ||
            a.platform.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0 ||
            a.coverage.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0
        );

      if (platformsUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(
            a.platform.map((t) => t.toUpperCase()),
            platformsUp
          )
        );

      if (languagesUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(
            a.languages.map((t) => t.toUpperCase()),
            languagesUp
          )
        );

      if (coverageUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(
            a.coverage.map((t) => t.toUpperCase()),
            coverageUp
          )
        );
    }
    return similarApps;
  }

  return [filteredApps, findSimilarApps] as const;
}
