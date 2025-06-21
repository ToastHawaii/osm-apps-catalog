import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function TelegramLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

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
      data-goatcounter-click="/app/community/telegram"
      data-goatcounter-title="Follow Telegram group link from app."
      data-goatcounter-referrer={`https://osm-apps.org/app/${app.id}`}
    >
      <i className="fab fa-telegram fa-fw"></i>
    </a>
  );
}
