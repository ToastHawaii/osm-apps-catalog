import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/utilities/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function AsinLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.asin) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={`https://www.amazon.com/dp/${app.install.asin}`}
      title={t("app.install.asin")}
      data-goatcounter-click={`/app/download${
        contribute(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-amazon fa-fw"></i>
    </ExternalLink>
  );
}
