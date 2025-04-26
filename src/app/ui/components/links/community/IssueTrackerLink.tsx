import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function IssueTrackerLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.community.issueTracker) {
    return null;
  }

  return (
    <a
      className="community"
      href={app.community.issueTracker}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.issueTracker")}
    >
      <i className="fas fa-list fa-fw"></i>
    </a>
  );
}
