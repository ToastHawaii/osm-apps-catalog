import React from "react";
import { useTranslation } from "react-i18next";
import { App as AppData } from "@shared/data/App";
import { AppCompact } from "@components/common/AppCompact";
import { DefaultTagsReorganization } from "@lib/tagsReorganizer";

export function RelatedApps({
  findSimilarApps,
}: {
  findSimilarApps: () => AppData[];
}) {
  const { t } = useTranslation();
  const similarApps = findSimilarApps();
  return (
    <>
      {similarApps.length > 0 && (
        <>
          <h2 className="col-span-full px-2 pt-4 text-2xl font-semibold">
            {t("relatedApps", {
              numberOfApps: similarApps.length,
            })}
          </h2>
          {similarApps.map((app) => (
            <AppCompact
              key={app.id}
              app={app}
              score
              tags
              tagsReorganization={DefaultTagsReorganization}
            />
          ))}
        </>
      )}
    </>
  );
}
