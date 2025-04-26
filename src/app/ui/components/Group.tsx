import React from "react";
import { useTranslation } from "react-i18next";
import { Badges } from "./Badges";
import { toWikiValue, toWikiTable } from "../utilities/toWikiTable";
import { Param } from "./Param";
import { notNo } from "../../../shared/utilities/string";
import { App } from "../../../shared/data/App";

export function Group({
  id,
  display,
  params,
  apps,
  lang,
}: {
  id: string;
  display: string;
  params: (
    | string
    | {
        label: (lang?: string) => string | undefined;
        description: (lang?: string) => string | undefined;
        hasValue: (app: App) => boolean;
        notNo?: (app: App) => boolean;
        renderToHtml: (app: App) => JSX.Element | null;
        renderToWiki?: (app: App, lang: string) => string | undefined;
        more?: boolean;
        centered?: boolean;
        focus?: boolean;
      }
  )[];
  apps: App[];
  lang: string;
}) {
  const { t } = useTranslation();
  const extendedParams = params.map((p) => {
    if (typeof p !== "string") {
      return p;
    }

    return {
      label: (lang?: string) => t("app.props." + p + ".label", { lng: lang }),
      description: (lang?: string) =>
        t("app.props." + p + ".description", { lng: lang }),
      hasValue: (app: App) => {
        const value: string | string[] | undefined = (app as any)[id]?.[p];
        if (Array.isArray(value)) {
          return value.some((v) => !!v);
        }
        return !!value;
      },
      notNo: (app: App) => {
        const value: string | string[] | undefined = (app as any)[id]?.[p];
        return notNo(value);
      },
      renderToHtml: (app: App) => <Badges values={(app as any)[id]?.[p]} />,
      renderToWiki: (app: App) => toWikiValue((app as any)[id]?.[p], lang),
    };
  });

  let elements = extendedParams
    .map((p, i) => {
      if (!apps.some((app) => p.hasValue(app) && (!p.notNo || p.notNo(app)))) {
        return undefined;
      }

      return (
        <Param
          key={i}
          apps={apps}
          label={p.label()}
          description={p.description()}
          value={(app) => p.renderToHtml(app)}
          group={id + "-detail"}
          more={p.more}
          centered={p.centered}
          focus={p.focus}
        />
      );
    })
    .filter((e) => e);

  if (elements.length) {
    return (
      <>
        <div className="row">
          <div className="cell header params-title params-group-title">
            <a
              className="group"
              href="#"
              onClick={() => {
                document
                  .querySelectorAll(`.${id}-detail`)
                  .forEach((e) => e.classList.toggle("hidden"));
              }}
            >
              <i className={`fas fa-fw fa-caret-down ${id}-detail`}></i>
              <i
                className={`fas fa-fw fa-caret-right ${id}-detail hidden`}
              ></i>{" "}
              {display}
            </a>{" "}
            <a
              className="export"
              href="#"
              title={t("compare.share")}
              onClick={(e) => {
                e.preventDefault();
                const wikiTable = toWikiTable(
                  apps,
                  extendedParams.filter((p) => !!p.renderToWiki) as any,
                  lang
                );

                navigator.clipboard.writeText(`== ${display} == <!-- ${t(
                  "wiki.generatedBy"
                )} -->
${wikiTable}`);
                alert(t("share.wiki", { group: display }));
              }}
            >
              <i className="fas fa-share-alt"></i>
            </a>{" "}
          </div>
        </div>
        {elements}
      </>
    );
  }

  return null;
}
