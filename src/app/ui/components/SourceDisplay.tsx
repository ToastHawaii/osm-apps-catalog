import React from "react";
import { useTranslation } from "react-i18next";
import { SourceDisplayText } from "../components/SourceDisplayText";
import { App } from "@shared/data/App";
import { ExternalLink } from "@components/common/ExternalLink";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";

export function SourceDisplay({ app }: { app: App }) {
  const { t } = useTranslation();
  return (
    <>
      {app.source
        .map((s) => (
          <Tooltip key={s.url}>
            <TooltipTrigger>
              <ExternalLink className="whitespace-nowrap" href={s.url}>
                <SourceDisplayText name={s.name} />
              </ExternalLink>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                {(s.name === "Software" ||
                  s.name === "Layer" ||
                  s.name === "ServiceItem") && (
                  <>
                    <span className="font-bold">
                      {t("app.contribute.app.editInformation.wikiOsm.edit", {
                        name: s.id,
                      })}
                    </span>
                    <br />
                    <br />
                  </>
                )}
                {s.name === "Wikidata" && (
                  <>
                    <span className="font-bold">
                      {t("app.contribute.app.editInformation.wikidata.edit")}
                    </span>
                    <br />
                    <br />
                  </>
                )}
                {t("app.source.lastChange", {
                  date: s.lastChange,
                })}
                {s.firstCrawled && (
                  <>
                    <br />
                    {t("app.source.firstCrawled", { added: s.firstCrawled })}
                  </>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))
        .reduce((prev, curr) => (
          <>
            {prev}, {curr}
          </>
        ))}
      {!app.source.find((s) => s.name === "Software" || s.name === "Layer") && (
        <>
          {", "}
          <Tooltip>
            <TooltipTrigger>
              <ExternalLink
                className="whitespace-nowrap"
                variant="muted"
                href={
                  "https://wiki.openstreetmap.org/w/index.php?veaction=edit&preload=OSM_Apps_Catalog%2Fnew&editintro=OSM_Apps_Catalog%2Feditintro&summary=Document+an+OSM-related+app+so+that+it+becomes+visible+to+the+OSM+community+and+in+the+OSM+Apps+Catalog.&title=" +
                  encodeURIComponent(app.name)
                }
              >
                <SourceDisplayText name="Software" create />
              </ExternalLink>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-bold">
                {t("app.contribute.app.editInformation.wikiOsm.create", {
                  app: app.name,
                })}
              </span>
            </TooltipContent>
          </Tooltip>
        </>
      )}
      {!app.source.find((s) => s.name === "Wikidata") && (
        <>
          {", "}
          <Tooltip>
            <TooltipTrigger>
              <ExternalLink
                className="whitespace-nowrap"
                variant="muted"
                href={
                  "https://www.wikidata.org/w/index.php?title=Special:Search&search=" +
                  encodeURIComponent(app.name)
                }
              >
                <SourceDisplayText name="Wikidata" create />
              </ExternalLink>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <span className="font-bold">
                  {t("app.contribute.app.editInformation.wikidata.create")}
                </span>
                <br />
                {t("app.contribute.app.editInformation.wikidata.search", {
                  app: app.name,
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </>
  );
}
