import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function SourceCodeLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  return (
    <a
      className="download"
      href={app.sourceCode}
      target="_blank"
      rel="noreferrer"
      title={t("app.sourceCode")}
      data-goatcounter-click="app/download/sourceCode"
      data-goatcounter-title="Download app via Source code."
    >
      <i className="fas fa-code fa-fw"></i>
    </a>
  );
}
