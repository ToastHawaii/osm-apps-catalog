import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../lib/utils/useGoatCounterEvents";
import { edit } from "@shared/utilities/filters";

export function WebsiteLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.website) {
    return null;
  }

  return (
    <a
      className="download"
      href={app.website}
      target="_blank"
      rel="noreferrer"
      title={t("app.website")}
      data-goatcounter-click={`/app/download${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="far fa-map fa-fw"></i>
    </a>
  );
}
