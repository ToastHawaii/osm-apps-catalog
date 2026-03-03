import { getUserRegion } from "@lib/utils/getUserRegion";
import { App } from "@shared/data/App";
import {
  display,
  offlineUse,
  navigation,
  calcRoute,
  edit,
  trackRec,
  hiking,
  cycling,
  publicTransport,
} from "@shared/utils/filters";
import { equalsYes } from "@shared/utils/string";
import { TFunction } from "i18next";

export function Categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
) {
  return [
    {
      id: "universalMapApps",
      name: () => t("category.universalMapApps"),
      description: (numberOfApps: number) =>
        t("category.universalMapApps.description", { numberOfApps }),
      nextIndex: () =>
        apps.findIndex(
          (app) =>
            /// universal maps: main goal is display map data
            display(app) &&
            equalsYes(...(app.map?.showWebsite || [])) &&
            equalsYes(...(app.map?.showOpeningHours || [])) &&
            // can calculate a route
            equalsYes(...(app.routing?.calculateRoute || [])) &&
            // can find a location
            equalsYes(...(app.navigating?.findLocation || [])) &&
            // and support some contributing
            equalsYes(
              ...[
                ...(app.editing?.addPOI || []),
                ...(app.editing?.addWay || []),

                ...(app.editing?.createNotes || []),

                ...(app.editing?.editPOI || []),
                ...(app.editing?.editGeom || []),
                ...(app.editing?.editTags || []),
              ],
            ),
        ),
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
      id: "cycling",
      name: () => t("category.cycling"),
      description: (numberOfApps: number) =>
        t("category.cycling.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => cycling(app)),
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
      id: "edit",
      name: () => t("category.edit"),
      description: (numberOfApps: number) =>
        t("category.edit.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => edit(app)),
    },
    {
      id: "trackRec",
      name: () => t("category.trackRec"),
      description: (numberOfApps: number) =>
        t("category.trackRec.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => trackRec(app)),
    },
  ];
}
