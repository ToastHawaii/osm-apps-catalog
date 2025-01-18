import React, { useEffect } from "react";
import { ViewSelect } from "./ui/components/ViewSelect";

export function App() {
  useEffect(() => {
    require("./script");
  });
  return (
    <div id="content">
      <header className="page-header">
        <select
          id="category"
          style={{ width: "228px", float: "right", margin: "4px" }}
        ></select>
        <h1 style={{ clear: "both", margin: "0" }}>
          <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
          <a href="/" style={{ color: "#333" }}>
            OSM Apps Catalog
          </a>
          <a id="about" className="info" href="/docs/" title="About">
            <i className="fas fa-info-circle"></i>
          </a>
        </h1>
        <p className="description" style={{ margin: "5px 10px 10px" }}></p>
        <input
          type="search"
          id="search"
          className="filter hidden"
          placeholder="Search"
          autoComplete="on"
          list="search-suggestions"
        />
        <datalist id="search-suggestions"></datalist>&#32;
        <button id="more-filters" className="filter hidden">
          Filters
        </button>
        <span className="advanced-filter" style={{ display: "none" }}>
          <select id="topic" className="filter hidden" multiple></select>
          <select id="platform" className="filter hidden" multiple></select>
          <select id="language" className="filter hidden" multiple></select>
          <select id="coverage" className="filter hidden" multiple></select>
        </span>
        <hr style={{ border: "1px solid #ccc" }} />
        <ViewSelect />
      </header>
      <main>
        <div id="list"></div>
        <div id="compare" className="table"></div>
      </main>
    </div>
  );
}
