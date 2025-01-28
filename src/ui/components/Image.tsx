import React from "react";
import i18next from "i18next";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";

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
    return (
      <img
        className="img"
        style={{ filter: app.filter }}
        src={defaultImage}
        alt={i18next.t("app.imageAlt", {
          name: app.name,
        })}
      />
    );
  }
}
