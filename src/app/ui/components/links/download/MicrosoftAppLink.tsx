import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { edit } from "@shared/utilities/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function MicrosoftAppLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.microsoftAppID) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={`https://apps.microsoft.com/detail/${app.install.microsoftAppID}`}
      title={t("app.install.microsoftApp")}
      data-goatcounter-click={`/app/download${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-microsoft fa-fw"></i>
    </ExternalLink>
  );
}
