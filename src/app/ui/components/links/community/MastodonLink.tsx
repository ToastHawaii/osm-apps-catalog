import React from "react";
import { useTranslation } from "react-i18next";
import { getMastodon } from "@shared/utils/links/getMastodon";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { ExternalLink } from "@components/common/ExternalLink";

export function MastodonLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getMastodon(app.community.mastodon);

  if (!link) {
    return null;
  }

  return (
    <ExternalLink
      className="community"
      href={link}
      title={t("app.community.mastodon")}
      data-goatcounter-click="/app/community"
      data-goatcounter-title="Follows a community link of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i className="fab fa-mastodon fa-fw"></i>
    </ExternalLink>
  );
}
