import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { some } from "@shared/utils/array";
import { categories as homeCategories } from "@app/home/categories";
import { categories as techCategories } from "@app/tech/categories";
import { Filters } from "@app/Filters";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { PagedList } from "@app/ui/PagedList";
import { AppCompact } from "@components/common/AppCompact";
import { Score } from "@app/ui/components/Score";

function AppComponent({ app }: { app: App }) {
  return (
    <div className="relative p-2">
      <Score app={app} position="right" />
      <AppCompact app={app} />
    </div>
  );
}

export function Category({ apps, id }: { apps: App[]; id: string }) {
  const { t } = useTranslation();

  const platforms = usePlatformUrlParam().map((p) => p.toUpperCase());

  const { category, techView } = useMemo(() => {
    let filteredApps = apps.slice();
    const appsCopy = apps.slice();
    if (platforms.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platforms),
      );
    }

    let techView = false;
    let category:
      | {
          id: string;
          name: () => string;
          description?: ((numberOfApps: number) => string) | undefined;
          getAll?: (() => App[]) | undefined;
          nextIndex: () => number;
        }
      | undefined = homeCategories(t, filteredApps).find((c) => c.id === id);

    if (!category) {
      category = techCategories(t, appsCopy).find((c) => c.id === id);
      techView = true;
    }

    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }

    const categoryApps = [];
    if ("getAll" in category && category.getAll) {
      categoryApps.push(...category.getAll());
    } else {
      let index = category.nextIndex();
      while (index !== -1) {
        categoryApps.push(
          ...(!techView ? filteredApps : appsCopy).splice(index, 1),
        );
        index = category.nextIndex();
      }
    }
    return {
      category: {
        ...category,
        apps: categoryApps,
      },
      techView,
    };
  }, [apps.length, platforms]);

  return (
    <>
      <title>{`${category.name()} – OSM Apps Catalog`}</title>
      {category.description && (
        <meta
          name="description"
          content={category.description(category.apps.length)}
        />
      )}
      <main className="mx-auto max-w-7xl">
        {!techView && <Filters />}

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
            <PagedList
              items={category.apps.map((app) => ({ key: app.id, app }))}
              Template={AppComponent}
            />
          </div>
        </div>
      </main>
    </>
  );
}
