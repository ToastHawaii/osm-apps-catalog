import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function GooglePlayLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fab fa-google-play fa-fw"></i>
    </a>
  );
}
