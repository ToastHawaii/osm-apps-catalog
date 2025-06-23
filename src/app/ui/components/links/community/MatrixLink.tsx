import React from "react";
import { useTranslation } from "react-i18next";
import { getMatrix } from "../../../utilities/getMatrix";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";

export function MatrixLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  const link = getMatrix(app.community.matrix, app.community.irc);

  if (!link) {
    return null;
  }

  return (
    <a
      className="community"
      href={`https://matrix.to/#/${link}`}
      target="_blank"
      rel="noreferrer"
      title={t("app.community.matrix")}
      data-goatcounter-click="/app/community/matrix"
      data-goatcounter-title="Follow Matrix room link from app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i>[m]</i>
    </a>
  );
}
