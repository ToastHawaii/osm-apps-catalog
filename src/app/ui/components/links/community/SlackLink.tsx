import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../lib/utils/useGoatCounterEvents";

export function SlackLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.slack) {
    return null;
  }

  return (
    <a
      className="community"
      href={app.community.slack}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.slack")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-slack-hash fa-fw"></i>
    </a>
  );
}
