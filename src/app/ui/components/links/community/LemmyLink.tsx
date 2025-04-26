import React from "react";
import { useTranslation } from "react-i18next";
import { getLemmy } from "../../../utilities/getLemmy";
import { App } from "../../../../../shared/data/App";

export function LemmyLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <img src="/icons/lemmy.svg" alt="Lemmy" height="18px" />
    </a>
  );
}
