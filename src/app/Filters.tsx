import React, { useMemo, useState } from "react";

import { Toggle } from "@components/ui/toggle";
import { useAppsData } from "@hooks/useAppsData";
import { chain } from "lodash";
import { useTranslation } from "react-i18next";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { useNavigate, useSearchParams } from "react-router";
import { useCurrentRoute } from "@hooks/useCurrentRoute";
import { upperCase } from "@shared/utils/string";

export function Filters() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentRoute = useCurrentRoute();
  const [searchParams] = useSearchParams();

  const { apps } = useAppsData();

  const [showMorePlatforms, setShowMorePlatforms] = useState(false);

  const platforms = usePlatformUrlParam();
  const platformsUp = upperCase(platforms);

  const mainPlatforms: [string, () => string][] = [
    ["WEB", () => "Web"],
    ["ANDROID", () => "Android"],
    ["IOS", () => "iOS"],
    ["LINUX", () => "Linux"],
    ["MACOS", () => "MacOS"],
    ["WINDOWS", () => "Windows"],
  ];

  const secondPlatforms = useMemo(() => {
    return (
      chain(apps)
        // based on app meta data
        .flatMap((app) => app.platform)

        // show them with most apps
        .groupBy((p) => p)
        .sortBy((p) => p.length)
        .reverse()

        // show max 20 platforms (main + second = 20)
        .take(20)

        // exclude the main platforms
        .map((p) => [p[0].toUpperCase(), () => p[0]] as const)
        .filter((p) => !mainPlatforms.find((mp) => mp[0] === p[0]))

        // sort by alphabet
        .sortBy((p) => p)
        .value()
    );
  }, [apps]);

  const shownPlatforms = !showMorePlatforms
    ? [
        ...mainPlatforms,
        ...secondPlatforms.filter((p) => platformsUp.find((cp) => cp === p[0])),
      ]
    : [...mainPlatforms, ...secondPlatforms];

  return (
    <div className="mx-8 flex items-center gap-2 overflow-y-auto py-3 md:mx-18">
      {shownPlatforms.map((platform) => (
        <Toggle
          className="flex-none"
          key={platform[0]}
          size="sm"
          variant="primary"
          pressed={platformsUp.includes(platform[0])}
          onPressedChange={(pressed) => {
            if (!pressed) {
              navigate(
                currentRoute({
                  category: searchParams.get("category") || undefined,
                  platforms: platforms.filter(
                    (p) => p.toUpperCase() !== platform[0],
                  ),
                }),
              );
            } else {
              navigate(
                currentRoute({
                  category: searchParams.get("category") || undefined,
                  platforms: [...platforms, platform[1]()],
                }),
              );
            }
          }}
        >
          {platform[1]()}
        </Toggle>
      ))}

      {!showMorePlatforms && (
        <Toggle
          className="flex-none"
          size="sm"
          variant="primary"
          onPressedChange={() => setShowMorePlatforms(true)}
        >
          {t("filters.morePlatforms")}
        </Toggle>
      )}
    </div>
  );
}
