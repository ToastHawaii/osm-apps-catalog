import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";

export function SlackLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.community.slack) {
    return null;
  }

  return (
    <a
      className="community"
      href={app.community.slack}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.slack")}
    >
      <i className="fab fa-slack-hash fa-fw"></i>
    </a>
  );
}
