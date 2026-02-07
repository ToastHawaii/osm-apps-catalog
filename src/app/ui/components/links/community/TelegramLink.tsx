import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function TelegramLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.telegram) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={`https://telegram.me/${app.community.telegram}`}
      title={t("app.community.telegram")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-telegram fa-fw"></i>
    </ExternalLink>
  );
}
