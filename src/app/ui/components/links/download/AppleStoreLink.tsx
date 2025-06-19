import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function AppleStoreLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useEffect(() => {
    (window as any).goatcounter.bind_events();
  });

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
      data-goatcounter-click="download-apple-store"
      data-goatcounter-title="Download app via Apple App Store."
      data-goatcounter-referrer="apps.apple.com"
    >
      <i className="fab fa-app-store-ios fa-fw"></i>
    </a>
  );
}
