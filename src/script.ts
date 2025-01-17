// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import { createElement, getHtmlElement } from "./ui/utilities/html";
import { debounce } from "./ui/utilities/debounce";
import SlimSelect from "slim-select";
import { lazyLoadImages } from "./ui/lazyLoadImages";
import { render as renderListView } from "./ui/views/list";
import { includes, some } from "./ui/utilities/array";
import { equalsIgnoreCase, strip } from "./ui/utilities/string";
import { App } from "./data/template/utilities";
import { findGetParameter } from "./ui/utilities/url";
import { display, edit, mobile, navigation, web } from "./ui/utilities/filter";
import { render as renderCompareView } from "./ui/views/compare";
import { lazyInitMore } from "./ui/lazyInitMore";
import "./data/i18n";
import i18next from "i18next";
import { features } from "./features";
import { calculateScore, sum } from "./data/addApp";
import { getJson } from "./ui/utilities/jsonRequest";
import { languageValueToDisplay } from "./ui/language";

import "./www/style.scss"

let onInit = true;

let onUpdate = false;
export let apps: App[] = [];
setTimeout(() => {
  const topicsSelect = new SlimSelect({
    select: "#topic",
    settings: { placeholderText: i18next.t("filter.topic") },
    events: {
      afterChange: () => {
        doUpdate(apps);
      },
    },
  });
  const platformsSelect = new SlimSelect({
    select: "#platform",
    settings: {
      placeholderText: i18next.t("filter.platform"),
    },
    events: {
      afterChange: () => {
        doUpdate(apps);
      },
    },
  });
  const languagesSelect = new SlimSelect({
    select: "#language",
    settings: { placeholderText: i18next.t("filter.language") },
    events: {
      afterChange: () => {
        doUpdate(apps);
      },
    },
  });
  const coverageSelect = new SlimSelect({
    select: "#coverage",
    settings: { placeholderText: i18next.t("filter.coverage") },
    events: {
      afterChange: () => {
        doUpdate(apps);
      },
    },
  });

  const freeCheckbox = document.getElementById("free") as HTMLInputElement;
  freeCheckbox.addEventListener("change", () => {
    doUpdate(apps);
  });
  if (features.freeFilter) {
    (document.getElementById("freeDisplay") as HTMLSpanElement).innerText =
      i18next.t("filter.free");
  } else {
    (
      document.getElementById("freeDisplay") as HTMLSpanElement
    ).parentElement!.style.display = "none";
  }
  (document.getElementById("about") as HTMLAnchorElement).setAttribute(
    "title",
    i18next.t("about")
  );
  (document.getElementById("listText") as HTMLSpanElement).textContent =
    i18next.t("list");
  (document.getElementById("compareText") as HTMLSpanElement).textContent =
    i18next.t("compare");

  if (i18next.resolvedLanguage !== "en") {
    (document.getElementById("about") as HTMLAnchorElement).href =
      "/docs/" + i18next.resolvedLanguage;
  }

  const searchElement = document.getElementById("search") as HTMLInputElement;
  searchElement.placeholder = i18next.t("filter.search");
  searchElement.addEventListener(
    "input",
    debounce(() => {
      doUpdate(apps, false, false);
    }, 500)
  );
  searchElement.addEventListener("blur", () => {
    doUpdate(apps, false, true, false);
  });

  const moreFiltersElement = document.getElementById(
    "more-filters"
  ) as HTMLButtonElement;
  moreFiltersElement.innerText = i18next.t("filter.moreFilters");
  moreFiltersElement.addEventListener("click", () => {
    moreFiltersElement.style.display = "none";

    document
      .querySelectorAll(".advanced-filter")
      .forEach((e) => ((e as HTMLElement).style.display = ""));
  });

  (document.getElementById("listView") as HTMLInputElement).addEventListener(
    "input",
    () => {
      doUpdate(apps);
    }
  );
  (document.getElementById("compareView") as HTMLInputElement).addEventListener(
    "input",
    () => {
      doUpdate(apps);
    }
  );

  const categorySelect = new SlimSelect({
    select: "#category",
    settings: {
      showSearch: false,
      placeholderText: i18next.t("filter.category"),
    },
    data: [
      {
        value: "all",
        html:
          "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> " +
          i18next.t("filter.category.all"),
        text: i18next.t("filter.category.all"),
      },
      {
        value: "focus",
        html:
          "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> " +
          i18next.t("filter.category.focus"),
        text: i18next.t("filter.category.focus"),
      },
      {
        value: "latest",
        html:
          "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> " +
          i18next.t("filter.category.latest"),
        text: i18next.t("filter.category.latest"),
      },
      {
        value: "mobile",
        html:
          "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> " +
          i18next.t("filter.category.mobile"),
        text: i18next.t("filter.category.mobile"),
      },
      {
        value: "navigation",
        html:
          "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> " +
          i18next.t("filter.category.navigation"),
        text: i18next.t("filter.category.navigation"),
      },
      {
        value: "edit",
        html:
          "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> " +
          i18next.t("filter.category.edit"),
        text: i18next.t("filter.category.edit"),
      },
    ],
    events: {
      afterChange: (i: any) => {
        doUpdate(apps, i.value === "focus");
      },
    },
  });

  type State = {
    lang: string;
    freeOnly: boolean;
    category: "all" | "focus" | "latest" | "mobile" | "navigation" | "edit";
    app?: number | undefined;
    search: string;
    topics: string[];
    platforms: string[];
    languages: string[];
    coverage: string[];
    view: "list" | "compare";
  };

  const lang = (findGetParameter("lang") || "en").toLowerCase();

  function doUpdate(
    newApps: App[],
    reset?: boolean,
    history = true,
    render = true
  ) {
    debugger
    apps = newApps;
    if (!onUpdate) {
      onUpdate = true;
      if (reset) {
        searchElement.value = "";
        topicsSelect.setSelected([]);
        platformsSelect.setSelected([]);
        languagesSelect.setSelected([]);
        coverageSelect.setSelected([]);
      }
      const params = new URLSearchParams(window.location.search);
      const category = categorySelect.getSelected()[0] as string;
      let state: State = {
        lang,
        freeOnly: freeCheckbox.checked,
        app:
          !category || category === "all"
            ? params.get("app")
              ? parseInt(params.get("app") as string, 10)
              : undefined
            : undefined,
        search: searchElement.value,
        topics: topicsSelect.getSelected() as string[],
        platforms: platformsSelect.getSelected() as string[],
        languages: languagesSelect.getSelected() as string[],
        coverage: coverageSelect.getSelected() as string[],
        category: category as any,
        view: (document.getElementById("listView") as HTMLInputElement).checked
          ? "list"
          : "compare",
      };

      if (onInit) {
        state = {
          lang: params.get("lang") || "",
          freeOnly: params.get("freeOnly") === "1" ? true : false,
          app: params.get("app")
            ? parseInt(params.get("app") as string, 10)
            : undefined,
          search: params.get("search") || "",
          topics: params.get("topics")?.split(",") || [],
          platforms: params.get("platforms")?.split(",") || [],
          languages: params.get("languages")?.split(",") || [],
          coverage: params.get("coverage")?.split(",") || [],
          category: (params.get("category") as any) || "all",
          view: params.get("view") === "compare" ? "compare" : "list",
        };

        onInit = false;
      } else if (history) {
        updateState(state);
      }
      if (render) {
        update(state);
      }
      onUpdate = false;
    }
  }

  window.addEventListener("popstate", (e) => {
    onUpdate = true;
    update(e.state);
    onUpdate = false;
  });

  function updateState(state: State) {
    window.history.pushState(
      state,
      "",
      "?" +
        new URLSearchParams(
          [
            ["lang", state.lang === "en" ? "" : state.lang],
            ["freeOnly", state.freeOnly ? "1" : ""],
            ["category", state.category === "all" ? "" : state.category],
            ["app", "" + (state.app || "")],
            ["search", state.search],
            ["topics", state.topics.join(",")],
            ["platforms", state.platforms.join(",")],
            ["languages", state.languages.join(",")],
            ["coverage", state.coverage.join(",")],
            ["view", state.view === "list" ? "" : state.view],
          ].filter((pair) => pair[1])
        ).toString()
    );
  }

  function prepareScoreAndLanguage(filteredApps: App[]) {
    filteredApps
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

  function update({
    freeOnly,
    category,
    app: appId,
    search,
    topics,
    platforms,
    languages,
    coverage,
    view,
  }: State) {
    categorySelect.setSelected(category);

    updateDescription(category);

    getHtmlElement("#list").innerHTML = "";
    getHtmlElement("#compare").innerHTML = "";

    setTimeout(() => {
      const datalist = getHtmlElement("#search-suggestions");
      if (!datalist.innerHTML) {
        for (const topic of [
          ...new Set(apps.flatMap((a) => a.topics)),
        ].sort()) {
          const option = createElement("option");
          option.value = topic;
          datalist.appendChild(option);
        }
      }
    }, 0);

    let filteredApps: App[] = apps.slice();

    freeCheckbox.checked = freeOnly;
    if (freeOnly) {
      filteredApps = filteredApps.filter((a) => a.gratis || a.libre);
    }

    if (category === "latest") {
      filteredApps = filteredApps.sort(function (a, b) {
        const nameA = a.source[0].lastChange || "";
        const nameB = b.source[0].lastChange || "";
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });

      filteredApps = filteredApps.sort(function (a, b) {
        const nameA = a.lastRelease || "";
        const nameB = b.lastRelease || "";
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });
    } else if (category === "focus") {
      let latestApps = filteredApps.sort(function (a, b) {
        const nameA = a.source[0].lastChange || "";
        const nameB = b.source[0].lastChange || "";
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });

      filteredApps = [];
      for (const app of latestApps) {
        if (filteredApps.length < 10) {
          if (
            !filteredApps.some(
              (a) =>
                equalsIgnoreCase(a.source[0].url, app.source[0].url) ||
                (a.source[0].url.startsWith(
                  "https://taginfo.openstreetmap.org/projects/"
                ) &&
                  app.source[0].url.startsWith(
                    "https://taginfo.openstreetmap.org/projects/"
                  ))
            )
          ) {
            filteredApps.push(app);
          }
        } else {
          break;
        }
      }
    }

    searchElement.value = search;

    search = search.toUpperCase();
    const topicsUp = topics.map((t) => t.toUpperCase());
    const platformsUp = platforms.map((t) => t.toUpperCase());
    const languagesUp = languages.map((t) => t.toUpperCase());
    const coverageUp: string[] = [];
    coverage.forEach((t) => {
      const regions = t.toUpperCase().split(", ");
      let entry = [];
      for (let index = 0; index < regions.length; index++) {
        entry.push(regions[index]);
        coverageUp.push(entry.join(", "));
      }
    });

    let appPage = false;
    if (appId) {
      filteredApps = filteredApps.filter((a) => a.id === appId);
      appPage = filteredApps.length === 1;
    } else if (search) {
      filteredApps = filteredApps.filter(
        (a) =>
          a.name.toUpperCase().indexOf(search) !== -1 ||
          a.description.toUpperCase().indexOf(search) !== -1 ||
          a.topics.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0 ||
          a.platform.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0 ||
          a.coverage.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0
      );
    }

    document
      .querySelectorAll(".filter")
      .forEach((e) =>
        e.classList.toggle("hidden", category === "focus" || appPage)
      );

    if (topicsUp.length > 0)
      filteredApps = filteredApps.filter((a) =>
        includes(
          a.topics.map((t) => t.toUpperCase()),
          topicsUp
        )
      );

    if (platformsUp.length > 0)
      filteredApps = filteredApps.filter((a) =>
        includes(
          a.platform.map((t) => t.toUpperCase()),
          platformsUp
        )
      );

    if (languagesUp.length > 0)
      filteredApps = filteredApps.filter((a) =>
        some(
          a.languages.map((t) => t.toUpperCase()),
          languagesUp
        )
      );

    if (coverageUp.length > 0) {
      filteredApps = filteredApps.filter((a) =>
        some(
          a.coverage.map((t) => t.toUpperCase()),
          coverageUp
        )
      );
    }

    const categoriedApps = [];

    if (category === "mobile") {
      categoriedApps.push(...filteredApps.filter(mobile));

      filteredApps = categoriedApps;
    } else if (category === "navigation") {
      categoriedApps.push(...filteredApps.filter(navigation));

      filteredApps = categoriedApps;
    } else if (category === "edit") {
      categoriedApps.push(...filteredApps.filter(edit));

      filteredApps = categoriedApps;
    }

    prepareScoreAndLanguage(filteredApps);

    updateDescription(category, filteredApps.length);

    const params = new URLSearchParams(window.location.search);
    const topicsData: string[] = params.get("topics")
      ? params.get("topics")?.split(",") || []
      : [];
    const platformsData: string[] = params.get("platforms")
      ? params.get("platforms")?.split(",") || []
      : [];
    const languagesData: string[] = params.get("languages")
      ? params.get("languages")?.split(",") || []
      : [];
    const coverageData: string[] = params.get("coverage")
      ? params.get("coverage")?.split(",") || []
      : [];

    if (
      params.get("topics") ||
      params.get("platforms") ||
      params.get("languages") ||
      params.get("coverage")
    ) {
      moreFiltersElement.style.display = "none";

      document
        .querySelectorAll(".advanced-filter")
        .forEach((e) => ((e as HTMLElement).style.display = ""));
    }

    for (const a of filteredApps) {
      topicsData.push(...a.topics.map((t) => t));
      platformsData.push(...a.platform.map((t) => t));
      coverageData.push(...a.coverage.map((t) => t));
    }

    for (const a of apps) {
      languagesData.push(...a.languages.filter((l) => l).map((l) => l));
    }

    topicsSelect.setData(prepareArrayForSelect(topicsData, topics));
    topicsSelect.setSelected(topics);

    platformsSelect.setData(prepareArrayForSelect(platformsData, platforms));
    platformsSelect.setSelected(platforms);

    languagesSelect.setData(prepareArrayForSelect(languagesData, languages));
    languagesSelect.setSelected(languages);

    coverageSelect.setData(prepareArrayForSelect(coverageData, coverage));
    coverageSelect.setSelected(coverage);

    document
      .getElementById("view")
      ?.classList.toggle("hidden", filteredApps.length >= 300);

    switch (view) {
      case "list":
        (document.getElementById("listView") as HTMLInputElement).checked =
          true;
        (document.getElementById("compareView") as HTMLInputElement).checked =
          false;
        for (const a of filteredApps) {
          renderListView(a, appPage);
        }
        if (filteredApps.length === 0) {
          getHtmlElement("#list").appendChild(
            createElement("p", i18next.t("noResults"), ["no-results"])
          );
        }
        renderSimilarApps(
          filteredApps,
          search,
          topicsUp,
          platformsUp,
          languagesUp,
          coverageUp
        );
        if (category === "all" && !appPage) {
          renderNotFoundApps();
        }
        break;

      case "compare":
        (document.getElementById("listView") as HTMLInputElement).checked =
          false;
        (document.getElementById("compareView") as HTMLInputElement).checked =
          true;
        if (filteredApps.length === 0) {
          getHtmlElement("#compare").appendChild(
            createElement("p", i18next.t("noResults"), ["no-results"])
          );
        }
        renderCompareView(filteredApps, lang);
        setTimeout(() => {
          lazyInitMore(true);
        }, 0);
        break;

      default:
        throw new Error("Not expected value for view.");
    }

    if (appPage) {
      getHtmlElement(".description").style.display = "none";

      const app = filteredApps[0];
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify({
        "@context": "http://schema.org",
        "@type": mobile(app)
          ? "MobileApplication"
          : web(app)
          ? "WebApplication"
          : "SoftwareApplication",
        name: app.name || undefined,
        description: strip(app.description) || undefined,
        keywords: app.topics.join(","),
        image: app.images[0] || undefined,
        url: app.website || undefined,
        installUrl: app.install.fDroidID
          ? "https://f-droid.org/repository/browse/?fdid=" +
            app.install.fDroidID
          : app.install.googlePlayID
          ? "https://play.google.com/store/apps/details?id=" +
            app.install.googlePlayID
          : app.install.asin
          ? "https://www.amazon.com/dp/" + app.install.asin
          : app.install.appleStoreID
          ? "https://apps.apple.com/app/" +
            app.install.appleStoreID?.toUpperCase().startsWith("ID")
            ? app.install.appleStoreID
            : `id${app.install.appleStoreID}`
          : app.install.macAppStoreID
          ? "https://apps.apple.com/app/" +
            app.install.macAppStoreID?.toUpperCase().startsWith("ID")
            ? app.install.macAppStoreID
            : `id${app.install.macAppStoreID}`
          : app.install.microsoftAppID
          ? "https://apps.microsoft.com/detail/" + app.install.microsoftAppID
          : app.install.huaweiAppGalleryID
          ? "https://appgallery.huawei.com/#/app/" +
            app.install.huaweiAppGalleryID
          : undefined,
        datePublished: app.lastRelease || undefined,
        license: app.license || undefined,
        applicationCategory: display(app)
          ? "TravelApplication"
          : navigation(app)
          ? "DriverApplication"
          : edit(app)
          ? "UtilitiesApplication"
          : "TravelApplication",
        applicationSubCategory: app.genre,
        operatingSystem: app.platform.join(", ") || undefined,
        offers: app.gratis
          ? {
              "@type": "Offer",
              price: "0",
            }
          : undefined,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: 0.4 * app.score.total + 1,
          },
          author: {
            "@type": "Organization",
            name: "OSM Apps Catalog",
            url: "https://osm-apps.zottelig.ch/",
          },
        },
      });
      document.head.appendChild(script);
      document.title = `OSM Apps Catalog - ${app.name}`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", strip(app.description));
    } else {
      getHtmlElement(".description").style.display = "";

      document.title = `OSM Apps Catalog - ${i18next.t(
        `filter.category.${category}`,
        {
          numberOfApps: filteredApps.length,
        }
      )}`;
      document.querySelector('meta[name="description"]')?.setAttribute(
        "content",
        i18next.t(`category.${category}.description`, {
          numberOfApps: filteredApps.length,
        })
      );
    }

    setTimeout(() => {
      lazyLoadImages(true);
    }, 0);
  }

  function updateDescription(category: string, numberOfApps?: number) {
    getHtmlElement(".description").innerHTML = i18next.t(
      `category.${category}.description`,
      { numberOfApps: numberOfApps || "" }
    );
  }

  function renderSimilarApps(
    filteredApps: App[],
    search: string,
    topicsUp: string[],
    platformsUp: string[],
    languagesUp: string[],
    coverageUp: string[]
  ) {
    if (topicsUp.length > 0) {
      let similarApps = apps.filter((a) => !filteredApps.includes(a));

      similarApps = similarApps.filter((a) =>
        topicsUp.every(
          (t) =>
            a.name.toUpperCase().indexOf(t) !== -1 ||
            a.description.toUpperCase().indexOf(t) !== -1
        )
      );

      if (search)
        similarApps = similarApps.filter(
          (a) =>
            a.name.toUpperCase().indexOf(search) !== -1 ||
            a.description.toUpperCase().indexOf(search) !== -1 ||
            a.topics.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0 ||
            a.platform.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0 ||
            a.coverage.filter((t) => t.toUpperCase().indexOf(search) !== -1)
              .length > 0
        );

      if (platformsUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(
            a.platform.map((t) => t.toUpperCase()),
            platformsUp
          )
        );

      if (languagesUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(
            a.languages.map((t) => t.toUpperCase()),
            languagesUp
          )
        );

      if (coverageUp.length > 0)
        similarApps = similarApps.filter((a) =>
          some(
            a.coverage.map((t) => t.toUpperCase()),
            coverageUp
          )
        );

      if (similarApps.length > 0) {
        prepareScoreAndLanguage(similarApps);

        const similarTag = createElement(
          "h2",
          i18next.t("relatedApps", { numberOfApps: similarApps.length })
        );
        getHtmlElement("#list").appendChild(similarTag);

        for (const a of similarApps) {
          renderListView(a);
        }
      }
    }
  }

  const notFoundAppsTitle = [
    "MapComplete",
    "uMap",
    "OpenStreetBrowser",
    "Overpass turbo",
  ];

  function renderNotFoundApps() {
    let notFound = notFoundAppsTitle
      .map((f) => apps.find((a) => a.name === f))
      .filter((a) => a) as App[];

    prepareScoreAndLanguage(notFound);

    const notFoundTag = createElement("h2", i18next.t("notFound"));
    getHtmlElement("#list").appendChild(notFoundTag);

    const notFoundDesc = createElement("p", i18next.t("notFound.desc"));
    notFoundDesc.style.margin = "5px 10px 10px";
    getHtmlElement("#list").appendChild(notFoundDesc);

    for (const a of notFound) {
      renderListView(a as App);
    }
  }


  function printCalcScore() {
    const average = sum(apps.map((a) => a.score.total)) / apps.length;
    console.info("Average");
    console.info("18.24.2024: 1.970");
    console.info("23.24.2024: 1.980");
    console.info("25.24.2024: 1.999");
    console.info("04.01.2025: 2.000");
    console.info("10.01.2025: 2.008");
    console.info("New score calculation");
    console.info("11.01.2025: 2.147");
    console.info("Today: " + average);
  }

  async function getAppCatalog() {
    if (window.location.host !== "localhost:3000") {
      apps = await getJson("/api/apps/all.json", {});
    } else {
     apps = await require("./data/all.json");
    }

    doUpdate(apps);
    getHtmlElement("#loading").remove();

    if (window.location.host === "localhost:3000") {
      printCalcScore();
    }
  }

  getAppCatalog();

  function prepareArrayForSelect(names: string[], selected: string[]) {
    names.sort(function (a, b) {
      if (a?.toUpperCase() < b?.toUpperCase()) return -1;
      if (a?.toUpperCase() > b?.toUpperCase()) return 1;
      return 0;
    });
    const nameCounts: { name: string; count: number }[] = [];
    for (const name of names) {
      const nameCountFiltered = nameCounts.filter((nc) =>
        equalsIgnoreCase(nc.name, name)
      );

      if (nameCountFiltered.length > 0) {
        nameCountFiltered[0].count++;
      } else {
        nameCounts.push({ name: name, count: 1 });
      }
    }

    return nameCounts.map((t) => {
      if (selected.filter((s) => equalsIgnoreCase(t.name, s)).length > 0)
        return { value: t.name, text: t.name };
      else return { value: t.name, text: `${t.name} (${t.count})` };
    });
  }
}, 1000);
