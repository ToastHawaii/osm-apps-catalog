import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "../../../../../shared/data/App";
import { useGoatCounterEvents } from "../../../../utilities/useGoatCounterEvents";
import { edit } from "../../../../../shared/utilities/filters";

export function ObtainiumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.obtainiumLink) {
    return null;
  }

  return (
    <a
      className="download"
      href={app.install.obtainiumLink}
      target="_blank"
      rel="noreferrer"
      title={t("app.install.obtainium")}
      data-goatcounter-click={`/app/download/obtainium${
        edit(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Download app via Obtainium."
      data-goatcounter-referrer={`/?app=${app.id}`}
    >
      <i
        className="fas fa-gem fa-fw"
        style={{ transform: "rotate(315deg)" }}
      ></i>
    </a>
  );
}
