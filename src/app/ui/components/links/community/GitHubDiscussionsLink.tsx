import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function GitHubDiscussionsLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.githubDiscussions) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://github.com/${app.community.githubDiscussions}/discussions`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.githubDiscussions")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-github fa-fw"></i>
    </a>
  );
}
