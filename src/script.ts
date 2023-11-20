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

import { createElement, getHtmlElement } from "./utilities/html";
import SlimSelect from "slim-select";
import { requestTemplates } from "./crawler";
import { transform as transformSoftware } from "./template/software";
import { transform as transformServiceItem } from "./template/serviceItem";
import { transform as transformLayer } from "./template/layer";
import { lazyLoadImages } from "./lazyLoadImages";
import { set, get } from "./utilities/storage";
import { render } from "./render";
import { removeDuplicates, shuffle, includes } from "./utilities/array";
import { equalsIgnoreCase, equalsYes, textToColor } from "./utilities/string";
import { App, containsOfflineLink } from "./template/utilities";
import { findGetParameter as getParameterFromUrl } from "./utilities/url";
import { Solver } from "./utilities/coloriz/Solver";
import { Color } from "./utilities/coloriz/Color";
import { edit, mobile, navigation } from "./utilities/filter";
import { template } from "./templateData";

export type LocalizedValue =
  | string
  | {
      [x: string]: string | undefined;
    };

/**
 * Returns a loacalised value based on the current set locale. 
 * @example {
			"en": "https://about.openki.net/en/ueber-uns/spenden/",
			"de": "https://about.openki.net/ueber-uns/spenden/"
		}
 */
export function getLocalizedValue(
  setting: LocalizedValue | undefined | null,
  locale: string
) {
  if (!setting) {
    return undefined;
  }

  if (typeof setting === "string") {
    return setting;
  }

  if (setting[locale]) {
    // excact match found
    return setting[locale];
  }

  const parts = locale.split("-");
  if (parts.length > 1) {
    if (setting[parts[0]]) {
      // found eg. "de" for "de-CH"
      return setting[locale];
    }
  }

  // fallback take first
  return setting[Object.keys(setting)[0]];
}

let onUpdate = false;
let apps: App[] = [];

const topicSelect = new SlimSelect({
  select: "#topic",
  placeholder: "Topic",
  onChange: () => {
    doUpdate();
  },
});
const platformSelect = new SlimSelect({
  select: "#platform",
  placeholder: "Platform",
  onChange: () => {
    doUpdate();
  },
});
const languageSelect = new SlimSelect({
  select: "#language",
  placeholder: "Language",
  onChange: () => {
    doUpdate();
  },
});

(document.getElementById("search") as HTMLInputElement).addEventListener(
  "input",
  () => {
    doUpdate();
  }
);

(document.getElementById("listView") as HTMLInputElement).addEventListener(
  "input",
  () => {
    doUpdate();
  }
);
(document.getElementById("compareView") as HTMLInputElement).addEventListener(
  "input",
  () => {
    doUpdate();
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
    doUpdate(true);
  },
});

function doUpdate(reset?: boolean) {
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

  getHtmlElement("#apps").innerHTML = "";
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
    compare(filteredApps);
  }

  if ((document.getElementById("listView") as HTMLInputElement).checked) {
    for (const a of filteredApps) {
      render(a);
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
        getHtmlElement("#apps").appendChild(similarTag);

        for (const a of similarApps) {
          render(a);
        }
      }
    }
  }

  lazyLoadImages();
}

const lang = (getParameterFromUrl("lang") || "en").toLowerCase();

function compare(filteredApps: App[]) {
  for (const p of Object.entries(template.params)) {
    const element = createElement(
      "tr",
      [
        `<td title="${getLocalizedValue(p[1].description, "en") || ""}">${
          getLocalizedValue(p[1].label, "en") || p[0]
        }</td>`,
        ...filteredApps.map((a) => `<td>${a.params?.[p[0]] || ""}</td>`),
      ].join("")
    );

    getHtmlElement("#compare").appendChild(element);
  }
}

function saveAppCatalog() {
  set(`${lang}-apps`, apps);
  set(`${lang}-apps-date`, new Date());
  console.info("add catalog to cache");
}

async function getAppCatalog() {
  const date = get<Date>(`${lang}-apps-date`);

  const day = 24 * 60 * 60 * 1000;

  if (date && new Date(date).valueOf() > Date.now() - day) {
    console.info("get catalog from cache");

    apps = get(`${lang}-apps`) || [];

    doUpdate();
  }

  if (apps.length === 0) {
    console.info("load catalog from wiki");

    if (lang !== "en") await loadAppCatalog(lang);
    await loadAppCatalog();

    shuffle(apps);

    saveAppCatalog();
  }
}

function addApp(obj: App) {
  const duplicates = apps.filter(
    (app) =>
      equalsIgnoreCase(app.name, obj.name) ||
      (app.website && obj.website && equalsIgnoreCase(app.website, obj.website))
  );

  if (duplicates.length === 0) {
    apps.push(obj);
    extendFilter(obj);
  } else {
    const app = duplicates[0];

    if (app.lastRelease && obj.lastRelease && app.lastRelease < obj.lastRelease)
      app.lastRelease = obj.lastRelease;
    else app.lastRelease = app.lastRelease || obj.lastRelease;

    app.description = app.description || obj.description;
    app.images.push(...obj.images);
    app.images = removeDuplicates(app.images);
    app.languages.push(...obj.languages);
    app.languages = removeDuplicates(app.languages);

    app.topics.push(...obj.topics);
    app.topics = removeDuplicates(app.topics);

    app.platform.push(...obj.platform);
    app.platform = removeDuplicates(app.platform);

    app.website = app.website || obj.website;

    if (!app.documentation) {
      app.documentation = obj.documentation;
    } else if (/List.of.OSM.based.services/gi.test(app.documentation)) {
      app.documentation = obj.documentation || app.documentation;
    }

    // make the first source the newest
    if (
      app.source[0].lastChange.toUpperCase() >
      obj.source[0].lastChange.toUpperCase()
    ) {
      app.source = [...app.source, ...obj.source];
    } else {
      app.source = [...obj.source, ...app.source];
    }

    app.author = app.author || obj.author;
    app.sourceCode = app.sourceCode || obj.sourceCode;

    app.install.asin = app.install.asin || obj.install.asin;
    app.install.fDroidID = app.install.fDroidID || obj.install.fDroidID;
    app.install.googlePlayID =
      app.install.googlePlayID || obj.install.googlePlayID;
    app.install.huaweiAppGalleryID =
      app.install.huaweiAppGalleryID || obj.install.huaweiAppGalleryID;
    app.install.appleStoreID =
      app.install.appleStoreID || obj.install.appleStoreID;
    app.install.macAppStoreID =
      app.install.macAppStoreID || obj.install.macAppStoreID;
    app.install.microsoftAppID =
      app.install.microsoftAppID || obj.install.microsoftAppID;

    app.params = { ...obj, ...app };

    extendFilter(app);
  }
}

function extendFilter(app: App) {
  if (app.images.length === 0 && !app.filter) {
    const defaultColor = textToColor(app.name);
    app.filter = new Solver(
      new Color(defaultColor.r, defaultColor.g, defaultColor.b)
    )
      .solve()
      .filter.replace(/filter:/gi, "filter: brightness(0%)");
  }
}

async function loadAppCatalog(language = "en") {
  const serviceItemObjectsRequest = requestTemplates("Service item", language);
  const layerObjectsRequest = requestTemplates("Layer", language);
  const softwareObjectsRequest = requestTemplates("Software", language);

  const serviceItemObjects = await serviceItemObjectsRequest;
  for (const source of serviceItemObjects.filter(
    (s) => !containsOfflineLink(s["name"])
  )) {
    const obj: App = transformServiceItem(source);

    addApp(obj);
  }

  shuffle(apps);
  doUpdate();

  const layerObjects = await layerObjectsRequest;
  for (const source of layerObjects.filter(
    (s) =>
      !containsOfflineLink(s["name"]) &&
      !containsOfflineLink(s["slippy_web"]) &&
      !equalsYes(s["discontinued"])
  )) {
    const obj: App = transformLayer(source);

    addApp(obj);
  }
  doUpdate();

  const softwareObjects = await softwareObjectsRequest;
  for (const source of softwareObjects.filter(
    (s) =>
      !containsOfflineLink(s["name"]) &&
      !containsOfflineLink(s["web"]) &&
      !equalsIgnoreCase(s["status"], "unfinished") &&
      !equalsIgnoreCase(s["status"], "unmaintained") &&
      !equalsIgnoreCase(s["status"], "broken")
  )) {
    const obj: App = transformSoftware(source);

    addApp(obj);
  }
  doUpdate();

  const projectObjects = window.tagInfoProjectsResponse as {
    url: string;
    data_until: string;
    data: {
      id: string;
      name: string;
      project_url: string;
      icon_url: string;
      doc_url: string;
      description: string;
      key_entries: number;
      tag_entries: number;
      unique_keys: number;
      unique_tags: number;
    }[];
  };
  const source = "https://taginfo.openstreetmap.org/projects";
  for (const obj of projectObjects.data) {
    const app: App = {
      name: obj.name,
      website: obj.project_url,
      images: obj.icon_url ? [obj.icon_url] : [],
      documentation: obj.doc_url,
      source: [
        { name: "taginfo", url: source, lastChange: projectObjects.data_until },
      ],
      description: obj.description,
      topics: [],
      languages: [],
      platform: [],
      install: {},
      params: obj,
    };

    addApp(app);
  }
  doUpdate();
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
