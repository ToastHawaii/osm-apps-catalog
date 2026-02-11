import { chain } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { some } from "@shared/utilities/array";
import { Categories } from "@app/Categories";
import { Filters } from "@app/Filters";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";

import { Spotlight } from "./components/Spotlight";
import { Category } from "./components/Category";

export function Home({ apps }: { apps: App[] }) {
  const { t } = useTranslation();

  const platforms = usePlatformUrlParam();
  const { spotlight, categories } = useMemo(() => {
    let filteredApps = apps.slice();
    if (platforms.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platforms),
      );
    }

    const spotlight = chain(filteredApps)
      .sortBy((a) => a.lastSpotlight)
      .reverse()
      .take(5)
      .sortBy((a) => a.score)
      .reverse()
      .value();

    spotlight.forEach((f) => {
      const index = filteredApps.findIndex((app) => app.id === f.id);
      filteredApps.splice(index, 1);
    });

    const categories = Categories(t, filteredApps).map((c) => ({
      ...c,
      apps: [] as App[],
    }));

    // Add apps to categories so that the highest-scored apps are seen first
    let row = 0;
    let col = 0;
    const maxNumberOfAppsPerCategory = 6;
    while (col < maxNumberOfAppsPerCategory + categories.length - 1) {
      if (row >= categories.length) {
        row = 0;
        col++;
        continue;
      }

      const category = categories[row];

      if (category.apps.length >= maxNumberOfAppsPerCategory) {
        row++;
        continue;
      }

      const index = category.nextIndex();
      if (index === -1) {
        row++;
        continue;
      }

      category.apps.push(...filteredApps.splice(index, 1));

      if (row >= col) {
        row = 0;
        col++;
      } else {
        row++;
      }
    }

    return { spotlight, categories };
  }, [apps, platforms]);

  return (
    <>
      <title>{`OSM Apps Catalog`}</title>
      <meta
        name="description"
        content="There isn't just one, there are thousands."
      />
      <main className="mx-auto max-w-7xl">
        <Filters />

        <div id="list">
          <Spotlight apps={spotlight} />
          {categories
            .filter((category) => category.apps.length > 0)
            .map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name()}
                apps={category.apps}
              />
            ))}
        </div>
      </main>
    </>
  );
}
