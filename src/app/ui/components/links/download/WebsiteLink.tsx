import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function WebsiteLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="far fa-map fa-fw"></i>
    </a>
  );
}
