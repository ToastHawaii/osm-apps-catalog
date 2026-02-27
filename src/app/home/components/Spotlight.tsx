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
import { useRoute } from "@hooks/useRoute";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";
import { textToColor } from "@shared/utils/string";
import Autoplay from "embla-carousel-autoplay";
import React, { ReactNode } from "react";
import { Link } from "react-router";

export function Spotlight({
  firstPanel,
  apps,
}: {
  firstPanel: {
    color: string;
    title: string;
    description: string;
    img: ReactNode;
  };
  apps: App[];
}) {
  const routes = useRoute();

  const plugin = React.useRef(
    Autoplay({
      delay: 8000,
      playOnInit: false, // prevent immediate start
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: true,
    }),
  );

  React.useEffect(() => {
    if (!plugin.current) return;

    // Wait 8 seconds before starting autoplay + 8 seconds before the first
    // slide change, so that users have time to read the first panel
    const timer = setTimeout(() => {
      plugin.current.play();
    }, 8000);

    return () => clearTimeout(timer);
  }, [plugin.current]);

  return (
    <Carousel
      className="w-full px-6 md:px-16"
      opts={{ loop: true, duration: 35 }}
      plugins={[plugin.current]}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent role="list">
        <CarouselItem className="basis-1/1">
          <div className="p-2">
            <Item
              className="overflow-hidden border-none p-6 py-10 md:px-12"
              variant="outline"
              role="listitem"
              style={{
                backgroundColor: firstPanel.color,
              }}
            >
              <ItemContent className="flex h-43 flex-row justify-center gap-4!">
                <div className="grow">
                  <div className="text-base sm:text-2xl md:text-3xl">
                    {firstPanel.title}
                  </div>
                  <div className="whitespace-pre-line sm:text-base md:text-xl">
                    {firstPanel.description}
                  </div>
                </div>
                {firstPanel.img && (
                  <div className="hidden! flex-none md:block!">
                    {firstPanel.img}
                  </div>
                )}
              </ItemContent>
            </Item>
          </div>
        </CarouselItem>
        {apps.map((app) => {
          const defaultColor = textToColor(app.name);

          return (
            <CarouselItem key={app.id} className="basis-1/1">
              <div className="p-2">
                <Item
                  className="overflow-hidden border-none px-12 py-10"
                  variant="outline"
                  asChild
                  role="listitem"
                  style={{
                    backgroundColor: `rgb(${defaultColor.r} ${defaultColor.g} ${defaultColor.b} / 40%)`,
                  }}
                >
                  <Link to={routes.app({ app: app.id })}>
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
                  </Link>
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
