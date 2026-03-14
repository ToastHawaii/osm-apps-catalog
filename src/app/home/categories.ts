import { getUserRegion } from "@lib/utils/getUserRegion";
import { App } from "@shared/data/App";
import {
  offlineUse,
  navigation,
  calcRoute,
  edit,
  trackRec,
  hiking,
  cycling,
  publicTransport,
  winterSport,
  wheelchair,
  print,
  universalMapApps,
  tourism,
  food,
  divers,
  contributePhoto,
} from "@shared/utils/filters";
import { TFunction } from "i18next";
import { featureFlags } from "../../featureFlags";

export function categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
) {
  return [
    {
      id: "universalMapApps",
      name: () => t("category.universalMapApps"),
      description: (numberOfApps: number) =>
        t("category.universalMapApps.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => universalMapApps(app)),
    },
    {
      id: "hiking",
      name: () => t("category.hiking"),
      description: (numberOfApps: number) =>
        t("category.hiking.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => hiking(app)),
    },
    {
      id: "publicTransport",
      name: () => t("category.publicTransport"),
      description: (numberOfApps: number) =>
        t("category.publicTransport.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => publicTransport(app)),
    },
    {
      id: "tourism",
      name: () => t("category.tourism"),
      description: (numberOfApps: number) =>
        t("category.tourism.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => tourism(app)),
    },
    {
      id: "food",
      name: () => t("category.food"),
      description: (numberOfApps: number) =>
        t("category.food.description", { numberOfApps }),
      nextIndex: featureFlags.showFoodCategory
        ? () => apps.findIndex((app) => food(app))
        : () => -1,
    },
    {
      id: "cycling",
      name: () => t("category.cycling"),
      description: (numberOfApps: number) =>
        t("category.cycling.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => cycling(app)),
    },
    {
      id: "offlineUse",
      name: () => t("category.mobile"),
      description: (numberOfApps: number) =>
        t("category.mobile.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => offlineUse(app)),
    },
    {
      id: "navigation",
      name: () => t("category.navigation"),
      description: (numberOfApps: number) =>
        t("category.navigation.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => navigation(app)),
    },
    {
      id: "calcRoute",
      name: () => t("category.calcRoute"),
      description: (numberOfApps: number) =>
        t("category.calcRoute.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => calcRoute(app)),
    },
    {
      id: "country",
      loadData: () => {
        const userRegion = getUserRegion();
        if (!userRegion) {
          return undefined;
        }
        const parts = userRegion?.split(", ");
        return {
          label: parts[parts?.length - 1],
          full: userRegion,
        };
      },
      name: function () {
        return t("category.country", {
          country: this.loadData()?.label,
        });
      },
      description: function (numberOfApps: number) {
        return t("category.country.description", {
          numberOfApps,
          country: this.loadData()?.label,
        });
      },
      nextIndex: function () {
        const country = this.loadData()?.full?.toUpperCase();
        if (!country) {
          return -1;
        }
        return apps.findIndex((app) =>
          app.cache.coverage.some((a) => a.startsWith(country)),
        );
      },
    },
    {
      id: "winterSport",
      name: () => t("category.winterSport"),
      description: (numberOfApps: number) =>
        t("category.winterSport.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => winterSport(app)),
    },
    {
      id: "wheelchair",
      name: () => t("category.wheelchair"),
      description: (numberOfApps: number) =>
        t("category.wheelchair.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => wheelchair(app)),
    },
    {
      id: "divers",
      name: () => t("category.divers"),
      description: (numberOfApps: number) =>
        t("category.divers.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => divers(app)),
    },
    {
      id: "edit",
      name: () => t("category.edit"),
      description: (numberOfApps: number) =>
        t("category.edit.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => edit(app)),
    },
    {
      id: "contributePhoto",
      name: () => t("category.contributePhoto"),
      description: (numberOfApps: number) =>
        t("category.contributePhoto.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => contributePhoto(app)),
    },
    {
      id: "trackRec",
      name: () => t("category.trackRec"),
      description: (numberOfApps: number) =>
        t("category.trackRec.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => trackRec(app)),
    },
    {
      id: "print",
      name: () => t("category.print"),
      description: (numberOfApps: number) =>
        t("category.print.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => print(app)),
    },
  ];
}
