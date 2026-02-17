import { ExternalLink } from "@components/common/ExternalLink";
import { App } from "@shared/data/App";
import { qa, changeset } from "@shared/utilities/filters";
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
      id: "changeset",
      name: () => t("category.changeset"),
      description: (numberOfApps: number) => (
        <Description category="changeset" numberOfApps={numberOfApps} />
      ),
      nextIndex: () => apps.findIndex((app) => changeset(app)),
    },
    {
      id: "qa",
      name: () => t("category.qa"),
      description: (numberOfApps: number) => (
        <Description category="qa" numberOfApps={numberOfApps} />
      ),
      nextIndex: () => apps.findIndex((app) => qa(app)),
    },
    {
      id: "focus",
      name: () => t("category.focus"),
      description: (numberOfApps: number) => (
        <Description category="focus" numberOfApps={numberOfApps} />
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
      nextIndex: () => apps.findIndex((app) => app.libre),
    },
  ];
}
