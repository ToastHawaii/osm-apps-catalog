import React from "react";

import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { Menu } from "./ui/components/Menu";
import { Search } from "./ui/components/search";
import { TopicSelect } from "./ui/components/TopicSelect";
import { PlatformSelect } from "./ui/components/PlatformSelect";
import { LanguageSelect } from "./ui/components/LanguageSelect";
import { CoverageSelect } from "./ui/components/CoverageSelect";
import { apps, doUpdate } from "./script";
import { debounce } from "./utilities/debounce";

setTimeout(() => {
  require("./script");
}, 1);

export function App() {
  return (
    <div id="content">
      <header className="page-header">
        <Menu
          onChange={(value) => {
            doUpdate(apps, value === "focus");
          }}
        />
        <h1 style={{ clear: "both", margin: "0" }}>
          <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
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
        <button id="more-filters" className="filter hidden">
          Filters
        </button>
        <hr style={{ border: "1px solid #ccc" }} />
        <span className="advanced-filter" style={{ display: "none" }}>
          <TopicSelect onChange={() => doUpdate(apps)} />
          <PlatformSelect onChange={() => doUpdate(apps)} />
          <LanguageSelect onChange={() => doUpdate(apps)} />
          <CoverageSelect onChange={() => doUpdate(apps)} />
        </span>
        <ViewSelect />
      </header>
      <main>
        <div id="list"></div>
        <div id="compare" className="table"></div>
      </main>
    </div>
  );
}
