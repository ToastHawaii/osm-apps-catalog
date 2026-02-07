import React from "react";
import { App } from "@shared/data/App";
import { useTranslation } from "react-i18next";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function ForumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.forum) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={app.community.forum}
      title={t("app.community.forum")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fas fa-comments fa-fw"></i>
    </ExternalLink>
  );
}
