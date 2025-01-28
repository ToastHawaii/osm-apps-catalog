import React from "react";
import { useTranslation } from "react-i18next";
import { App as AppData } from "../../data/App";
import { List } from "../views/List";

const notFoundAppsTitle = [
  "MapComplete",
  "uMap",
  "OpenStreetBrowser",
  "Overpass turbo",
];

export function NotFoundApps({ apps }: { apps: AppData[] }) {
  const { t } = useTranslation();
  let notFound = notFoundAppsTitle
    .map((f) => apps.find((a) => a.name === f))
    .filter((a) => a) as AppData[];

  return (
    <>
      <h2>{t("notFound")}</h2>
      <p style={{ margin: "5px 10px 10px" }}>{t("notFound.desc")}</p>
      {notFound.map((a) => (
        <List key={a.id} app={a} open={false} />
      ))}
    </>
  );
}
