import React from "react";
import { App } from "@shared/data/App";
import { useTranslation } from "react-i18next";
import { useGoatCounterEvents } from "../../../../../lib/utils/useGoatCounterEvents";

export function ForumTagLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.forumTag) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://community.openstreetmap.org/tag/${app.community.forumTag}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.forumTag")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-tag fa-fw"></i>
    </a>
  );
}
