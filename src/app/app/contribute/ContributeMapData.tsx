import { Location05Icon } from "@hugeicons/core-free-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";

export function ContributeMapData({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.contributeMapData.title")}
      description={t("app.contribute.activity.contributeMapData.description", {
        app: app.name,
      })}
      icon={Location05Icon}
      link="https://wiki.openstreetmap.org/wiki/Contribute_map_data"
      goatcounter={{
        click: "/osm/contribute-map-data",
        title: "Goes to OpenStreetMap contribute map data page.",
      }}
    />
  );
}
