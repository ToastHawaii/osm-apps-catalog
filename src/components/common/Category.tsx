import { AppCompact } from "@components/common/AppCompact";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@components/ui/carousel";
import { useGoatCounterEvents } from "@hooks/useGoatCounterEvents";
import { useRoute } from "@hooks/useRoute";
import { App } from "@shared/data/App";
import { t } from "i18next";
import React from "react";
import { Link } from "react-router";

export function Category({
  id,
  name,
  apps,
  platforms,
}: {
  id: string;
  name: string;
  apps: App[];
  platforms?: string[] | undefined;
}) {
  useGoatCounterEvents();

  const routes = useRoute();

  return (
    <>
      <div className="grid content-end px-8 pt-4 md:px-18">
        <h2 className="text-left text-lg font-semibold sm:text-2xl">
          <Link
            className="underline-offset-4 hover:underline"
            data-goatcounter-click={`/?category=${id}`}
            data-goatcounter-title="Has switched the category."
            data-goatcounter-referrer="https://osm-apps.org/"
            to={routes.explore({
              category: id,
              platforms,
            })}
          >
            {name}
          </Link>
        </h2>
        <Link
          className="col-start-2 self-end justify-self-end text-sm underline-offset-4 hover:underline"
          data-goatcounter-click={`/?category=${id}`}
          data-goatcounter-title="Has switched the category."
          data-goatcounter-referrer="https://osm-apps.org/"
          to={routes.explore({
            category: id,
            platforms,
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
          {apps.map((app) => (
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
    </>
  );
}
