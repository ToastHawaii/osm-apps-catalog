import React from "react";
import { useTranslation } from "react-i18next";
import { getMastodon } from "../../../utilities/getMastodon";
import { App } from "../../../../../shared/data/App";

export function MastodonLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fab fa-mastodon fa-fw"></i>
    </a>
  );
}
