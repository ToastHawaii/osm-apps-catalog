import React, { useEffect, useState } from "react";

import { ViewSelect } from "./components/ViewSelect";
import { About } from "./components/about";
import { Menu } from "./components/Menu";
import { Search } from "./components/search";
import { TopicSelect } from "./components/TopicSelect";
import { PlatformSelect } from "./components/PlatformSelect";
import { LanguageSelect } from "./components/LanguageSelect";
import { CoverageSelect } from "./components/CoverageSelect";
import { ContributeSelect, mapping } from "./components/ContributeSelect";
import { useData } from "../../hooks/useData";
import { Filters } from "./components/filters";
import { chain, debounce } from "lodash";
import { useAppState } from "../../hooks/useAppState";
import { filter } from "../../lib/utils/filter";
import { LazyLoadImages } from "./components/LazyLoadImages";
import { Compare } from "./views/Compare";
import { Trans, useTranslation } from "react-i18next";
import { NotFoundApps } from "./components/NotFoundApps";
import { strip } from "@shared/utilities/string";
import { LazyInitMore } from "./components/LazyInitMore";
import { PagedList } from "./PagedList";
import { RelatedApps } from "./RelatedApps";
import { toSchemaOrg } from "./utilities/toSchemaOrg";

import "../../index.scss";
import "../../index.css";

function appendMeta(property: string, content: string) {
  const meta = document.createElement("meta");
  meta.setAttribute("property", property);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

export function App() {
  const { t, i18n } = useTranslation();

  const [state, setAppState, resetAppState, isInitState] = useAppState();
  const apps = useData(i18n.language);
  const [moreFilters, setMoreFilters] = useState(false);

  const [filteredApps, findSimilarApps] = filter({ apps, ...state });
  if (filteredApps.length > 300 && state.view !== "list") {
    setAppState("view", "list");
  }

  useEffect(() => {
    if (!!state.app && filteredApps[0]) {
      const app = filteredApps[0];

      appendMeta("og:title", app.name);
      appendMeta("og:description", app.description);
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
        ?.setAttribute("content", strip(app.description));
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
    <div id="content">
      <div
        style={{
          padding: "12px 18px",
          color: "#664d03",
          background: "#fff3cd",
          border: "1px solid #ffe69c",
          position: "relative",
        }}
      >
        <Trans
          i18nKey={`survey`}
          components={{
            u: (
              <a
                style={{ fontWeight: "900" }}
                href={
                  i18n.language === "de" || state.languages.includes("Deutsch")
                    ? "https://docs.google.com/forms/d/e/1FAIpQLSf0UZThZrVZQZgu1lIcXjQ3A1h_L2NznjMC9ntM_NREV6d2fQ/viewform?usp=dialog"
                    : "https://docs.google.com/forms/d/e/1FAIpQLSezDOrvRCoSyXfhsCXHp-w_rBJgi2a8ITANi9xaryylTP9ASQ/viewform?usp=publish-editor"
                }
                target="_blank"
                rel="noreferrer"
              />
            ),
          }}
        />
        <button
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            padding: "10px",
            right: "0",
            top: "0",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.currentTarget.parentElement?.remove();
          }}
        >
          <i className="fas fa-times-circle"></i>
        </button>
      </div>
      <header className="page-header">
        <Menu
          value={state.category}
          onChange={(value) => {
            if (value === "focus" || state.app) {
              setMoreFilters(false);
              resetAppState(value);
            } else {
              setAppState("category", value);
            }
          }}
        />
        <h1 className="text-3xl font-bold" style={{ clear: "both" }}>
          {apps.length === 0 && (
            <>
              <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
            </>
          )}
          <a href="/" style={{ color: "#333" }}>
            OSM Apps Catalog
          </a>
          <About />
        </h1>
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
            <Search
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
        <hr className="my-2" />
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
      </header>
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
  );
}
