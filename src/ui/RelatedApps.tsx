import React from "react";
import { useTranslation } from "react-i18next";
import { App as AppData } from "../data/App";
import { List } from "./views/List";
import { State } from "../State";

export function RelatedApps({
  findSimilarApps,
  state
}: {
  findSimilarApps: () => AppData[];
  state: State
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
            <List key={a.id} app={a} open={false} state={state} />
          ))}
        </>
      )}
    </>
  );
}
