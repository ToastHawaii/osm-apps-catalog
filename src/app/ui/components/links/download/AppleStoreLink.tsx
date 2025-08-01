import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function AppleStoreLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.appleStoreID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://apps.apple.com/app/id${app.install.appleStoreID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.appleStore")}
      data-goatcounter-click={`/app/download${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-app-store-ios fa-fw"></i>
    </a>
  );
}
