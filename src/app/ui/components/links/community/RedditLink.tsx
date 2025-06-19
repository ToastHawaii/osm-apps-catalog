import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function RedditLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.reddit) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://www.reddit.com/r/${app.community.reddit}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.reddit")}
      data-goatcounter-click="/app/community/reddit"
      data-goatcounter-title="Follow Reddit link from app."
    >
      <i className="fab fa-reddit fa-fw"></i>
    </a>
  );
}
