import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import { App } from "@shared/data/App";
import { Logo } from "@app/ui/components/Image";
import { plainText } from "@shared/utilities/plainText";
import { useAppState } from "@hooks/useAppState";
import { some } from "@shared/utilities/array";
import { Categories } from "@app/Categories";
import { Filters } from "@app/Filters";
import { Link } from "react-router";

export function Category({ apps, id }: { apps: App[]; id: string }) {
  const { t } = useTranslation();
  const [state] = useAppState();

  const category = useMemo(() => {
    const platformsUp = state.platforms.map((t) => t.toUpperCase());
    let filteredApps = apps.slice();
    if (platformsUp.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platformsUp),
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
  }, [apps.length, JSON.stringify(state.platforms)]);

  return (
    <main className="mx-auto max-w-7xl">
      <Filters />

      <div id="list">
        <h2 className="px-8 pt-3 text-left text-2xl font-semibold md:px-18">
          {category.name()}
        </h2>
        <div className="grid gap-x-4 gap-y-2 px-6 md:grid-cols-2 md:px-16 lg:grid-cols-3">
          {category.apps.map((app) => (
            <div className="p-2" key={app.id}>
              <Item variant="outline" asChild role="listitem">
                <Link to={{ search: `?view=app&app=${app.id}` }}>
                  <ItemMedia variant="icon" className="size-15">
                    <Logo app={app} />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1 wrap-anywhere">
                      {app.name}
                    </ItemTitle>
                    <ItemDescription className="line-clamp-2 h-10 wrap-anywhere">
                      {plainText(app.descriptionShort || app.description)}
                    </ItemDescription>
                  </ItemContent>
                </Link>
              </Item>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
