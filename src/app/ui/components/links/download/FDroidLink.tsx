import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function FDroidLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fab fa-android fa-fw"></i>
    </a>
  );
}
