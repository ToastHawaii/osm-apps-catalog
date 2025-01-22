import React, { useEffect, useState } from "react";

import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { Menu } from "./ui/components/Menu";
import { Search } from "./ui/components/search";
import { TopicSelect } from "./ui/components/TopicSelect";
import { PlatformSelect } from "./ui/components/PlatformSelect";
import { LanguageSelect } from "./ui/components/LanguageSelect";
import { CoverageSelect } from "./ui/components/CoverageSelect";
import { doUpdate } from "./script";
import { debounce } from "./utilities/debounce";
import { useData } from "./useData";
import { Filters } from "./ui/components/filters";
import { printCalcScore } from "./utilities/printCalcScore";
import { isDevelopment } from "./utilities/isDevelopment";

setTimeout(() => {
  require("./script");
}, 1);

export function App() {
  const apps = useData();
  const [moreFilters, setMoreFilters] = useState(false);

  useEffect(() => {
    if (apps.length > 0) {
      doUpdate(apps);

      if (isDevelopment) {
        printCalcScore(apps);
      }
    }
  }, [apps]);

  return (
    <div id="content">
      <header className="page-header">
        <Menu
          onChange={(value) => {
            doUpdate(apps, value === "focus");
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
          onInput={debounce(() => {
            doUpdate(apps, false, false);
          }, 500)}
          onBlur={() => {
            doUpdate(apps, false, true, false);
          }}
        />{" "}
        {!moreFilters ? (
          <Filters
            onChange={(value) => {
              setMoreFilters(value);
            }}
          />
        ) : null}
        <hr style={{ border: "1px solid #ccc" }} />
        {moreFilters ? (
          <span className="advanced-filter">
            <TopicSelect onChange={() => doUpdate(apps)} />
            <PlatformSelect onChange={() => doUpdate(apps)} />
            <LanguageSelect onChange={() => doUpdate(apps)} />
            <CoverageSelect onChange={() => doUpdate(apps)} />
          </span>
        ) : null}
        <ViewSelect onChange={() => doUpdate(apps)} />
      </header>
      <main>
        <div id="list"></div>
        <div id="compare" className="table"></div>
      </main>
    </div>
  );
}
