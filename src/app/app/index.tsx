import React from "react";

import { ViewSelect } from "../ui/components/ViewSelect";
import { useSearchState } from "../../hooks/useSearchState";
import { Compare } from "../ui/views/Compare";
import { Trans, useTranslation } from "react-i18next";
import { toSchemaOrg } from "../ui/lib/toSchemaOrg";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";
import { ExternalLink } from "@components/common/ExternalLink";
import { useRoute } from "@hooks/useRoute";
import { useNavigate } from "react-router";
import { List } from "@app/ui/views/List";
import { useAppsData } from "@hooks/useAppsData";

import "../../index.css";
import "../../index.scss";

function PageMeta({ app }: { app: App }) {
  return (
    <>
      <title>{`${app.name} – OSM Apps Catalog`}</title>
      <meta
        name="description"
        content={plainText(
          app.subtitle || app.descriptionShort || app.description,
        )}
      />

      <meta name="og:title" content={app.name} />
      <meta
        name="og:description"
        content={plainText(
          app.subtitle || app.descriptionShort || app.description,
        )}
      />
      {!!app.logos[0] && <meta name="og:image" content={app.logos[0]} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toSchemaOrg(app) }}
      ></script>
    </>
  );
}

export function AppPage({ app }: { app: App }) {
  const { t, i18n } = useTranslation();
  const routes = useRoute();
  const navigate = useNavigate();
  const [state, setState, , isInitState] = useSearchState();
  const { apps } = useAppsData();

  return (
    <>
      <PageMeta app={app} />
      <div className="sticky left-0 text-center">
        <p className="description" style={{ margin: "5px 10px" }}>
          <Trans
            i18nKey={`category.all.description.filtered`}
            values={{
              numberOfApps: 1,
              totalNumberOfApps: apps.length,
            }}
            components={{
              o: <ExternalLink href="https://openstreetmap.org/" />,
            }}
          />

          <>
            {" "}
            <button
              className="show-all"
              onClick={() => navigate(routes.search({}))}
            >
              {t("category.showAll")}
            </button>
          </>
        </p>

        <ViewSelect
          value={state.view}
          onChange={(newValues) => setState("view", newValues)}
        />
      </div>
      <div className="text-center">
        <main>
          {state.view !== "compare" ? (
            <div id="list">
              <List app={app} open state={state} isInitState={isInitState} />
            </div>
          ) : (
            <div id="compare" className="table">
              <Compare
                apps={[app]}
                lang={i18n.resolvedLanguage || "en"}
                state={state}
                isInitState={isInitState}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
