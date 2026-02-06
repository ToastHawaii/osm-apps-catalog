import { getUserRegion } from "@lib/utils/getUserRegion";
import { App } from "@shared/data/App";
import { display, mobile, navigation, edit } from "@shared/utilities/filters";
import { equalsYes } from "@shared/utilities/string";
import { TFunction } from "i18next";
import { chain } from "lodash";
import React from "react";
import { Trans } from "react-i18next";

function Description({
  category,
  numberOfApps,
}: {
  category: string;
  numberOfApps: number;
}) {
  return (
    <Trans
      i18nKey={`category.${category}.description`}
      values={{
        numberOfApps,
      }}
      components={{
        o: (
          <a
            href="https://openstreetmap.org/"
            target="_blank"
            rel="noreferrer"
          />
        ),
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
      id: "universalMapApps",
      name: () => t("category.universalMapApps"),
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
      id: "latest",
      name: () => t("category.latestUpdates"),
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
      id: "mobile",
      name: () => t("category.mobile"),
      description: (numberOfApps: number) => (
        <Description category="mobile" numberOfApps={numberOfApps} />
      ),
      nextIndex: () => apps.findIndex((app) => mobile(app)),
    },
    {
      id: "navigation",
      name: () => t("category.navigation"),
      description: (numberOfApps: number) => (
        <Description category="navigation" numberOfApps={numberOfApps} />
      ),
      nextIndex: () => apps.findIndex((app) => navigation(app)),
    },
    {
      id: "edit",
      name: () => t("category.edit"),
      description: (numberOfApps: number) => (
        <Description category="edit" numberOfApps={numberOfApps} />
      ),
      nextIndex: () => apps.findIndex((app) => edit(app)),
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
      id: "foss",
      name: () => t("category.foss", "Free and opensource"),
      nextIndex: () => apps.findIndex((app) => app.libre),
    },
  ];
}
