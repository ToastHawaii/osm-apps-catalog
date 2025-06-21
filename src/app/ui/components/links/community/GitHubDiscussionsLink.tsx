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
      data-goatcounter-click="/app/community/githubDiscussions"
      data-goatcounter-title="Follow GitHub Discussions from app."
      data-goatcounter-referrer={`osm-apps.org/?app=${app.id}`}
    >
      <i className="fab fa-github fa-fw"></i>
    </a>
  );
}
