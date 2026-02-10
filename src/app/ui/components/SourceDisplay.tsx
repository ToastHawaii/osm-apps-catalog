import React from "react";
import { useTranslation } from "react-i18next";
import { SourceDisplayText } from "../components/SourceDisplayText";
import { App } from "@shared/data/App";
import { ExternalLink } from "@components/common/ExternalLink";

export function SourceDisplay({ app }: { app: App }) {
  const { t } = useTranslation();
  return (
    <>
      {app.source
        .map((s) => (
          <ExternalLink
            key={s.url}
            className="whitespace-nowrap"
            href={s.url}
            title={
              t("app.source.lastChange", {
                date: s.lastChange,
              }) +
              (s.firstCrawled
                ? "\n" + t("app.source.firstCrawled", { added: s.firstCrawled })
                : "")
            }
          >
            <SourceDisplayText name={s.name} />
          </ExternalLink>
        ))
        .reduce((prev, curr) => (
          <>
            {prev}, {curr}
          </>
        ))}
      {!app.source.find((s) => s.name === "Software" || s.name === "Layer") && (
        <>
          {", "}
          <ExternalLink
            className="whitespace-nowrap"
            variant="muted"
            href={
              "https://wiki.openstreetmap.org/w/index.php?title=" +
              encodeURIComponent(app.name) +
              "&veaction=edit&preload=Osm_Apps_Catalog%2Fnew"
            }
          >
            <SourceDisplayText name={"Software"} create />
          </ExternalLink>
        </>
      )}
      {!app.source.find((s) => s.name === "Wikidata") && (
        <>
          {", "}
          <ExternalLink
            className="whitespace-nowrap"
            variant="muted"
            href={
              "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
              encodeURIComponent(app.name)
            }
          >
            <SourceDisplayText name={"Wikidata"} create />
          </ExternalLink>
        </>
      )}
    </>
  );
}
