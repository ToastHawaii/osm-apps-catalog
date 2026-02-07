import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function BlueskyLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.bluesky) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={`https://bsky.app/profile/${app.community.bluesky}`}
      title={t("app.community.bluesky")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <img src="/icons/bluesky.svg" style={{ height: "18px" }} alt="Bluesky" />
    </ExternalLink>
  );
}
