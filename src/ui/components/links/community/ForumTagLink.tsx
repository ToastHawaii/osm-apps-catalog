import React from "react";
import { App } from "../../../../data/App";
import { useTranslation } from "react-i18next";

export function ForumTagLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fas fa-tag fa-fw"></i>
    </a>
  );
}
