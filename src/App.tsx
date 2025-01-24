import React, { useEffect, useState } from "react";

import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { Menu } from "./ui/components/Menu";
import { Search } from "./ui/components/search";
import { TopicSelect } from "./ui/components/TopicSelect";
import { PlatformSelect } from "./ui/components/PlatformSelect";
import { LanguageSelect } from "./ui/components/LanguageSelect";
import { CoverageSelect } from "./ui/components/CoverageSelect";
import { update } from "./script";
import { useData } from "./useData";
import { Filters } from "./ui/components/filters";
import { printCalcScore } from "./utilities/printCalcScore";
import { isDevelopment } from "./utilities/isDevelopment";
import { debounce } from "lodash";
import { useAppState } from "./utilities/useAppState";
import { filter } from "./filter";
import { App as AppData } from "./data/App";
import { List } from "./ui/views/list";

import "./style.scss";

export function App() {
  const [state, setAppState, resetAppState] = useAppState();
  const apps = useData();
  const [filteredApps, setFilteredApps] = useState<AppData[]>([]);
  // const [moreFilters, setMoreFilters] = useState(
  //   state.topics.length > 0 ||
  //     state.platforms.length > 0 ||
  //     state.languages.length > 0 ||
  //     state.coverage.length > 0
  // );

  useEffect(() => {
    if (apps.length > 0) {
      // update({ apps, filteredApps, appPage: !!state.app, ...state });

      if (isDevelopment) {
        printCalcScore(apps);
      }
    }
  }, [apps]);

  useEffect(() => {
    if (apps.length > 0) {
      setFilteredApps(filter({ apps, ...state }));
    }
  }, [apps, JSON.stringify(state)]);

  return (
    <div id="content">
      <header className="page-header">
        <Menu
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
        <Search
          apps={apps}
          onInput={debounce((value) => {
            setAppState("search", value);
          }, 500)}
        />{" "}
        {/* {!moreFilters ? (
          <Filters
            onChange={(value) => {
              setMoreFilters(value);
            }}
          />
        ) : null} */}
        <hr style={{ border: "1px solid #ccc" }} />
        {/* {moreFilters ? (
          <span className="advanced-filter">
            <TopicSelect
              apps={filteredApps}
              selected={state.topics}
              onChange={(newValues) => setAppState("topics", newValues)}
            />
            <LanguageSelect
              onChange={() =>
                update({ apps, filteredApps, appPage: !!state.app, ...state })
              }
            />
            <PlatformSelect
              onChange={() =>
                update({ apps, filteredApps, appPage: !!state.app, ...state })
              }
            />
            <CoverageSelect
              onChange={() =>
                update({ apps, filteredApps, appPage: !!state.app, ...state })
              }
            />
          </span>
        ) : null} */}
        <ViewSelect
          onChange={
            () => {}
            // update({ apps, filteredApps, appPage: !!state.app, ...state })
          }
        />
      </header>
      <main>
        <div id="list">
          {filteredApps.map((a) => (
            <List app={a} open={!!state.app} />
          ))}
        </div>
        {/* <div id="compare" className="table"></div> */}
      </main>
    </div>
  );
}
