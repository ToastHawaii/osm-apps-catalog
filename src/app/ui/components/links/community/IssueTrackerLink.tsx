import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function IssueTrackerLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

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
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of a app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-list fa-fw"></i>
    </a>
  );
}
