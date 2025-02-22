import React from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateFilter } from "../../data/calculateFilter";

export function Image({ app }: { app: App }) {
  const { t } = useTranslation();
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  if (app.images.length > 0) {
    return (
      <img
        className="img"
        src={defaultImage}
        data-dynamic-src={`${app.images.join(" ")} ${defaultImage}`}
        alt={t("app.imageAlt", {
          name: app.name,
        })}
      />
    );
  } else {
    if (!app.cache.filter) {
      app.cache.filter = calculateFilter(app);
    }

    return (
      <img
        className="img"
        style={{ filter: app.cache.filter }}
        src={defaultImage}
        alt={t("app.imageAlt", {
          name: app.name,
        })}
      />
    );
  }
}
