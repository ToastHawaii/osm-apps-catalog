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
            href={s.url}
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
            className="link-create"
            href={
              "https://wiki.openstreetmap.org/w/index.php?title=" +
              encodeURIComponent(app.name) +
              "&veaction=edit&preload=Osm_Apps_Catalog%2Fnew"
            }
            style={{ whiteSpace: "nowrap" }}
          >
            <SourceDisplayText name={"Software"} create />
          </ExternalLink>
        </>
      )}
      {!app.source.find((s) => s.name === "Wikidata") && (
        <>
          {", "}
          <ExternalLink
            className="link-create"
            href={
              "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
              encodeURIComponent(app.name)
            }
            style={{ whiteSpace: "nowrap" }}
          >
            <SourceDisplayText name={"Wikidata"} create />
          </ExternalLink>
        </>
      )}
    </>
  );
}
