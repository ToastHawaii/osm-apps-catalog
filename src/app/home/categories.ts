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
  diversity,
  contributePhoto,
} from "@shared/lib/filters";
import { TFunction } from "i18next";
import { featureFlags } from "../../featureFlags";
import { Category } from "@lib/Category";
import {
  DefaultHide,
  DefaultHierarchyForEdit,
  DefaultHierarchyForNavigation,
  DefaultHierarchyForRouting,
  DefaultPrioritize,
  DefaultTagsReorganization,
} from "@lib/tagsReorganizer";

export function categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
): Category[] {
  return [
    {
      id: "universalMapApps",
      name: () => t("category.universalMapApps"),
      description: (numberOfApps: number) =>
        t("category.universalMapApps.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => universalMapApps(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "hiking",
      name: () => t("category.hiking"),
      description: (numberOfApps: number) =>
        t("category.hiking.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => hiking(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,
          "feature.routing-hike",
          "feature.routing-foot",
          "feature.offline-routing",
          "feature.routing-manual",
          "feature.location-search",
        ],
        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ["feature.routing-hike", "feature.routing-foot"],

          ["feature.offline-routing", "feature.routing"],
        ],
        hide: [
          ...DefaultHide,
          "feature.routing",
          "feature.routing-bike",
          "feature.routing-car",
          "feature.routing-motorbike",
        ],
      },
    },
    {
      id: "publicTransport",
      name: () => t("category.publicTransport"),
      description: (numberOfApps: number) =>
        t("category.publicTransport.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => publicTransport(app)),
      tagsReorganization: {
        prioritize: [...DefaultPrioritize, "feature.routing-publicTransport"],

        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],

        hide: DefaultHide,
      },
    },
    {
      id: "tourism",
      name: () => t("category.tourism"),
      description: (numberOfApps: number) =>
        t("category.tourism.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => tourism(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "food",
      name: () => t("category.food"),
      description: (numberOfApps: number) =>
        t("category.food.description", { numberOfApps }),
      nextIndex: featureFlags.showFoodCategory
        ? () => apps.findIndex((app) => food(app))
        : // currently ignored
          () => -1,
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "cycling",
      name: () => t("category.cycling"),
      description: (numberOfApps: number) =>
        t("category.cycling.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => cycling(app)),
      tagsReorganization: {
        prioritize: [...DefaultPrioritize, "feature.routing-bike"],

        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ["feature.offline-routing", "feature.routing"],
        ],

        hide: [
          ...DefaultHide,
          "feature.routing",
          "feature.routing-publicTransport",
          "feature.routing-hike",
          "feature.routing-foot",
          "feature.routing-car",
          "feature.routing-motorbike",
          "feature.routing-wheelchair",
        ],
      },
    },
    {
      id: "offlineUse",
      name: () => t("category.mobile"),
      description: (numberOfApps: number) =>
        t("category.mobile.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => offlineUse(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,
          "feature.offline-maps",
          "feature.offline-routing",
          "feature.offline-edit",
        ],
        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],
        hide: DefaultHide,
      },
    },
    {
      id: "navigation",
      name: () => t("category.navigation"),
      description: (numberOfApps: number) =>
        t("category.navigation.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => navigation(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "calcRoute",
      name: () => t("category.calcRoute"),
      description: (numberOfApps: number) =>
        t("category.calcRoute.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => calcRoute(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,

          "feature.offline-routing",
          "feature.routing-manual",
          "feature.routing-publicTransport",
          "feature.routing-hike",
          "feature.routing-foot",
          "feature.routing-bike",
          "feature.routing-car",
          "feature.routing-motorbike",
          "feature.routing-wheelchair",
        ],
        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ["feature.offline-routing", "feature.routing"],
        ],
        hide: [...DefaultHide, "feature.routing"],
      },
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
          country: this.loadData?.()?.label,
        });
      },
      description: function (numberOfApps: number) {
        return t("category.country.description", {
          numberOfApps,
          country: this.loadData?.()?.label,
        });
      },
      nextIndex: function () {
        const country = this.loadData?.()?.full?.toUpperCase();
        if (!country) {
          return -1;
        }
        return apps.findIndex((app) =>
          app.cache.coverage.some((a) => a.startsWith(country)),
        );
      },
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "winterSport",
      name: () => t("category.winterSport"),
      description: (numberOfApps: number) =>
        t("category.winterSport.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => winterSport(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "wheelchair",
      name: () => t("category.wheelchair"),
      description: (numberOfApps: number) =>
        t("category.wheelchair.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => wheelchair(app)),
      tagsReorganization: {
        prioritize: [...DefaultPrioritize, "feature.routing-wheelchair"],

        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],

        hide: [...DefaultHide, "feature.accessibility-wheelchair"],
      },
    },
    {
      id: "divers",
      name: () => t("category.diversity"),
      description: (numberOfApps: number) =>
        t("category.diversity.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => diversity(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,
          "feature.accessibility-blind",
          "feature.routing-wheelchair",
          "feature.accessibility-wheelchair",
        ],

        hierarchy: [
          ["feature.routing-wheelchair", "feature.accessibility-wheelchair"],

          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],

        hide: DefaultHide,
      },
    },
    {
      id: "edit",
      name: () => t("category.edit"),
      description: (numberOfApps: number) =>
        t("category.edit.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => edit(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,
          "feature.edit-map",
          "feature.offline-edit",
          "feature.create-notes",

          "feature.record-track",
          "feature.upload-track",
        ],

        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],

        hide: DefaultHide,
      },
    },
    {
      id: "contributePhoto",
      name: () => t("category.contributePhoto"),
      description: (numberOfApps: number) =>
        t("category.contributePhoto.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => contributePhoto(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "trackRec",
      name: () => t("category.trackRec"),
      description: (numberOfApps: number) =>
        t("category.trackRec.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => trackRec(app)),
      tagsReorganization: {
        prioritize: [
          ...DefaultPrioritize,

          "feature.upload-track",

          "feature.edit-map",
          "feature.offline-edit",
          "feature.create-notes",
        ],

        hierarchy: [
          ...DefaultHierarchyForNavigation,

          ...DefaultHierarchyForEdit,

          ...DefaultHierarchyForRouting,
        ],

        hide: [...DefaultHide, "feature.record-track"],
      },
    },
    {
      id: "print",
      name: () => t("category.print"),
      description: (numberOfApps: number) =>
        t("category.print.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => print(app)),
      tagsReorganization: DefaultTagsReorganization,
    },
  ];
}
