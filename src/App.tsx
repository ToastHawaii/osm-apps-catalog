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
import { languageValueToDisplay } from "./ui/utilities/language";

import "./style.scss";
import { calculateScore } from "./data/calculateScore";

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
  const [state, setAppState, resetAppState] = useAppState();
  const apps = useData();
  const [filteredApps, setFilteredApps] = useState<AppData[]>([]);
  const [moreFilters, setMoreFilters] = useState(
    state.topics.length > 0 ||
      state.platforms.length > 0 ||
      state.languages.length > 0 ||
      state.coverage.length > 0
  );

  useEffect(() => {
    if (apps.length > 0) {
      const filteredApps = filter({ apps, ...state });
      prepareScoreAndLanguage(filteredApps);
      setFilteredApps(filteredApps);
    }
  }, [apps, JSON.stringify(state)]);

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
        <p className="description" style={{ margin: "5px 10px 10px" }}></p>
        {state.category !== "focus" && !state.app && (
          <Search
            apps={apps}
            onInput={debounce((value) => {
              setAppState("search", value);
            }, 500)}
          />
        )}{" "}
        {state.category !== "focus" && !state.app && (
          <Filters
            active={moreFilters}
            onChange={(value) => {
              setMoreFilters(value);
            }}
          />
        )}
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
        <ViewSelect
          value={state.view}
          onChange={(newValues) => setAppState("view", newValues)}
        />
      </header>
      <main>
        {state.view !== "compare" ? (
          <div id="list">
            {filteredApps.map((a) => (
              <List key={a.id} app={a} open={!!state.app} />
            ))}
          </div>
        ) : (
          <div id="compare" className="table">
            <Compare apps={filteredApps} lang={state.lang} />
          </div>
        )}
      </main>
    </LazyLoadImages>
  );
}
