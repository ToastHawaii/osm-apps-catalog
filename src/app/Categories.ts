import { App } from "@shared/data/App";
import { display, mobile, navigation, edit } from "@shared/utilities/filters";
import { TFunction } from "i18next";
import { chain } from "lodash";

export function Categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
) {
  return [
    {
      id: "universalMapApps",
      name: () => t("category.universalMapApps", "Universal map apps"),
      nextIndex: () => apps.findIndex((app) => display(app)),
    },
    {
      id: "latestUpdates",
      name: () => t("category.latestUpdates", "Latest updates"),
      nextIndex: function () {
        const latest = chain(apps)
          .sortBy((a) => a.source[0].lastChange || "")
          .sortBy((a) => a.lastRelease || "")
          .reverse()
          .take(1)
          .value();
        return apps.findIndex((app) => app.id === latest[0].id);
      },
    },
    {
      id: "mobile",
      name: () => t("category.mobile", "To go"),
      nextIndex: () => apps.findIndex((app) => mobile(app)),
    },
    {
      id: "navigation",
      name: () => t("category.navigation", "Find your way"),
      nextIndex: () => apps.findIndex((app) => navigation(app)),
    },
    {
      id: "edit",
      name: () => t("category.edit", "Improve the map"),
      nextIndex: () => apps.findIndex((app) => edit(app)),
    },
    {
      id: "foss",
      name: () => t("category.foss", "Free and opensource"),
      nextIndex: () => apps.findIndex((app) => app.libre),
    },
  ];
}
