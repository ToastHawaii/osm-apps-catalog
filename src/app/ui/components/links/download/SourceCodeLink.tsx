import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

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
      data-goatcounter-click={`/app/download/sourceCode${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Download app via Source code."
      data-goatcounter-referrer={`https://osm-apps.org/app/${app.id}`}
    >
      <i className="fas fa-code fa-fw"></i>
    </a>
  );
}
