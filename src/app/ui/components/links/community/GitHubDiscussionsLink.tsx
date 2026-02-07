import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function GitHubDiscussionsLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.githubDiscussions) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={`https://github.com/${app.community.githubDiscussions}/discussions`}
      title={t("app.community.githubDiscussions")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-github fa-fw"></i>
    </ExternalLink>
  );
}
