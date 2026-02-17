import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { Categories } from "./Categories";

import { Category } from "./components/Category";

export function Tech({ apps }: { apps: App[] }) {
  const { t } = useTranslation();

  const { categories } = useMemo(() => {
    apps = apps.slice();

    const categories = Categories(t, apps).map((c) => ({
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

      category.apps.push(...apps.splice(index, 1));

      if (row >= col) {
        row = 0;
        col++;
      } else {
        row++;
      }
    }

    return { categories };
  }, [apps]);

  return (
    <>
      <title>{`OSM Apps Catalog`}</title>
      <meta
        name="description"
        content="There isn't just one, there are thousands."
      />
      <main className="mx-auto max-w-7xl">
        <div id="list">
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
