import React from "react";
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
import { Separator } from "@components/ui/separator";
import { LazyLoadImages } from "@app/ui/components/LazyLoadImages";
import { Logo } from "@app/ui/components/Image";
import { useTranslation } from "react-i18next";
import { range } from "lodash";
import { plainText } from "@shared/utilities/plainText";

export function Home({ apps }: { apps: App[] }) {
  const { t } = useTranslation();

  apps = apps.slice();

  const categoryDefs = [
    {
      name: () => t("gratis", "Gratis"),
      filter: (app: App) => app.gratis,
    },
    {
      name: () => t("display", "display"),
      filter: (app: App) => app.genre.includes("Display"),
    },
    {
      name: () => t("editor", "editor"),
      filter: (app: App) => app.genre.includes("Editor"),
    },
  ];

  const categories = categoryDefs.map((c) => ({ ...c, apps: [] as App[] }));

  range(10).forEach(() => {
    categories.forEach((category) => {
      const index = apps.findIndex(category.filter);
      if (index === -1) {
        return;
      }
      category.apps.push(...apps.splice(index, 1));
    });
  });

  return (
    <>
      <div className="px-8 py-6">
        <h2 className="text-left font-semibold">OSM App Catalog</h2>
      </div>
      <Separator />
      <main className="mx-auto max-w-7xl" id="content">
        <div id="list">
          <LazyLoadImages>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <h2 className="px-18 pt-3 text-left text-2xl font-semibold">
                  {category.name()}
                </h2>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full px-16"
                >
                  <CarouselContent role="list">
                    {category.apps.map((app) => (
                      <CarouselItem
                        key={app.id}
                        className="basis-1/1 sm:basis-1/1 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="p-2">
                          <Item variant="outline" asChild role="listitem">
                            <a href="#">
                              <ItemMedia variant="icon" className="size-15">
                                <Logo app={app} />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle className="line-clamp-1 wrap-anywhere">
                                  {app.name}
                                </ItemTitle>
                                <ItemDescription className="line-clamp-2 h-10 wrap-anywhere">
                                  {plainText(app.description)}
                                </ItemDescription>
                              </ItemContent>
                            </a>
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
          </LazyLoadImages>
        </div>
      </main>
    </>
  );
}
