import React from "react";
import { App } from "../../../../../shared/data/App";
import { useTranslation } from "react-i18next";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function ForumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.forum) {
    return null;
  }

  return (
    <a
      className="community"
      href={app.community.forum}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.forum")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-comments fa-fw"></i>
    </a>
  );
}
