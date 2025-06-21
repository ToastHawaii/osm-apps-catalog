import React from "react";
import { useTranslation } from "react-i18next";
import { getMastodon } from "../../../utilities/getMastodon";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function MastodonLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.mastodon) {
    return null;
  }

  return (
    <a
      className="community"
      href={getMastodon(app.community.mastodon)}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.mastodon")}
      data-goatcounter-click="/app/community/mastodon"
      data-goatcounter-title="Follow Mastodon link from app."
    >
      <i className="fab fa-mastodon fa-fw"></i>
    </a>
  );
}
