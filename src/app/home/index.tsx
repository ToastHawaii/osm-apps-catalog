import { chain } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";

import { App } from "@shared/data/App";
import { some } from "@shared/utilities/array";
import { Categories } from "@app/Categories";
import { Filters } from "@app/Filters";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { useRoutes } from "@hooks/useRoutes";
import { plainText } from "@shared/utilities/plainText";
import { textToColor } from "@shared/utilities/string";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { Item, ItemContent } from "@components/ui/item";
import { Logo, Image2 } from "@app/ui/components/Image";
import { AppCompact } from "@components/common/AppCompact";

export function Home({ apps }: { apps: App[] }) {
  const { t } = useTranslation();

  const routes = useRoutes();

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
          <Carousel
            className="w-full px-6 md:px-16"
            opts={{ loop: true, duration: 35 }}
            plugins={[
              Autoplay({
                delay: 8000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent role="list">
              {spotlight.map((app) => {
                const defaultColor = textToColor(app.name);

                return (
                  <CarouselItem key={app.id} className="basis-1/1">
                    <div className="p-2">
                      <Item
                        className="overflow-hidden px-12 py-10"
                        variant="outline"
                        asChild
                        role="listitem"
                        style={{
                          backgroundColor: `rgb(${defaultColor.r} ${defaultColor.g} ${defaultColor.b} / 40%)`,
                        }}
                      >
                        <a href={`?view=app&app=${app.id}`}>
                          <ItemContent className="grid p-0 md:grid-cols-2">
                            <div className="justify-items-center">
                              <div className="grid size-25 place-items-center">
                                <Logo app={app} />
                              </div>
                              <div className="line-clamp-1 text-2xl wrap-anywhere">
                                {app.name}
                              </div>
                              <div className="line-clamp-2 h-10 max-w-100 wrap-anywhere">
                                {plainText(
                                  app.subtitle ||
                                    app.descriptionShort ||
                                    app.description,
                                )}
                              </div>
                            </div>
                            <div className="hidden max-h-3 px-10 pt-10 text-center md:block">
                              <Image2 app={app} />
                            </div>
                          </ItemContent>
                        </a>
                      </Item>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4 md:left-8" />
            <CarouselNext className="right-4 md:right-8" />
          </Carousel>
          {categories
            .filter((category) => category.apps.length > 0)
            .map((category) => (
              <React.Fragment key={category.id}>
                <div className="grid content-end px-8 pt-3 md:px-18">
                  <h2 className="text-left text-2xl font-semibold">
                    <Link
                      className="underline-offset-4 hover:underline"
                      data-goatcounter-click={`/?category=${category.id}`}
                      data-goatcounter-title="Has switched the category."
                      data-goatcounter-referrer="https://osm-apps.org/"
                      to={routes.explore({
                        category: category.id,
                        platforms: platforms.map((p) => p.toLowerCase()),
                      })}
                    >
                      {category.name()}
                    </Link>
                  </h2>
                  <Link
                    className="col-start-2 self-end justify-self-end text-sm underline-offset-4 hover:underline"
                    data-goatcounter-click={`/?category=${category.id}`}
                    data-goatcounter-title="Has switched the category."
                    data-goatcounter-referrer="https://osm-apps.org/"
                    to={routes.explore({
                      category: category.id,
                      platforms: platforms.map((p) => p.toLowerCase()),
                    })}
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
                        <AppCompact app={app} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 md:left-8" />
                  <CarouselNext className="right-4 md:right-8" />
                </Carousel>
              </React.Fragment>
            ))}
        </div>
      </main>
    </>
  );
}
