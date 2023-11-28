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
import SlimSelect from "slim-select";
import { lazyLoadImages } from "./ui/lazyLoadImages";
import { set, get } from "./ui/utilities/storage";
import { render as renderListView } from "./ui/views/list";
import { shuffle, includes } from "./ui/utilities/array";
import { equalsIgnoreCase, textToColor } from "./ui/utilities/string";
import { App } from "./data/template/utilities";
import { findGetParameter as getParameterFromUrl } from "./ui/utilities/url";
import { Solver } from "./ui/utilities/coloriz/Solver";
import { Color } from "./ui/utilities/coloriz/Color";
import { edit, mobile, navigation } from "./ui/utilities/filter";
import { render as renderCompareView } from "./ui/views/compare";
import { loadApps } from "./data/loadApps";
import { lazyInitMore } from "./ui/lazyInitMore";

let onUpdate = false;
export let apps: App[] = [];

const topicSelect = new SlimSelect({
  select: "#topic",
  placeholder: "Topic",

  onChange: () => {
    doUpdate(apps);
  },
});
const platformSelect = new SlimSelect({
  select: "#platform",
  placeholder: "Platform",
  onChange: () => {
    doUpdate(apps);
  },
});
const languageSelect = new SlimSelect({
  select: "#language",
  placeholder: "Language",
  onChange: () => {
    doUpdate(apps);
  },
});

(document.getElementById("search") as HTMLInputElement).addEventListener(
  "input",
  () => {
    doUpdate(apps);
  }
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
  placeholder: "Category",
  data: [
    {
      value: "all",
      innerHTML:
        "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> All",
      text: "All",
    },
    {
      value: "focus",
      innerHTML:
        "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> Focus",
      text: "Focus",
    },
    {
      value: "latest",
      innerHTML:
        "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> Latest",
      text: "Latest",
    },
    {
      value: "mobile",
      innerHTML:
        "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> To go",
      text: "To go",
    },
    {
      value: "navigation",
      innerHTML:
        "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> Find your way",
      text: "Find your way",
    },
    {
      value: "edit",
      innerHTML:
        "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> Contribute",
      text: "Contribute",
    },
  ].map((c) => {
    return { ...c, selected: c.value === document.location.hash.slice(1) };
  }),
  onChange: () => {
    doUpdate(apps, true);
  },
});

function doUpdate(newApps: App[], reset?: boolean) {
  apps = newApps;
  if (!onUpdate) {
    onUpdate = true;
    if (reset) {
      (document.getElementById("search") as HTMLInputElement).value = "";
      topicSelect.set([]);
      platformSelect.set([]);
      languageSelect.set([]);
    }
    update(
      (document.getElementById("search") as HTMLInputElement).value,
      topicSelect.selected(),
      platformSelect.selected(),
      languageSelect.selected(),
      categorySelect.selected()
    );
    onUpdate = false;
  }
}

function update(
  search: string = "",
  topic: string[] = [],
  platform: string[] = [],
  language: string[] = [],
  category: "all" | "focus" | "latest" | "mobile" | "navigation" | "edit"
) {
  if (category === "all") {
    document.location.hash = "";
  } else {
    document.location.hash = category;
  }

  let description = "";
  if (category === "all") {
    description =
      "Shows all apps found on the OpenStreetMap wiki and taginfo in random order.";
  } else if (category === "focus") {
    description = "Shows ten apps from the most recently updated pages.";
  } else if (category === "latest") {
    description = "Shows all apps ordered by last release date.";
  } else if (category === "mobile") {
    description =
      "Shows apps developed for mobile devices or that support offline use.";
  } else if (category === "navigation") {
    description = "Shows apps that support routing or navigation.";
  } else if (category === "edit") {
    description =
      "Shows apps that support adding, editing or analysing OpenStreetMap data or recording geotracks.";
  }
  getHtmlElement(".description").innerHTML = description;

  getHtmlElement("#list").innerHTML = "";
  getHtmlElement("#compare").innerHTML = "";

  let filteredApps: App[];

  if (category === "latest") {
    filteredApps = apps.slice().sort(function (a, b) {
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
    let latestApps = apps.slice().sort(function (a, b) {
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
  } else {
    filteredApps = apps.slice();
  }

  search = search.toUpperCase();
  const topicUp = topic.map((t) => t.toUpperCase());
  const platformUp = platform.map((t) => t.toUpperCase());
  const languageUp = language.map((t) => t.toUpperCase());

  if (search)
    filteredApps = filteredApps.filter(
      (a) =>
        a.name.toUpperCase().search(search) !== -1 ||
        a.description.toUpperCase().search(search) !== -1 ||
        a.topics.filter((t) => t.toUpperCase().search(search) !== -1).length >
          0 ||
        a.platform.filter((t) => t.toUpperCase().search(search) !== -1).length >
          0
    );

  if (topicUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(
        a.topics.map((t) => t.toUpperCase()),
        topicUp
      )
    );

  if (platformUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(
        a.platform.map((t) => t.toUpperCase()),
        platformUp
      )
    );

  if (languageUp.length > 0)
    filteredApps = filteredApps.filter((a) =>
      includes(
        a.languages.map((t) => t.toUpperCase()),
        languageUp
      )
    );

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

  const topicData: string[] = [];
  const platformData: string[] = [];
  const languageData: string[] = [];

  for (const a of filteredApps) {
    topicData.push(...a.topics.map((t) => t));
    platformData.push(...a.platform.map((t) => t));
    languageData.push(...a.languages.map((l) => l));
  }

  topicSelect.setData(prepareArrayForSelect(topicData, topic));
  topicSelect.set(topic);

  platformSelect.setData(prepareArrayForSelect(platformData, platform));
  platformSelect.set(platform);

  languageSelect.setData(prepareArrayForSelect(languageData, language));
  languageSelect.set(language);

  if ((document.getElementById("compareView") as HTMLInputElement).checked) {
    renderCompareView(filteredApps, lang);
    setTimeout(() => {
      lazyInitMore(true);
    }, 0);
  }

  if ((document.getElementById("listView") as HTMLInputElement).checked) {
    for (const a of filteredApps) {
      renderListView(a);
    }

    if (topicUp.length > 0) {
      let similarApps = apps.filter((a) => !filteredApps.includes(a));

      similarApps = similarApps.filter((a) =>
        topicUp.every(
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
            a.topics.filter((t) => t.toUpperCase().search(search) !== -1)
              .length > 0 ||
            a.platform.filter((t) => t.toUpperCase().search(search) !== -1)
              .length > 0
        );

      if (platformUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(
            a.platform.map((t) => t.toUpperCase()),
            platformUp
          )
        );

      if (languageUp.length > 0)
        similarApps = similarApps.filter((a) =>
          includes(
            a.languages.map((t) => t.toUpperCase()),
            languageUp
          )
        );

      if (similarApps.length > 0) {
        const similarTag = createElement("h2", "Related apps");
        getHtmlElement("#list").appendChild(similarTag);

        for (const a of similarApps) {
          renderListView(a);
        }
      }
    }
  }

  setTimeout(() => {
    lazyLoadImages(true);
  }, 0);
}

const lang = (getParameterFromUrl("lang") || "en").toLowerCase();

function saveAppCatalog() {
  set(`${lang}-apps`, apps);
  set(`${lang}-apps-date`, new Date());
  console.info("add catalog to cache");
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
            ? "https://itunes.apple.com/app/" +
              app.install.appleStoreID?.toUpperCase().startsWith("ID")
              ? app.install.appleStoreID
              : `id${app.install.appleStoreID}`
            : undefined || app.install.macAppStoreID
            ? "https://itunes.apple.com/app/" +
              app.install.macAppStoreID?.toUpperCase().startsWith("ID")
              ? app.install.macAppStoreID
              : `id${app.install.macAppStoreID}`
            : undefined || app.install.microsoftAppID
            ? "http://www.windowsphone.com/s?appid=" +
              app.install.microsoftAppID
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

  if (date && new Date(date).valueOf() > Date.now() - day) {
    console.info("get catalog from cache");

    apps = get(`${lang}-apps`) || [];

    doUpdate(apps);
  }

  if (apps.length === 0) {
    console.info("load catalog from wiki");

    if (lang !== "en") await loadApps(doUpdate, lang);
    await loadApps(doUpdate);

    shuffle(apps);

    saveAppCatalog();
  }
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
