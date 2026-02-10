import React, { useState } from "react";

import { ViewSelect } from "../ui/components/ViewSelect";
import { SearchComponent } from "../ui/components/search";
import { TopicSelect } from "../ui/components/TopicSelect";
import { PlatformSelect } from "../ui/components/PlatformSelect";
import { LanguageSelect } from "../ui/components/LanguageSelect";
import { CoverageSelect } from "../ui/components/CoverageSelect";
import { ContributeSelect, mapping } from "../ui/components/ContributeSelect";
import { Filters } from "../ui/components/filters";
import { chain, debounce } from "lodash";
import { useAppState } from "../../hooks/useAppState";
import { filter } from "../../lib/utils/filter";
import { LazyLoadImages } from "../ui/components/LazyLoadImages";
import { Compare } from "../ui/views/Compare";
import { Trans, useTranslation } from "react-i18next";
import { NotFoundApps } from "../ui/components/NotFoundApps";
import { LazyInitMore } from "../ui/components/LazyInitMore";
import { PagedList } from "../ui/PagedList";
import { RelatedApps } from "../ui/RelatedApps";
import { toSchemaOrg } from "../ui/utilities/toSchemaOrg";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utilities/plainText";
import { ExternalLink } from "@components/common/ExternalLink";

import "../../index.scss";
import "../../index.css";

function PageMeta({ apps }: { apps: App[] }) {
  const { t } = useTranslation();
  const [state] = useAppState();
  if (!!state.app && apps[0]) {
    const app = apps[0];

    return (
      <>
        <title>{`${app.name} - OSM Apps Catalog`}</title>
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
  } else {
    return (
      <>
        <title>{`${t(`filter.category.${state.category}`, {
          numberOfApps: apps.length,
        })} - OSM Apps Catalog`}</title>
        <meta
          name="description"
          content={t(`category.${state.category}.description`, {
            numberOfApps: apps.length,
          })}
        />
      </>
    );
  }
}

export function Search({ apps }: { apps: App[] }) {
  const { t, i18n } = useTranslation();

  const [state, setAppState, resetAppState, isInitState] = useAppState();
  const [moreFilters, setMoreFilters] = useState(false);

  const [filteredApps, findSimilarApps] = filter({ apps, ...state });
  if (filteredApps.length > 300 && state.view !== "list") {
    setAppState("view", "list");
  }

  return (
    <>
      <PageMeta apps={filteredApps} />
      <div className="sticky left-0 text-center">
        <p className="description" style={{ margin: "5px 10px" }}>
          {(state.category === "all" && filteredApps.length !== apps.length) ||
          !!state.app ? (
            <Trans
              i18nKey={`category.all.description.filtered`}
              values={{
                numberOfApps: filteredApps.length,
                totalNumberOfApps: apps.length,
              }}
              components={{
                o: <ExternalLink href="https://openstreetmap.org/" />,
              }}
            />
          ) : (
            <Trans
              i18nKey={`category.${state.category}.description`}
              values={{
                numberOfApps: filteredApps.length,
              }}
              components={{
                o: <ExternalLink href="https://openstreetmap.org/" />,
                s: <a href="/docs/score" />,
              }}
            />
          )}

          {!!state.app && (
            <>
              {" "}
              <button
                className="show-all"
                onClick={() => {
                  resetAppState(state.category);
                }}
              >
                {t("category.showAll")}
              </button>
            </>
          )}
        </p>
        {!state.app && state.category !== "focus" && (
          <>
            <SearchComponent
              apps={apps}
              value={state.search}
              onChange={debounce((value) => {
                setAppState("search", value, { skipUrlUpdate: true });
              }, 500)}
              onBlur={(value) => {
                setAppState("search", value, { forceUpdate: true });
              }}
            />{" "}
            <Filters
              active={moreFilters}
              onChange={(value) => {
                setMoreFilters(value);
              }}
            />
          </>
        )}
        {!state.app &&
          !moreFilters &&
          (state.topics.length > 0 ||
            state.platforms.length > 0 ||
            state.languages.length > 0 ||
            state.coverage.length > 0 ||
            state.contribute.length > 0) && (
            <p style={{ margin: "5px 10px", lineHeight: 1.5 }}>
              {!isInitState() ? t("filter.preview") : t("filter.preset")}{" "}
              {chain([
                ...state.topics,
                ...state.platforms,
                ...state.languages,
                ...state.coverage,
              ])
                .filter((v) => !!v)
                .uniq()
                .map((v) => (
                  <>
                    <span
                      className="filter-value"
                      onClick={() => {
                        setMoreFilters(true);
                      }}
                    >
                      {v}
                    </span>{" "}
                  </>
                ))
                .value()}
              {chain([...state.contribute])
                .filter((v) => !!v)
                .uniq()
                .map((v) => (
                  <>
                    <span
                      className="filter-value"
                      onClick={() => {
                        setMoreFilters(true);
                      }}
                    >
                      {t(mapping[v])}
                    </span>{" "}
                  </>
                ))
                .value()}
              {(state.topics.length > 0 ||
                state.platforms.length > 0 ||
                state.languages.length > 0 ||
                state.coverage.length > 0 ||
                state.contribute.length > 0) && (
                <>
                  {" "}
                  <button
                    className="show-all"
                    onClick={() => {
                      resetAppState(state.category);
                    }}
                  >
                    {t("category.showAll")}
                  </button>
                </>
              )}
            </p>
          )}
        {!state.app && moreFilters && (
          <span className="advanced-filter">
            <TopicSelect
              apps={filteredApps}
              selected={state.topics}
              onChange={(newValues) => setAppState("topics", newValues)}
            />
            <LanguageSelect
              apps={filteredApps}
              selected={state.languages}
              onChange={(newValues) => setAppState("languages", newValues)}
            />
            <PlatformSelect
              apps={filteredApps}
              selected={state.platforms}
              onChange={(newValues) => setAppState("platforms", newValues)}
            />
            <CoverageSelect
              apps={filteredApps}
              selected={state.coverage}
              onChange={(newValues) => setAppState("coverage", newValues)}
            />
            <ContributeSelect
              selected={state.contribute}
              onChange={(newValues) => setAppState("contribute", newValues)}
            />
          </span>
        )}
        {filteredApps.length <= 300 && filteredApps.length > 0 && (
          <ViewSelect
            value={state.view}
            onChange={(newValues) => setAppState("view", newValues)}
          />
        )}
      </div>
      <div className="text-center">
        {apps.length > 0 && (
          <main>
            {state.view !== "compare" ? (
              <div id="list">
                {filteredApps.length > 0 ? (
                  <PagedList
                    apps={filteredApps}
                    open={!!state.app}
                    state={state}
                    isInitState={isInitState}
                  >
                    <RelatedApps
                      findSimilarApps={findSimilarApps}
                      state={state}
                    />
                  </PagedList>
                ) : (
                  <>
                    <p className="no-results my-4">
                      {t("noResults")}{" "}
                      {(state.topics.length > 0 ||
                        state.platforms.length > 0 ||
                        state.languages.length > 0 ||
                        state.coverage.length > 0 ||
                        state.contribute.length > 0) && (
                        <button
                          className="reset-filters"
                          onClick={() => {
                            resetAppState(state.category);
                          }}
                        >
                          {t("filter.resetFilters")}
                        </button>
                      )}
                    </p>
                  </>
                )}
                {state.category === "all" && !state.app && (
                  <NotFoundApps apps={apps} />
                )}
              </div>
            ) : (
              <div id="compare" className="table">
                {filteredApps.length > 0 ? (
                  <LazyLoadImages>
                    <LazyInitMore>
                      <Compare
                        apps={filteredApps}
                        lang={i18n.resolvedLanguage || "en"}
                        state={state}
                        isInitState={isInitState}
                      />
                    </LazyInitMore>
                  </LazyLoadImages>
                ) : (
                  <p className="no-results">{t("noResults")}</p>
                )}
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
}
