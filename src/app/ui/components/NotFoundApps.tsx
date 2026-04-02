import React from "react";
import { useTranslation } from "react-i18next";
import { App as AppData } from "@shared/data/App";
import { AppCompact } from "@components/common/AppCompact";

const notFoundAppsTitle = [
  "MapComplete",
  "uMap",
  "OpenStreetBrowser",
  "Overpass turbo",
];

export function NotFoundApps({ apps }: { apps: AppData[] }) {
  const { t } = useTranslation();
  // we want the same order as in the notFoundAppsTitle list
  const notFound = notFoundAppsTitle
    .map((f) => apps.find((a) => a.name === f))
    .filter((a) => a) as AppData[];

  return (
    <>
      <h2 className="col-span-full px-2 pt-4 text-2xl font-semibold">
        {t("notFound")}
      </h2>
      <p className="col-span-full px-2 text-sm text-muted-foreground">
        {t("notFound.desc")}
      </p>
      {notFound.map((app) => (
        <AppCompact key={app.id} app={app} />
      ))}
    </>
  );
}
