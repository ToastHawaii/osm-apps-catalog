import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { some } from "@shared/utilities/array";
import { Categories } from "@app/Categories";
import { Filters } from "@app/Filters";
import { AppCompact } from "@components/common/AppCompact";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";

export function Category({ apps, id }: { apps: App[]; id: string }) {
  const { t } = useTranslation();

  const platforms = usePlatformUrlParam();

  const category = useMemo(() => {
    let filteredApps = apps.slice();
    if (platforms.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platforms),
      );
    }

    const category = Categories(t, filteredApps).find((c) => c.id === id);

    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }

    const categoryApps = [];
    if ("getAll" in category && category.getAll) {
      categoryApps.push(...category.getAll());
    } else {
      let index = category.nextIndex();
      while (index !== -1) {
        categoryApps.push(...filteredApps.splice(index, 1));
        index = category.nextIndex();
      }
    }
    return {
      ...category,
      apps: categoryApps,
    };
  }, [apps.length, platforms]);

  return (
    <>
      <title>{`${t(`category.${id}`, {
        numberOfApps: apps.length,
      })} - OSM Apps Catalog`}</title>
      <meta
        name="description"
        content={t(`category.${id}.description`, {
          numberOfApps: apps.length,
        })}
      />
      <main className="mx-auto max-w-7xl">
        <Filters />

        <div id="list">
          <h2 className="px-8 pt-3 text-left text-2xl font-semibold md:px-18">
            {category.name()}
          </h2>
          {category.description && (
            <p className="px-8 text-sm text-muted-foreground md:px-18">
              {category.description(category.apps.length)}
            </p>
          )}
          <div className="grid gap-x-4 gap-y-2 px-6 md:grid-cols-2 md:px-16 lg:grid-cols-3">
            {category.apps.map((app) => (
              <AppCompact app={app} key={app.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
