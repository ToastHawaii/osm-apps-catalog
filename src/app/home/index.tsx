import { range } from "lodash";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { Logo } from "@app/ui/components/Image";
import { plainText } from "@shared/utilities/plainText";
import { useAppState } from "@hooks/useAppState";
import { some } from "@shared/utilities/array";
import { Categories } from "@app/Categories";
import { Filters } from "@app/Filters";
import { Link } from "react-router";

export function Home({ apps }: { apps: App[] }) {
  const { t } = useTranslation();
  const [state] = useAppState();

  const platformsUp = state.platforms.map((t) => t.toUpperCase());
  const categories = useMemo(() => {
    let filteredApps = apps.slice();
    if (platformsUp.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(a.cache.platform, platformsUp),
      );
    }

    const categories = Categories(t, filteredApps).map((c) => ({
      ...c,
      apps: [] as App[],
    }));

    // Add apps to categories so that the highest-scored apps are seen first
    let row = 0;
    let col = 0;
    const maxNumberOfAppsPerCategory = 9;
    range(maxNumberOfAppsPerCategory * categories.length).forEach(() => {
      const category = categories[row];

      if (row < col) {
        if (row < categories.length - 1) {
          row++;
        } else {
          row = categories.findIndex(
            (c) => c.apps.length < maxNumberOfAppsPerCategory,
          );
          col++;
        }
      } else {
        row = categories.findIndex(
          (c) => c.apps.length < maxNumberOfAppsPerCategory,
        );
        col++;
      }

      const index = category.nextIndex();
      if (index === -1) {
        return;
      }
      category.apps.push(...filteredApps.splice(index, 1));
    });

    return categories;
  }, [apps.length, JSON.stringify(state.platforms)]);

  return (
    <main className="mx-auto max-w-7xl">
      <Filters />

      <div id="list">
        {categories
          .filter((category) => category.apps.length > 0)
          .map((category) => (
            <React.Fragment key={category.id}>
              <div className="grid content-end px-8 pt-3 md:px-18">
                <h2 className="text-left text-2xl font-semibold">
                  {category.name()}
                </h2>
                <Link
                  className="col-start-2 self-end justify-self-end"
                  to={{
                    search: `?view=explore&category=${category.id}&platforms=${platformsUp.map((p) => p.toLowerCase()).join("%2B")}`,
                  }}
                >
                  {t("category.showAll")}
                </Link>
              </div>
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: "auto",
                }}
                className="w-full px-6 md:px-16"
              >
                <CarouselContent role="list">
                  {category.apps.map((app) => (
                    <CarouselItem
                      key={app.id}
                      className="basis-1/1 sm:basis-1/1 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-2">
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
                                {plainText(
                                  app.descriptionShort || app.description,
                                )}
                              </ItemDescription>
                            </ItemContent>
                          </Link>
                        </Item>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-8" />
                <CarouselNext className="right-8" />
              </Carousel>
            </React.Fragment>
          ))}
      </div>
    </main>
  );
}
