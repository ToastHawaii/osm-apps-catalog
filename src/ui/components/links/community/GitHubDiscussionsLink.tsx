import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function GitHubDiscussionsLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fab fa-github fa-fw"></i>
    </a>
  );
}
