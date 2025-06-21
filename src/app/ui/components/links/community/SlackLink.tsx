import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

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
      data-goatcounter-click="/app/community/slack"
      data-goatcounter-title="Follow Slack link from app."
      data-goatcounter-referrer={`/?app=${app.id}`}
    >
      <i className="fab fa-slack-hash fa-fw"></i>
    </a>
  );
}
