import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function AsinLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.install.asin) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://www.amazon.com/dp/${app.install.asin}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.asin")}
    >
      <i className="fab fa-amazon fa-fw"></i>
    </a>
  );
}
