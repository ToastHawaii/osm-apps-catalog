import { LazyImage } from "@app/ui/components/LazyImage";
import { isLikelyLogo } from "../../lib/utils/isLikelyLogo";
import { App } from "@shared/data/App";
import { calculateFilter } from "@shared/data/calculateFilter";
import React from "react";
import { useTranslation } from "react-i18next";

export function AppLogo({
  app,
  loadOnInit,
}: {
  app: App;
  loadOnInit?: boolean | undefined;
}) {
  const { t } = useTranslation();

  const defaultLogo =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  const logos = [...app.logos, ...app.images.filter((i) => isLikelyLogo(i))];

  // as a fallback we try to use the favicon from the given website as logo
  if (
    app.website &&
    // do not want icons from popular websites
    !app.website.includes("github.com") &&
    !app.website.includes("sourceforge.net") &&
    !app.website.includes("apple.com") &&
    !app.website.includes("steampowered.com")
  ) {
    const base = `https://${new URL(app.website).host}/favicon.`;
    logos.push(base + "png");
    logos.push(base + "ico");
    logos.push(base + "svg");
    logos.push(base + "gif");
  }

  if (!app.cache.filter) {
    app.cache.filter = calculateFilter(app);
  }

  return (
    <LazyImage
      className="max-h-full rounded-lg object-contain [[src$='.svg']]:size-full"
      style={{ filter: app.cache.filter }}
      src={defaultLogo}
      dynamicSrc={logos.length > 0 ? `${logos.join(" ")}` : undefined}
      alt={t("app.imageAlt", { name: app.name })}
      loadOnInit={loadOnInit}
    />
  );
}
