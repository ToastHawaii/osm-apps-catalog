import React from "react";
import { useTranslation } from "react-i18next";
import { SourceDisplayText } from "../components/SourceDisplayText";
import { App } from "@shared/data/App";

export function SourceDisplay({ app }: { app: App }) {
  const { t } = useTranslation();
  return (
    <>
      {app.source
        .map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            title={
              t("app.source.lastChange", {
                date: s.lastChange,
              }) +
              (s.firstCrawled
                ? "\n" + t("app.source.firstCrawled", { added: s.firstCrawled })
                : "")
            }
            style={{ whiteSpace: "nowrap" }}
          >
            <SourceDisplayText name={s.name} />
          </a>
        ))
        .reduce((prev, curr) => (
          <>
            {prev}, {curr}
          </>
        ))}
      {!app.source.find((s) => s.name === "Software" || s.name === "Layer") && (
        <>
          {", "}
          <a
            className="link-create"
            href={
              "https://wiki.openstreetmap.org/w/index.php?title=" +
              encodeURIComponent(app.name) +
              "&veaction=edit&preload=Osm_Apps_Catalog%2Fnew"
            }
            target="_blank"
            rel="noreferrer"
            style={{ whiteSpace: "nowrap" }}
          >
            <SourceDisplayText name={"Software"} create />
          </a>
        </>
      )}
      {!app.source.find((s) => s.name === "Wikidata") && (
        <>
          {", "}
          <a
            className="link-create"
            href={
              "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
              encodeURIComponent(app.name)
            }
            target="_blank"
            rel="noreferrer"
            style={{ whiteSpace: "nowrap" }}
          >
            <SourceDisplayText name={"Wikidata"} create />
          </a>
        </>
      )}
    </>
  );
}
