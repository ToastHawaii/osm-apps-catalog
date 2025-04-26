import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function MacAppStoreLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fab fa-app-store fa-fw"></i>
    </a>
  );
}
