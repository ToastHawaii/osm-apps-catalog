import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/lib/filters";
import { ExternalLink } from "@components/common/ExternalLink";
import { getAsin } from "@shared/utils/links/getAsin";

export function AsinLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getAsin(app.install.asin);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={link}
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
