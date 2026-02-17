import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/utilities/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function SourceCodeLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  return (
    <ExternalLink
      className="download"
      href={app.sourceCode}
      title={t("app.sourceCode")}
      data-goatcounter-click={`/app/download${
        contribute(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-code fa-fw"></i>
    </ExternalLink>
  );
}
