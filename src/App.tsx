import React, { useEffect, useState } from "react";

import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { Menu } from "./ui/components/Menu";
import { Search } from "./ui/components/search";
import { TopicSelect } from "./ui/components/TopicSelect";
import { PlatformSelect } from "./ui/components/PlatformSelect";
import { LanguageSelect } from "./ui/components/LanguageSelect";
import { CoverageSelect } from "./ui/components/CoverageSelect";
import { useData } from "./useData";
import { Filters } from "./ui/components/filters";
import { debounce } from "lodash";
import { useAppState } from "./utilities/useAppState";
import { filter } from "./filter";
import { App as AppData } from "./data/App";
import { List } from "./ui/views/List";
import { LazyLoadImages } from "./ui/utilities/LazyLoadImages";
import { Compare } from "./ui/views/compare";
import { calculateScore } from "./data/calculateScore";
import { useTranslation } from "react-i18next";
import { languageValueToDisplay } from "./ui/utilities/language";
import { NotFoundApps } from "./ui/components/NotFoundApps";

import "./style.scss";

function prepareScoreAndLanguage(apps: AppData[]) {
  apps
    .filter((app) => !app.score.details)
    .forEach((app) => {
      app.score = calculateScore(app);
      app.languages = app.languages.map((l) => languageValueToDisplay(l));
      if (app.accessibility) {
        app.accessibility.screenReaderLang =
          app.accessibility.screenReaderLang.map((l) =>
            languageValueToDisplay(l)
          );
      }
    });
}

export function App() {
  const { t } = useTranslation();
  const [state, setAppState, resetAppState] = useAppState();
  const apps = useData();
  const [trackHistory, setTrackHistory] = useState(true);
  const [filteredApps, setFilteredApps] = useState<AppData[]>([]);
  const [similarApps, setSimilarApps] = useState<AppData[]>([]);
  const [moreFilters, setMoreFilters] = useState(
    state.topics.length > 0 ||
      state.platforms.length > 0 ||
      state.languages.length > 0 ||
      state.coverage.length > 0
  );

  useEffect(() => {
    if (apps.length > 0) {
      const [filteredApps, similarApps] = filter({ apps, ...state });
      if (filteredApps.length > 300) {
        setAppState("view", "list");
      }
      prepareScoreAndLanguage(filteredApps);
      setFilteredApps(filteredApps);
      setSimilarApps(similarApps);
    }
  }, [
    apps,
    JSON.stringify({
      app: state.app,
      category: state.category,
      coverage: state.coverage,
      platforms: state.platforms,
      search: state.search,
      topics: state.topics,
    }),
  ]);

  return (
    <LazyLoadImages>
      <header className="page-header">
        <Menu
          value={state.category}
          onChange={(value) => {
            if (value === "focus") {
              resetAppState(value);
            } else {
              setAppState("category", value);
            }
          }}
        />
        <h1 style={{ clear: "both", margin: "0" }}>
          {apps.length === 0 ? (
            <>
              <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
            </>
          ) : null}
          <a href="/" style={{ color: "#333" }}>
            OSM Apps Catalog
          </a>
          <About />
        </h1>
        {!state.app ? (
          <>
            <p className="description" style={{ margin: "5px 10px 10px" }}>
              {t(`category.${state.category}.description`, {
                numberOfApps: filteredApps.length || "",
              })}
            </p>
            {state.category !== "focus" && (
              <>
                <Search
                  apps={apps}
                  value={state.search}
                  onChange={debounce((value) => {
                    setAppState("search", value, !trackHistory);
                    setTrackHistory(false);
                  }, 500)}
                  onBlur={() => {
                    setTrackHistory(true);
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
          </>
        ) : null}
        <hr style={{ border: "1px solid #ccc" }} />
        {state.category !== "focus" && !state.app && moreFilters && (
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
          </span>
        )}
        {filteredApps.length <= 300 && filteredApps.length > 0 && (
          <ViewSelect
            value={state.view}
            onChange={(newValues) => setAppState("view", newValues)}
          />
        )}
      </header>
      <main>
        {state.view !== "compare" ? (
          <div id="list">
            {filteredApps.length > 0 ? (
              filteredApps.map((a) => (
                <List key={a.id} app={a} open={!!state.app} />
              ))
            ) : (
              <p className="no-results">{t("noResults")}</p>
            )}
            {similarApps.length > 0 && (
              <>
                <h2>
                  {t("relatedApps", { numberOfApps: similarApps.length })}
                </h2>
                {similarApps.map((a) => (
                  <List key={a.id} app={a} open={false} />
                ))}
              </>
            )}
            {state.category === "all" && !state.app ? (
              <NotFoundApps apps={apps} />
            ) : null}
          </div>
        ) : (
          <div id="compare" className="table">
            {filteredApps.length > 0 ? (
              <Compare apps={filteredApps} lang={state.lang} />
            ) : (
              <p className="no-results">{t("noResults")}</p>
            )}
          </div>
        )}
      </main>
    </LazyLoadImages>
  );
}
