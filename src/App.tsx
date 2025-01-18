import React from "react";
import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { SlimSelect } from "./ui/components/SlimSelect";

import { useTranslation } from "react-i18next";
import { apps, doUpdate } from "./script";

setTimeout(() => {
  require("./script");
}, 1);

export function App() {
  const { t } = useTranslation();
  return (
    <div id="content">
      <header className="page-header">
        <SlimSelect
          settings={{
            showSearch: false,
            placeholderText: t("filter.category"),
          }}
          data={[
            {
              value: "all",
              html:
                "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> " +
                t("filter.category.all"),
              text: t("filter.category.all"),
            },
            {
              value: "focus",
              html:
                "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> " +
                t("filter.category.focus"),
              text: t("filter.category.focus"),
            },
            {
              value: "latest",
              html:
                "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> " +
                t("filter.category.latest"),
              text: t("filter.category.latest"),
            },
            {
              value: "mobile",
              html:
                "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> " +
                t("filter.category.mobile"),
              text: t("filter.category.mobile"),
            },
            {
              value: "navigation",
              html:
                "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> " +
                t("filter.category.navigation"),
              text: t("filter.category.navigation"),
            },
            {
              value: "edit",
              html:
                "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> " +
                t("filter.category.edit"),
              text: t("filter.category.edit"),
            },
          ]}
          events={{
            afterChange: (i: any) => {
              doUpdate(apps, i.value === "focus");
            },
          }}
        ></SlimSelect>
        <h1 style={{ clear: "both", margin: "0" }}>
          <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
          <a href="/" style={{ color: "#333" }}>
            OSM Apps Catalog
          </a>
          <About />
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
        <datalist id="search-suggestions"></datalist>{" "}
        <button id="more-filters" className="filter hidden">
          Filters
        </button>
        <hr style={{ border: "1px solid #ccc" }} />
        <span className="advanced-filter" style={{ display: "none" }}>
          <select id="topic" className="filter hidden" multiple></select>
          <select id="platform" className="filter hidden" multiple></select>
          <select id="language" className="filter hidden" multiple></select>
          <select id="coverage" className="filter hidden" multiple></select>
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
