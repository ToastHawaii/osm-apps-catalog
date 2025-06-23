import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function FDroidLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.fDroidID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.fDroid")}
      data-goatcounter-click={`/app/download/fDroid${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Download app via Amazon F-Droid."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-android fa-fw"></i>
    </a>
  );
}
