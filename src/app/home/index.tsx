import { chain, upperCase } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { some } from "@shared/utils/array";
import { categories as categoryList } from "@app/home/categories";
import { Filters } from "@app/Filters";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";

import { Spotlight } from "@components/common/Spotlight";
import { Category } from "./components/Category";
import { Item, ItemActions, ItemContent } from "@components/ui/item";
import { Link } from "react-router";
import { useRoute } from "@hooks/useRoute";
import { Button } from "@components/ui/button";

export function Home({ apps }: { apps: App[] }) {
  const { t } = useTranslation();
  const routes = useRoute();

  const platforms = usePlatformUrlParam().map(upperCase);
  const { spotlight, categories } = useMemo(() => {
    let filteredApps = apps.slice();
    if (platforms.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platforms),
      );
    }

    const spotlight = chain(filteredApps)
      // show only apps that have ever been chosen for Spotlight
      .filter((a) => a.lastSpotlight !== "0000-00-00T00:00:00Z")
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

    const categories = categoryList(t, filteredApps).map((c) => ({
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
          <Spotlight
            firstPanel={{
              color: "rgb(145 238 145 / 40%)",
              title: t("introductionPanel.title"),
              description:
                apps.length === 0
                  ? t("introductionPanel.description.whileLoading")
                  : t("introductionPanel.description", {
                      numberOfApps: apps.length,
                    }),
              img: (
                <img
                  src="/assets/osm-apps-logo-big.png"
                  alt="OSM Apps Catalog logo"
                  className="w-45 lg:-my-6 lg:w-54"
                />
              ),
            }}
            apps={spotlight}
          />
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
          {apps.length > 0 && (
            <div className="my-10 w-full px-6 md:px-16">
              <div role="list" className="">
                <div className="p-2">
                  <Item
                    className="flex flex-col gap-6 overflow-hidden border-none bg-purple-50 px-10 py-8 sm:flex-row"
                    variant="outline"
                    role="listitem"
                  >
                    <ItemContent className="p-0">
                      <div className="text-2xl">{t("techViewPanel.title")}</div>
                      <div className="text-base">
                        {t("techViewPanel.description")}
                      </div>
                    </ItemContent>

                    <ItemActions className="w-full justify-end sm:w-auto">
                      <Button
                        className="w-full border-purple-500/0 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 sm:w-auto"
                        asChild
                      >
                        <Link to={routes.home({ domain: "tech" })}>
                          {t("techViewPanel.action")}
                        </Link>
                      </Button>
                    </ItemActions>
                  </Item>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
