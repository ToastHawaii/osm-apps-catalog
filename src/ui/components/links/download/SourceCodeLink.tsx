import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function SourceCodeLink({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <a
      className="download"
      href={app.sourceCode}
      target="_blank"
      rel="noreferrer"
      title={t("app.sourceCode")}
    >
      <i className="fas fa-code fa-fw"></i>
    </a>
  );
}
