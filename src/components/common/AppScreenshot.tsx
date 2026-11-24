import { LazyImage } from "@app/ui/components/LazyImage";
import { useMediaQuery } from "@hooks/useMediaQuery";
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
  const isAtLeastSm = useMediaQuery("(min-width: 640px)");

  if (!isAtLeastSm) {
    return null;
  }

  return (
    <LazyImage
      className="img inline-block rounded-md"
      dynamicSrc={app.images.filter((i) => !isLikelyLogo(i)).join(" ")}
      expectedWidth={500}
      alt={t("app.screenshotAlt", { name: app.name })}
      loadOnInit={loadOnInit}
    />
  );
}
