import React from "react";
import { useTranslation } from "react-i18next";
import { App } from "@shared/data/App";
import { useGoatCounterEvents } from "../../../../../hooks/useGoatCounterEvents";
import { contribute } from "@shared/utils/filters";
import { ExternalLink } from "@components/common/ExternalLink";

export function ObtainiumLink({ app }: { app: App }) {
  const { t } = useTranslation();

  useGoatCounterEvents();

  if (!app.install.obtainiumLink) {
    return null;
  }

  return (
    <ExternalLink
      className="download"
      href={app.install.obtainiumLink}
      title={t("app.install.obtainium")}
      data-goatcounter-click={`/app/download${
        contribute(app) ? "?category=edit" : ""
      }`}
      data-goatcounter-title="Goes to a download page of an app."
      data-goatcounter-referrer="https://osm-apps.org/"
    >
      <i
        className="fas fa-gem fa-fw"
        style={{ transform: "rotate(315deg)" }}
      ></i>
    </ExternalLink>
  );
}
