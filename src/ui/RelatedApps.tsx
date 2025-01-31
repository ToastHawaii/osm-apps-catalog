import React from "react";
import { useTranslation } from "react-i18next";
import { App as AppData } from "../data/App";
import { List } from "./views/List";

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
          <h2>
            {t("relatedApps", {
              numberOfApps: similarApps.length,
            })}
          </h2>
          {similarApps.map((a) => (
            <List key={a.id} app={a} open={false} />
          ))}
        </>
      )}
    </>
  );
}
