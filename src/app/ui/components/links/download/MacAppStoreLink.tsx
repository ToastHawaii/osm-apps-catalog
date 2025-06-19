import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function MacAppStoreLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.macAppStoreID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://apps.apple.com/app/id${app.install.macAppStoreID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.macAppStore")}
      data-goatcounter-click="app/download/macAppStore"
      data-goatcounter-title="Download app via Mac App Store."
    >
      <i className="fab fa-app-store fa-fw"></i>
    </a>
  );
}
