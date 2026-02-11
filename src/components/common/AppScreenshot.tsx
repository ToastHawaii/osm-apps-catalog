import { LazyImage } from "@app/ui/components/LazyImage";
import { isLikelyLogo } from "@lib/utils/isLikelyLogo";
import { App } from "@shared/data/App";
import React from "react";
import { useTranslation } from "react-i18next";

export function AppScreenshot({
  app,
  loadOnInit,
}: {
  app: App;
  loadOnInit?: boolean | undefined;
}) {
  const { t } = useTranslation();

  return (
    <LazyImage
      className="img inline-block rounded-md"
      dynamicSrc={`${app.images.filter((i) => !isLikelyLogo(i) && !i.includes("/250px-")).join(" ")}`}
      alt={t("app.imageAlt", {
        name: app.name,
      })}
      loadOnInit={loadOnInit}
    />
  );
}
