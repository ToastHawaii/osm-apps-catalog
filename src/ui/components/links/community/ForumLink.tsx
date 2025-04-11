import React from "react";
import { App } from "../../../../data/App";
import { useTranslation } from "react-i18next";

export function ForumLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i className="fas fa-comments fa-fw"></i>
    </a>
  );
}
