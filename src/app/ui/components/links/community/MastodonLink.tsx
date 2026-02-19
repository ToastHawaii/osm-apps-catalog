import React from "react";
import { useTranslation } from "react-i18next";
import { getMastodon } from "../../../lib/getMastodon";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function MastodonLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.mastodon) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={getMastodon(app.community.mastodon)}
      title={t("app.community.mastodon")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-mastodon fa-fw"></i>
    </ExternalLink>
  );
}
