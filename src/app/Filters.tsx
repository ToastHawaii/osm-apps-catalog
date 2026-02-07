import React, { useMemo, useState } from "react";

import { Toggle } from "@components/ui/toggle";
import { useAppsData } from "@hooks/useAppsData";
import { chain } from "lodash";
import { useTranslation } from "react-i18next";
import { usePlatformUrlParam } from "@hooks/usePlatformUrlParam";
import { useNavigate, useSearchParams } from "react-router";
import { useCurrentRoute } from "@hooks/useCurrentRoute";

export function Filters() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentRoute = useCurrentRoute();
  const [searchParams] = useSearchParams();

  const { apps } = useAppsData();

  const [showMorePlatforms, setShowMorePlatforms] = useState(false);

  const platforms = usePlatformUrlParam();
  const currentPlatforms = platforms.map((t) => t.toLowerCase());

  const mainPlatforms: [string, () => string][] = [
    ["web", () => "Web"],
    ["android", () => "Android"],
    ["ios", () => "iOS"],
    ["linux", () => "Linux"],
    ["macos", () => "MacOS"],
    ["windows", () => "Windows"],
  ];

  // based on app meta data, collect all possible values and exclude the main platforms
  const secondPlatforms = useMemo(() => {
    return chain(apps)
      .flatMap((app) => app.platform)
      .groupBy((p) => p)
      .sortBy((p) => p)
      .sortBy((p) => p.length)
      .reverse()
      .map((p) => [p[0].toLowerCase(), () => p[0]] as const)
      .filter((p) => !mainPlatforms.find((mp) => mp[0] === p[0]))
      .value();
  }, [apps]);

  const shownPlatforms = !showMorePlatforms
    ? [
        ...mainPlatforms,
        ...secondPlatforms.filter((p) =>
          currentPlatforms.find((cp) => cp === p[0]),
        ),
      ]
    : [...mainPlatforms, ...secondPlatforms];

  return (
    <div className="mx-8 flex items-center gap-2 overflow-y-auto py-3 md:mx-18">
      {shownPlatforms.map((platform) => (
        <Toggle
          className="flex-none"
          key={platform[0]}
          size="sm"
          variant="outline"
          pressed={currentPlatforms.includes(platform[0])}
          onPressedChange={(pressed) => {
            if (!pressed) {
              navigate(
                currentRoute({
                  category: searchParams.get("category") || (undefined as any),
                  platforms: currentPlatforms.filter((p) => p !== platform[0]),
                }),
              );
            } else {
              navigate(
                currentRoute({
                  category: searchParams.get("category") || (undefined as any),
                  platforms: [...currentPlatforms, platform[0]],
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
          variant="outline"
          onPressedChange={() => setShowMorePlatforms(true)}
        >
          {t("filters.morePlatforms")}
        </Toggle>
      )}
    </div>
  );
}
