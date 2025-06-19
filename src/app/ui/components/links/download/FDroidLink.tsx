import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

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
      data-goatcounter-click="/app/download/fDroid"
      data-goatcounter-title="Download app via Amazon F-Droid."
    >
      <i className="fab fa-android fa-fw"></i>
    </a>
  );
}
