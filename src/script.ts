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
import * as SlimSelect from "slim-select";
import { requestTemplates } from "./crawler";
import { transform as transformSoftware } from "./template/software";
import { transform as transformServiceItem } from "./template/serviceItem";
import { transform as transformLayer } from "./template/layer";
import { lazyLoadImages } from "./lazyLoadImages";
import { set, get } from "./utilities/storage";
import { render } from "./render";
import { removeDuplicates, shuffle, includes } from "./utilities/array";
import { equalsIgnoreCase } from "./utilities/string";
import { App, containsOfflineLink } from "./template/utilities";
import { findGetParameter as getParameterFromUrl } from "./utilities/url";
let onUpdate = false;
let apps: App[] = [];

const topicSelect = new (SlimSelect as any)({
  select: "#topic",
  placeholder: "Topic",
  onChange: () => {
    doUpdate();
  }
});
const platformSelect = new (SlimSelect as any)({
  select: "#platform",
  placeholder: "Platform",
  onChange: () => {
    doUpdate();
  }
});
const languageSelect = new (SlimSelect as any)({
  select: "#language",
  placeholder: "Language",
  onChange: () => {
    doUpdate();
  }
});

(document.getElementById("search") as HTMLInputElement).addEventListener(
  "input",
  () => {
    doUpdate();
  }
);

function doUpdate() {
  if (!onUpdate) {
    onUpdate = true;
    update(
      (document.getElementById("search") as HTMLInputElement).value,
      topicSelect.selected(),
      platformSelect.selected(),
      languageSelect.selected()
    );
    onUpdate = false;
  }
}

function update(
  search: string = "",
  topic: string[] = [],
  platform: string[] = [],
  language: string[] = []
) {
  getHtmlElement(".apps").innerHTML = "";

  let filteredApps = apps;

  search = search.toUpperCase();
  const topicUp = topic.map(t => t.toUpperCase());
  const platformUp = platform.map(t => t.toUpperCase());
  const languageUp = language.map(t => t.toUpperCase());

  if (search)
    filteredApps = filteredApps.filter(
      a =>
        a.name.toUpperCase().search(search) !== -1 ||
        a.description.toUpperCase().search(search) !== -1 ||
        a.topics.filter(t => t.toUpperCase().search(search) !== -1).length >
          0 ||
        a.platform.filter(t => t.toUpperCase().search(search) !== -1).length > 0
    );

  if (topicUp.length > 0)
    filteredApps = filteredApps.filter(a =>
      includes(
        a.topics.map(t => t.toUpperCase()),
        topicUp
      )
    );

  if (platformUp.length > 0)
    filteredApps = filteredApps.filter(a =>
      includes(
        a.platform.map(t => t.toUpperCase()),
        platformUp
      )
    );

  if (languageUp.length > 0)
    filteredApps = filteredApps.filter(a =>
      includes(
        a.languages.map(t => t.toUpperCase()),
        languageUp
      )
    );

  const topicData: string[] = [];
  const platformData: string[] = [];
  const languageData: string[] = [];

  for (const a of filteredApps) {
    topicData.push(...a.topics.map(t => t));
    platformData.push(...a.platform.map(t => t));
    languageData.push(...a.languages.map(l => l));
  }

  topicSelect.setData(prepareArrayForSelect(topicData, topic));
  topicSelect.set(topic);

  platformSelect.setData(prepareArrayForSelect(platformData, platform));
  platformSelect.set(platform);

  languageSelect.setData(prepareArrayForSelect(languageData, language));
  languageSelect.set(language);

  for (const a of filteredApps) {
    render(a);
  }

  if (topicUp.length > 0) {
    let similarApps = apps.filter(a => !filteredApps.includes(a));

    similarApps = similarApps.filter(a =>
      topicUp.every(
        t =>
          a.name.toUpperCase().search(t) !== -1 ||
          a.description.toUpperCase().search(t) !== -1
      )
    );

    if (search)
      similarApps = similarApps.filter(
        a =>
          a.name.toUpperCase().search(search) !== -1 ||
          a.description.toUpperCase().search(search) !== -1 ||
          a.topics.filter(t => t.toUpperCase().search(search) !== -1).length >
            0 ||
          a.platform.filter(t => t.toUpperCase().search(search) !== -1).length >
            0
      );

    if (platformUp.length > 0)
      similarApps = similarApps.filter(a =>
        includes(
          a.platform.map(t => t.toUpperCase()),
          platformUp
        )
      );

    if (languageUp.length > 0)
      similarApps = similarApps.filter(a =>
        includes(
          a.languages.map(t => t.toUpperCase()),
          languageUp
        )
      );

    if (similarApps.length > 0) {
      const similarTag = createElement("h2", "Related apps");
      getHtmlElement(".apps").appendChild(similarTag);

      for (const a of similarApps) {
        render(a);
      }
    }
  }

  lazyLoadImages();
}

const lang = (getParameterFromUrl("lang") || "en").toLowerCase();

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
  const duplicates = apps.filter(a => equalsIgnoreCase(a.name, obj.name));

  if (duplicates.length === 0) apps.push(obj);
  else {
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

    if (/List.of.OSM.based.services/gi.test(app.wiki))
      app.wiki = obj.wiki || app.wiki;

    app.author = app.author || obj.author;
    app.sourceCode = app.sourceCode || obj.sourceCode;

    app.install.asin = app.install.asin || obj.install.asin;
    app.install.bbWorldID = app.install.bbWorldID || obj.install.bbWorldID;
    app.install.fDroidID = app.install.fDroidID || obj.install.fDroidID;
    app.install.googlePlayID =
      app.install.googlePlayID || obj.install.googlePlayID;
    app.install.appleStoreID =
      app.install.appleStoreID || obj.install.appleStoreID;
    app.install.macAppStoreID =
      app.install.macAppStoreID || obj.install.macAppStoreID;
    app.install.microsoftAppID =
      app.install.microsoftAppID || obj.install.microsoftAppID;
  }
}

async function loadAppCatalog(language = "en") {
  const serviceItemObjects = await requestTemplates("Service item", language);
  for (const source of serviceItemObjects.filter(
    s => !containsOfflineLink(s["name"])
  )) {
    const obj: App = transformServiceItem(source);

    addApp(obj);
  }

  shuffle(apps);
  doUpdate();

  const layerObjects = await requestTemplates("Layer", language);
  for (const source of layerObjects.filter(
    s =>
      !(
        containsOfflineLink(s["name"]) || containsOfflineLink(s["slippy_web"])
      ) && !equalsIgnoreCase(s["discontinued"], "YES")
  )) {
    const obj: App = transformLayer(source);

    addApp(obj);
  }
  doUpdate();

  const softwareObjects = await requestTemplates("Software", language);
  for (const source of softwareObjects.filter(
    s =>
      !(containsOfflineLink(s["name"]) || containsOfflineLink(s["web"])) &&
      !equalsIgnoreCase(s["status"], "BROKEN")
  )) {
    const obj: App = transformSoftware(source);

    addApp(obj);
  }
  doUpdate();
}

getAppCatalog();

function prepareArrayForSelect(names: string[], selected: string[]) {
  names.sort();
  const nameCounts: { name: string; count: number }[] = [];
  for (const name of names) {
    const nameCountFiltered = nameCounts.filter(nc =>
      equalsIgnoreCase(nc.name, name)
    );

    if (nameCountFiltered.length > 0) {
      nameCountFiltered[0].count++;
    } else {
      nameCounts.push({ name: name, count: 1 });
    }
  }

  return nameCounts.map(t => {
    if (selected.filter(s => equalsIgnoreCase(t.name, s)).length > 0)
      return { value: t.name, text: t.name };
    else return { value: t.name, text: `${t.name} (${t.count})` };
  });
}
