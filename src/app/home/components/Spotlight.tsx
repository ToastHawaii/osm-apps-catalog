import { AppLogo } from "@components/common/AppLogo";
import { AppScreenshot } from "@components/common/AppScreenshot";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@components/ui/carousel";
import { Item, ItemContent } from "@components/ui/item";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utilities/plainText";
import { textToColor } from "@shared/utilities/string";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function Spotlight({ apps }: { apps: App[] }) {
  return (
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
        {apps.map((app) => {
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
                        <div className="grid">
                          <div className="size-25 place-items-center content-center">
                            <AppLogo app={app} loadOnInit />
                          </div>
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
                        <AppScreenshot app={app} loadOnInit />
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
  );
}
