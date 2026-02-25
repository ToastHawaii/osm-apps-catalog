import { LazyImage } from "@app/ui/components/LazyImage";
import { isLikelyLogo } from "@lib/utils/isLikelyLogo";
import { App } from "@shared/data/App";
import { calculateFilter } from "@shared/data/calculateFilter";
import React from "react";
import { useTranslation } from "react-i18next";

export function AppImage({
  app,
  loadOnInit,
}: {
  app: App;
  loadOnInit?: boolean | undefined;
}) {
  const { t } = useTranslation();

  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  const images = [
    ...app.images.filter((i) => !isLikelyLogo(i) && i.includes("/250px-")),
    ...app.images.filter((i) => !isLikelyLogo(i) && !i.includes("/250px-")),
    ...app.images.filter((i) => isLikelyLogo(i)),
    ...app.logos,
  ];

  if (!app.cache.filter) {
    app.cache.filter = calculateFilter(app);
  }

  return (
    <LazyImage
      className="img inline-block rounded-sm"
      style={{ filter: app.cache.filter }}
      src={defaultImage}
      dynamicSrc={images.join(" ")}
      alt={t("app.imageAlt", { name: app.name })}
      loadOnInit={loadOnInit}
    />
  );
}
