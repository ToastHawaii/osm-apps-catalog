import { ExternalLink } from "@components/common/ExternalLink";
import { App } from "@shared/data/App";
import {
  qa,
  changeset,
  library,
  convert,
  isochrone,
  indoor,
  maps3D,
} from "@shared/utils/filters";
import { TFunction } from "i18next";
import { chain } from "lodash";
import React from "react";
import { Trans } from "react-i18next";

function Description({
  category,
  values,
}: {
  category: string;
  values: Record<string, string | number>;
}) {
  return (
    <Trans
      i18nKey={`category.${category}.description`}
      values={values}
      components={{
        o: <ExternalLink href="https://openstreetmap.org/" />,
        s: <a href="/docs/score" />,
      }}
    />
  );
}

export function Categories(
  t: TFunction<"translation", undefined>,
  apps: App[],
) {
  return [
    {
      id: "library",
      name: () => t("category.library"),
      description: (numberOfApps: number) => (
        <Description category="library" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => library(app)),
    },
    {
      id: "changeset",
      name: () => t("category.changeset"),
      description: (numberOfApps: number) => (
        <Description category="changeset" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => changeset(app)),
    },
    {
      id: "qa",
      name: () => t("category.qa"),
      description: (numberOfApps: number) => (
        <Description category="qa" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => qa(app)),
    },
    {
      id: "focus",
      name: () => t("category.focus"),
      description: (numberOfApps: number) => (
        <Description category="focus" values={{ numberOfApps }} />
      ),
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
    },
    {
      id: "latest",
      name: () => t("category.latestUpdates"),
      description: (numberOfApps: number) => (
        <Description category="latestUpdates" values={{ numberOfApps }} />
      ),
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
    },
    {
      id: "foss",
      name: () => t("category.foss", "Free and opensource"),
      description: (numberOfApps: number) => (
        <Description category="foss" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => app.libre),
    },
    {
      id: "convert",
      name: () => t("category.convert"),
      description: (numberOfApps: number) => (
        <Description category="convert" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => convert(app)),
    },
    {
      id: "3d",
      name: () => t("category.3d"),
      description: (numberOfApps: number) => (
        <Description category="3d" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => maps3D(app)),
    },
    {
      id: "indoor",
      name: () => t("category.indoor"),
      description: (numberOfApps: number) => (
        <Description category="indoor" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => indoor(app)),
    },
    {
      id: "isochrone",
      name: () => t("category.isochrone"),
      description: (numberOfApps: number) => (
        <Description category="isochrone" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => isochrone(app)),
    },
  ];
}
