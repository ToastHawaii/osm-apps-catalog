import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function GooglePlayLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.googlePlayID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://play.google.com/store/apps/details?id=${app.install.googlePlayID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.googlePlay")}
      data-goatcounter-click={`/app/download/googlePlay${edit(app) ? "?category=edit" : ""}`}
      data-goatcounter-title="Download app via Google Play."
    >
      <i className="fab fa-google-play fa-fw"></i>
    </a>
  );
}
