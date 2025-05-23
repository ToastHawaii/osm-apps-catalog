import React from "react";
import { useTranslation } from "react-i18next";
import { getMatrix } from "../../../utilities/getMatrix";
import { App } from "../../../../../shared/data/App";

export function MatrixLink({ app }: { app: App }) {
  const { t } = useTranslation();

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
    >
      <i>[m]</i>
    </a>
  );
}
