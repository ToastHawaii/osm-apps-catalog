import React from "react";
import { useTranslation } from "react-i18next";
import { getLemmy } from "../../../utilities/getLemmy";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function LemmyLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.community.lemmy) {
    return null;
  }

  return (
    <a
      className="community"
      href={getLemmy(app.community.lemmy)}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.lemmy")}
      data-goatcounter-click="/app/community/lemmy"
      data-goatcounter-title="Follow Lemmy link from app."
      data-goatcounter-referrer={`osm-apps.org/?app=${app.id}`}
    >
      <img src="/icons/lemmy.svg" alt="Lemmy" height="18px" />
    </a>
  );
}
