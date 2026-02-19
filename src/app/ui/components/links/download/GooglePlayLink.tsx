import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/utils/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function GooglePlayLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.googlePlayID) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={`https://play.google.com/store/apps/details?id=${app.install.googlePlayID}`}
      title={t("app.install.googlePlay")}
      data-goatcounter-click={`/app/download${
        contribute(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-google-play fa-fw"></i>
    </ExternalLink>
  );
}
