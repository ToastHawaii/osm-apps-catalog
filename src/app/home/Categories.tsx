import { ExternalLink } from "@components/common/ExternalLink";
import { getUserRegion } from "@lib/utils/getUserRegion";
import { App } from "@shared/data/App";
import {
  display,
  mobile,
  navigation,
  calcRoute,
  edit,
  trackRec,
} from "@shared/utils/filters";
import { equalsYes } from "@shared/utils/string";
import { TFunction } from "i18next";
import React from "react";
import { Trans } from "react-i18next";

function Description({
  category,
  values,
}: {
  category: string;
  values: Record<string, string | number | undefined>;
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
      id: "universalMapApps",
      name: () => t("category.universalMapApps"),
      description: (numberOfApps: number) => (
        <Description category="universalMapApps" values={{ numberOfApps }} />
      ),
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
      id: "mobile",
      name: () => t("category.mobile"),
      description: (numberOfApps: number) => (
        <Description category="mobile" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => mobile(app)),
    },
    {
      id: "navigation",
      name: () => t("category.navigation"),
      description: (numberOfApps: number) => (
        <Description category="navigation" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => navigation(app)),
    },
    {
      id: "calcRoute",
      name: () => t("category.calcRoute"),
      description: (numberOfApps: number) => (
        <Description category="calcRoute" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => calcRoute(app)),
    },
    {
      id: "edit",
      name: () => t("category.edit"),
      description: (numberOfApps: number) => (
        <Description category="edit" values={{ numberOfApps }} />
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
      description: function (numberOfApps: number) {
        return (
          <Description
            category="country"
            values={{ numberOfApps, country: this.loadData()?.label }}
          />
        );
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
      id: "trackRec",
      name: () => t("category.trackRec"),
      description: (numberOfApps: number) => (
        <Description category="trackRec" values={{ numberOfApps }} />
      ),
      nextIndex: () => apps.findIndex((app) => trackRec(app)),
    },
  ];
}
