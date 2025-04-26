import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function BlueskyLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.community.bluesky) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://bsky.app/profile/${app.community.bluesky}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.bluesky")}
    >
      <img src="/icons/bluesky.svg" height="18px" alt="Bluesky" />
    </a>
  );
}
