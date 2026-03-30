import {
  DefaultHierarchyForEdit,
  DefaultHierarchyForNavigation,
  DefaultHierarchyForRouting,
  DefaultPrioritize,
  DefaultTagsReorganization,
} from "@lib/tagsReorganizer";
import { App } from "@shared/data/App";
import {
  qa,
  changeset,
  library,
  convert,
  isochrone,
  indoor,
  maps3D,
  resolveNotes,
} from "@shared/lib/filters";
import { TFunction } from "i18next";
import { chain, sortBy } from "lodash";

const TechDefaultTagsReorganization = {
  ...DefaultTagsReorganization,
  hide: [],
};

export function categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
) {
  return [
    {
      id: "focus",
      name: () => t("category.focus"),
      description: (numberOfApps: number) =>
        t("category.focus.description", { numberOfApps }),
      sorted: () =>
        chain(apps)
          .sortBy((a) => a.lastFocus)
          .reverse()
          .take(10),
      getAll: function () {
        return this.sorted().value();
      },
      nextIndex: function () {
        const latest = this.sorted().take(1).value();
        return apps.findIndex((app) => app.id === latest[0].id);
      },
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "newAdditions",
      name: () => t("category.newAdditions"),
      description: (numberOfApps: number) =>
        t("category.newAdditions.description", { numberOfApps }),
      sorted: () =>
        chain(apps)
          .sortBy((a) => {
            return sortBy(a.source, (s) => s.firstCrawled)[0].firstCrawled;
          })
          .reverse(),
      getAll: function () {
        return this.sorted().value();
      },
      nextIndex: function () {
        const latest = this.sorted().take(1).value();
        return apps.findIndex((app) => app.id === latest[0].id);
      },
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "latest",
      name: () => t("category.latestUpdates"),
      description: (numberOfApps: number) =>
        t("category.latestUpdates.description", { numberOfApps }),
      sorted: () =>
        chain(apps)
          .sortBy((a) => a.source[0].lastChange || "")
          .sortBy((a) => a.lastRelease || "")
          .reverse(),
      getAll: function () {
        return this.sorted().value();
      },
      nextIndex: function () {
        const latest = this.sorted().take(1).value();
        return apps.findIndex((app) => app.id === latest[0].id);
      },
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "library",
      name: () => t("category.library"),
      description: (numberOfApps: number) =>
        t("category.library.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => library(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "changeset",
      name: () => t("category.changeset"),
      description: (numberOfApps: number) =>
        t("category.changeset.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => changeset(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "resolveNotes",
      name: () => t("category.resolveNotes"),
      description: (numberOfApps: number) =>
        t("category.resolveNotes.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => resolveNotes(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "qa",
      name: () => t("category.qa"),
      description: (numberOfApps: number) =>
        t("category.qa.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => qa(app)),
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

        hide: [],
      },
    },
    {
      id: "foss",
      name: () => t("category.foss"),
      description: (numberOfApps: number) =>
        t("category.foss.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => app.libre),
      tagsReorganization: DefaultTagsReorganization,
    },
    {
      id: "convert",
      name: () => t("category.convert"),
      description: (numberOfApps: number) =>
        t("category.convert.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => convert(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "3d",
      name: () => t("category.3d"),
      description: (numberOfApps: number) =>
        t("category.3d.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => maps3D(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "indoor",
      name: () => t("category.indoor"),
      description: (numberOfApps: number) =>
        t("category.indoor.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => indoor(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
    {
      id: "isochrone",
      name: () => t("category.isochrone"),
      description: (numberOfApps: number) =>
        t("category.isochrone.description", { numberOfApps }),
      nextIndex: () => apps.findIndex((app) => isochrone(app)),
      tagsReorganization: TechDefaultTagsReorganization,
    },
  ];
}
