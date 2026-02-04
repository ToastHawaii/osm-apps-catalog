import React, { useEffect, useState } from "react";

import { ViewSelect } from "./components/ViewSelect";
import { SearchComponent } from "./components/search";
import { TopicSelect } from "./components/TopicSelect";
import { PlatformSelect } from "./components/PlatformSelect";
import { LanguageSelect } from "./components/LanguageSelect";
import { CoverageSelect } from "./components/CoverageSelect";
import { ContributeSelect, mapping } from "./components/ContributeSelect";
import { Filters } from "./components/filters";
import { chain, debounce } from "lodash";
import { useAppState } from "../../hooks/useAppState";
import { filter } from "../../lib/utils/filter";
import { LazyLoadImages } from "./components/LazyLoadImages";
import { Compare } from "./views/Compare";
import { Trans, useTranslation } from "react-i18next";
import { NotFoundApps } from "./components/NotFoundApps";
import { LazyInitMore } from "./components/LazyInitMore";
import { PagedList } from "./PagedList";
import { RelatedApps } from "./RelatedApps";
import { toSchemaOrg } from "./utilities/toSchemaOrg";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utilities/plainText";

import "../../index.scss";
import "../../index.css";

function appendMeta(property: string, content: string) {
  const meta = document.createElement("meta");
  meta.setAttribute("property", property);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

export function Search({ apps }: { apps: App[] }) {
  const { t, i18n } = useTranslation();

  const [state, setAppState, resetAppState, isInitState] = useAppState();
  const [moreFilters, setMoreFilters] = useState(false);

  const [filteredApps, findSimilarApps] = filter({ apps, ...state });
  if (filteredApps.length > 300 && state.view !== "list") {
    setAppState("view", "list");
  }

  useEffect(() => {
    if (!!state.app && filteredApps[0]) {
      const app = filteredApps[0];

      appendMeta("og:title", app.name);
      appendMeta(
        "og:description",
        plainText(app.descriptionShort || app.description),
      );
      if (app.logos[0]) {
        appendMeta("og:image", app.logos[0]);
      }

      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.textContent = toSchemaOrg(app);
      document.head.appendChild(script);

      document.title = `${app.name} - OSM Apps Catalog`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          plainText(app.descriptionShort || app.description),
        );
    } else {
      document.title = `${t(`filter.category.${state.category}`, {
        numberOfApps: filteredApps.length,
      })} - OSM Apps Catalog`;
      document.querySelector('meta[name="description"]')?.setAttribute(
        "content",
        t(`category.${state.category}.description`, {
          numberOfApps: filteredApps.length,
        }),
      );
    }
  });

  return (
    <>
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
                o: (
                  <a
                    href="https://openstreetmap.org/"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          ) : (
            <Trans
              i18nKey={`category.${state.category}.description`}
              values={{
                numberOfApps: filteredApps.length,
              }}
              components={{
                o: (
                  <a
                    href="https://openstreetmap.org/"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
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
                {t("filter.showAll")}
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
                    {t("filter.showAll")}
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
                    <p className="no-results">
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
                        lang={i18n.language}
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
