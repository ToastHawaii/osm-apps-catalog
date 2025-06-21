import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function AsinLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.asin) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://www.amazon.com/dp/${app.install.asin}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.asin")}
      data-goatcounter-click={`/app/download/asin${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Download app via Amazon Appstore."
      data-goatcounter-referrer={`https://osm-apps.org/app/${app.id}`}
    >
      <i className="fab fa-amazon fa-fw"></i>
    </a>
  );
}
