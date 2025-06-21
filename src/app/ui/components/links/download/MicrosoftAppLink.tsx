import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function MicrosoftAppLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.microsoftAppID) {
    return null;
  }

  return (
    <a
      className="download"
      href={`https://apps.microsoft.com/detail/${app.install.microsoftAppID}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.microsoftApp")}
      data-goatcounter-click={`/app/download/microsoftApp${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Download app via Microsoft Store."
    >
      <i className="fab fa-microsoft fa-fw"></i>
    </a>
  );
}
