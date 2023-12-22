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
import { set, get } from "./ui/utilities/storage";
import { render as renderListView } from "./ui/views/list";
import { shuffle, includes, some } from "./ui/utilities/array";
import { equalsIgnoreCase, textToColor } from "./ui/utilities/string";
import { App } from "./data/template/utilities";
import { findGetParameter } from "./ui/utilities/url";
import { Solver } from "./ui/utilities/coloriz/Solver";
import { Color } from "./ui/utilities/coloriz/Color";
import { edit, mobile, navigation } from "./ui/utilities/filter";
import { render as renderCompareView } from "./ui/views/compare";
import { loadApps } from "./data/loadApps";
import { lazyInitMore } from "./ui/lazyInitMore";
import "./data/i18n";
import i18next from "i18next";

let onInit = true;

let onUpdate = false;
export let apps: App[] = [];

const topicsSelect = new SlimSelect({
  select: "#topic",
  placeholder: i18next.t("filter.topic"),
  onChange: () => {
    doUpdate(apps);
  },
});
const platformsSelect = new SlimSelect({
  select: "#platform",
  placeholder: i18next.t("filter.platform"),
  onChange: () => {
    doUpdate(apps);
  },
});
const languagesSelect = new SlimSelect({
  select: "#language",
  placeholder: i18next.t("filter.language"),
  onChange: () => {
    doUpdate(apps);
  },
});
const coverageSelect = new SlimSelect({
  select: "#coverage",
  placeholder: i18next.t("filter.coverage"),
  onChange: () => {
    doUpdate(apps);
  },
});

const freeCheckbox = document.getElementById("free") as HTMLInputElement;
freeCheckbox.addEventListener("change", () => {
  doUpdate(apps);
});
(document.getElementById("freeDisplay") as HTMLSpanElement).innerText =
  i18next.t("filter.free");

const searchElement = document.getElementById("search") as HTMLInputElement;
searchElement.placeholder = i18next.t("filter.search");
searchElement.addEventListener(
  "input",
  debounce(() => doUpdate(apps), 500)
);

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
  showSearch: false,
  placeholder: i18next.t("filter.category"),
  data: [
    {
      value: "all",
      innerHTML:
        "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> " +
        i18next.t("filter.category.all"),
      text: i18next.t("filter.category.all"),
    },
    {
      value: "focus",
      innerHTML:
        "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> " +
        i18next.t("filter.category.focus"),
      text: i18next.t("filter.category.focus"),
    },
    {
      value: "latest",
      innerHTML:
        "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> " +
        i18next.t("filter.category.latest"),
      text: i18next.t("filter.category.latest"),
    },
    {
      value: "mobile",
      innerHTML:
        "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> " +
        i18next.t("filter.category.mobile"),
      text: i18next.t("filter.category.mobile"),
    },
    {
      value: "navigation",
      innerHTML:
        "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> " +
        i18next.t("filter.category.navigation"),
      text: i18next.t("filter.category.navigation"),
    },
    {
      value: "edit",
      innerHTML:
        "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> " +
        i18next.t("filter.category.edit"),
      text: i18next.t("filter.category.edit"),
    },
  ],
  onChange: (i) => {
    document
      .querySelectorAll(".filter")
      .forEach((e) => e.classList.toggle("hidden", i.value === "focus"));
    doUpdate(apps, i.value === "focus");
  },
});

type State = {
  lang: string;
  freeOnly: boolean;
  category: "all" | "focus" | "latest" | "mobile" | "navigation" | "edit";
  search: string;
  topics: string[];
  platforms: string[];
  languages: string[];
  coverage: string[];
  view: "list" | "compare";
};

const lang = (findGetParameter("lang") || "en").toLowerCase();

function doUpdate(newApps: App[], reset?: boolean) {
  apps = newApps;
  if (!onUpdate) {
    onUpdate = true;
    if (reset) {
      searchElement.value = "";
      topicsSelect.set([]);
      platformsSelect.set([]);
      languagesSelect.set([]);
      coverageSelect.set([]);
    }
    let state: State = {
      lang,
      freeOnly: freeCheckbox.checked,
      search: searchElement.value,
      topics: topicsSelect.selected() as string[],
      platforms: platformsSelect.selected() as string[],
      languages: languagesSelect.selected() as string[],
      coverage: coverageSelect.selected() as string[],
      category: categorySelect.selected() as any,
      view: (document.getElementById("listView") as HTMLInputElement).checked
        ? "list"
        : "compare",
    };

    if (onInit) {
      const params = new URLSearchParams(location.search);

      state = {
        lang: params.get("lang") || "",
        freeOnly: params.get("freeOnly") === "1" ? true : false,
        search: params.get("search") || "",
        topics: params.get("topics")
          ? params.get("topics")?.split(",") || []
          : [],
        platforms: params.get("platforms")
          ? params.get("platforms")?.split(",") || []
          : [],
        languages: params.get("languages")
          ? params.get("languages")?.split(",") || []
          : [],
        coverage: params.get("coverage")
          ? params.get("coverage")?.split(",") || []
          : [],
        category: params.get("category") || "all",
        view: params.get("view") === "compare" ? "compare" : "list",
      };

      onInit = false;
    } else {
      updateState(state);
    }
    update(state);
    onUpdate = false;
  }
}

window.addEventListener("popstate", (e) => {
  onUpdate = true;
  update(e.state);
  onUpdate = false;
});

function updateState(state: State) {
  history.pushState(
    state,
    "",
    "?" +
      new URLSearchParams(
        [
          ["lang", state.lang === "en" ? "" : state.lang],
          ["freeOnly", state.freeOnly ? "1" : ""],
          ["category", state.category === "all" ? "" : state.category],
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

function update({
  freeOnly,
  category,
  search,
  topics,
  platforms,
  languages,
  coverage,
  view,
}: State) {
  categorySelect.set(category);

  updateDescription(category);

  getHtmlElement("#list").innerHTML = "";
  getHtmlElement("#compare").innerHTML = "";

  let filteredApps: App[] = apps.slice();

  freeCheckbox.checked = freeOnly;
  if (freeOnly) {
    filteredApps = filteredApps.filter((a) => a.gratis || a.libre);
  }

  if (category === "latest") {
    filteredApps = filteredApps.sort(function (a, b) {
      const nameA = a.source[0].lastChange.toUpperCase() || "";
      const nameB = b.source[0].lastChange.toUpperCase() || "";
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    });

    filteredApps = filteredApps.sort(function (a, b) {
      const nameA = a.lastRelease?.toUpperCase() || "";
      const nameB = b.lastRelease?.toUpperCase() || "";
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
      const nameA = a.source[0].lastChange.toUpperCase() || "";
      const nameB = b.source[0].lastChange.toUpperCase() || "";
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
          !filteredApps.some((a) =>
            equalsIgnoreCase(a.source[0].url, app.source[0].url)
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

  if (search)
    filteredApps = filteredApps.filter(
      (a) =>
        a.name.toUpperCase().search(search) !== -1 ||
        a.description.toUpperCase().search(search) !== -1 ||
        a.topics.filter((t) => t.toUpperCase().search(search) !== -1).length >
          0 ||
        a.platform.filter((t) => t.toUpperCase().search(search) !== -1).length >
          0 ||
        a.coverage.filter((t) => t.toUpperCase().search(search) !== -1).length >
          0
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

  updateDescription(category, filteredApps.length);

  const params = new URLSearchParams(location.search);
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

  for (const a of filteredApps) {
    topicsData.push(...a.topics.map((t) => t));
    platformsData.push(...a.platform.map((t) => t));
    coverageData.push(...a.coverage.map((t) => t));
  }

  for (const a of apps) {
    languagesData.push(...a.languages.map((l) => l));
  }

  topicsSelect.setData(prepareArrayForSelect(topicsData, topics));
  topicsSelect.set(topics);

  platformsSelect.setData(prepareArrayForSelect(platformsData, platforms));
  platformsSelect.set(platforms);

  languagesSelect.setData(prepareArrayForSelect(languagesData, languages));
  languagesSelect.set(languages);

  coverageSelect.setData(prepareArrayForSelect(coverageData, coverage));
  coverageSelect.set(coverage);

  switch (view) {
    case "list":
      (document.getElementById("listView") as HTMLInputElement).checked = true;
      (document.getElementById("compareView") as HTMLInputElement).checked =
        false;
      for (const a of filteredApps) {
        renderListView(a);
      }
      if (filteredApps.length === 0) {
        getHtmlElement("#list").appendChild(
          createElement("div", i18next.t("noResults"), ["no-results"])
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
      break;

    case "compare":
      (document.getElementById("listView") as HTMLInputElement).checked = false;
      (document.getElementById("compareView") as HTMLInputElement).checked =
        true;
      if (filteredApps.length === 0) {
        getHtmlElement("#compare").appendChild(
          createElement("div", i18next.t("noResults"), ["no-results"])
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
          a.name.toUpperCase().search(t) !== -1 ||
          a.description.toUpperCase().search(t) !== -1
      )
    );

    if (search)
      similarApps = similarApps.filter(
        (a) =>
          a.name.toUpperCase().search(search) !== -1 ||
          a.description.toUpperCase().search(search) !== -1 ||
          a.topics.filter((t) => t.toUpperCase().search(search) !== -1).length >
            0 ||
          a.platform.filter((t) => t.toUpperCase().search(search) !== -1)
            .length > 0 ||
          a.coverage.filter((t) => t.toUpperCase().search(search) !== -1)
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

function saveAppCatalog() {
  try {
    set(`${lang}-apps`, apps);
    set(`${lang}-apps-date`, new Date());
  } catch (e) {
    // Error occurs, perhaps the local storage is full. Clear and try again.
    localStorage.clear();
    set(`${lang}-apps`, apps);
    set(`${lang}-apps-date`, new Date());
  }
  console.info("added catalog to cache");

  //printJsonLd();
}

function printJsonLd() {
  console.info(
    JSON.stringify(
      apps
        .sort((a, b) => {
          const nameA = a.name.toUpperCase() || "";
          const nameB = b.name.toUpperCase() || "";
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }

          return 0;
        })
        .map((app) => ({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: app.name,
          description: app.description,
          image: app.images[0],
          url: app.website,
          downloadUrl: app.install.fDroidID
            ? "https://f-droid.org/repository/browse/?fdid=" +
              app.install.fDroidID
            : undefined || app.install.googlePlayID
            ? "https://play.google.com/store/apps/details?id=" +
              app.install.googlePlayID
            : undefined || app.install.asin
            ? "https://www.amazon.com/dp/" + app.install.asin
            : undefined || app.install.appleStoreID
            ? "https://apps.apple.com/app/" +
              app.install.appleStoreID?.toUpperCase().startsWith("ID")
              ? app.install.appleStoreID
              : `id${app.install.appleStoreID}`
            : undefined || app.install.macAppStoreID
            ? "https://apps.apple.com/app/" +
              app.install.macAppStoreID?.toUpperCase().startsWith("ID")
              ? app.install.macAppStoreID
              : `id${app.install.macAppStoreID}`
            : undefined || app.install.microsoftAppID
            ? "https://apps.microsoft.com/detail/" + app.install.microsoftAppID
            : undefined || app.install.huaweiAppGalleryID
            ? "https://appgallery.huawei.com/#/app/" +
              app.install.huaweiAppGalleryID
            : undefined,
          author: {
            "@type": "Person",
            name: app.author,
          },
          datePublished: app.lastRelease,
          license: app.license,
          applicationCategory: ["Map", ...app.topics].join(", "),
          operatingSystem: app.platform.join(", "),
        }))
    )
  );
}

async function getAppCatalog() {
  const date = get<Date>(`${lang}-apps-date`);

  const day = 24 * 60 * 60 * 1000;

  if (
    (date && new Date(date).valueOf() > Date.now() - day) ||
    !window.navigator.onLine
  ) {
    console.info("get catalog from cache");

    apps = get(`${lang}-apps`) || [];

    doUpdate(apps);
  }

  if (apps.length === 0) {
    console.info("load catalog from wiki");

    if (lang !== "en") {
      await loadApps(doUpdate, lang);
    }
    await loadApps(doUpdate);

    shuffle(apps);

    saveAppCatalog();
  }

  getHtmlElement("#loading").remove();
}

export function extendFilter(app: App) {
  if (app.images.length === 0 && !app.filter) {
    const defaultColor = textToColor(app.name);
    app.filter = new Solver(
      new Color(defaultColor.r, defaultColor.g, defaultColor.b)
    )
      .solve()
      .filter.replace(/filter:/gi, "filter: brightness(0%)");
  }
}

getAppCatalog();

function prepareArrayForSelect(names: string[], selected: string[]) {
  names.sort(function (a, b) {
    if (a.toUpperCase() < b.toUpperCase()) return -1;
    if (a.toUpperCase() > b.toUpperCase()) return 1;
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
