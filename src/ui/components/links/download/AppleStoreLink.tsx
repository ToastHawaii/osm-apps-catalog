import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function AppleStoreLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.install.appleStoreID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://apps.apple.com/app/id${app.install.appleStoreID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.appleStore")}
    >
      <i className="fab fa-app-store-ios fa-fw"></i>
    </a>
  );
}
