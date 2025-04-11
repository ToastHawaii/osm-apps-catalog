import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../data/App";

export function TelegramLink({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.community.telegram) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://telegram.me/${app.community.telegram}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.telegram")}
    >
      <i className="fab fa-telegram fa-fw"></i>
    </a>
  );
}
