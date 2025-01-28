import { App } from "./data/App";
import { State } from "./State";
import { includes, some } from "./utilities/array";
import { edit, mobile, navigation } from "./utilities/filter";
import { equalsIgnoreCase } from "./utilities/string";

export function filter({
  apps,
  category,
  search,
  topics,
  platforms,
  languages,
  coverage,
}: { apps: App[] } & State) {
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

  // similar apps
  let similarApps :App[]= [];
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

  return [ filteredApps, similarApps ];
}
