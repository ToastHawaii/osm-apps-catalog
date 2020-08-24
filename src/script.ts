import { getHtmlElement } from "./utilities/html";
import * as SlimSelect from "slim-select";
import { requestTemplates } from "./crawler";
import "./lazyLoadImages";
import {
  transformServiceItem,
  transformSoftware,
  App,
  containsOfflineLink,
  transformLayer
} from "./transformTemplates";
import { lazyLoadImages } from "./lazyLoadImages";
import { set, get } from "./utilities/storage";
import { render } from "./render";

let onUpdate = false;
let apps: App[] = [];
const topicSelect = new (SlimSelect as any)({
  select: "#topic",
  placeholder: "Topic",
  onChange: () => {
    if (!onUpdate) {
      onUpdate = true;
      update(
        (document.getElementById("search") as HTMLInputElement).value,
        topicSelect.selected(),
        languageSelect.selected()
      );
      onUpdate = false;
    }
  }
});
const languageSelect = new (SlimSelect as any)({
  select: "#language",
  placeholder: "Language",
  onChange: () => {
    if (!onUpdate) {
      onUpdate = true;
      update(
        (document.getElementById("search") as HTMLInputElement).value,
        topicSelect.selected(),
        languageSelect.selected()
      );
      onUpdate = false;
    }
  }
});

(document.getElementById("search") as HTMLInputElement).addEventListener(
  "input",
  () => {
    if (!onUpdate) {
      onUpdate = true;
      update(
        (document.getElementById("search") as HTMLInputElement).value,
        topicSelect.selected(),
        languageSelect.selected()
      );
      onUpdate = false;
    }
  }
);

function includesArray(arr: any[], target: any[]) {
  return target.every(v => arr.includes(v));
}
export function removeDuplicates<T>(arr: T[]) {
  return arr.filter((c, index) => {
    return arr.indexOf(c) === index;
  });
}

function update(
  search: string = "",
  topic: string[] = [],
  language: string[] = []
) {
  getHtmlElement(".apps").innerHTML = "";

  let topicData: string[] = [];
  let languageData: string[] = [];

  let filteredApps = apps;

  search = search.toUpperCase();
  const topicUp = topic.map(t => t.toUpperCase());
  const languageUp = language.map(t => t.toUpperCase());

  if (search)
    filteredApps = filteredApps.filter(
      a =>
        a.name.toUpperCase().search(search) !== -1 ||
        a.description.toUpperCase().search(search) !== -1 ||
        a.topics.filter(t => t.toUpperCase().search(search) !== -1).length > 0
    );

  if (topicUp.length > 0)
    filteredApps = filteredApps.filter(a =>
      includesArray(
        a.topics.map(t => t.toUpperCase()),
        topicUp
      )
    );

  if (languageUp.length > 0)
    filteredApps = filteredApps.filter(a =>
      includesArray(
        a.languages.map(t => t.toUpperCase()),
        languageUp
      )
    );

  if (search)
    filteredApps = filteredApps.filter(
      a =>
        a.name.toUpperCase().search(search) !== -1 ||
        a.description.toUpperCase().search(search) !== -1 ||
        a.topics.filter(t => t.toUpperCase().search(search) !== -1).length > 0
    );

  for (const a of filteredApps) {
    topicData.push(...a.topics.map(t => t));
    languageData.push(...a.languages.map(l => l));
  }

  topicData = removeDuplicates(topicData);
  languageData = removeDuplicates(languageData);

  topicData.sort();
  languageData.sort();

  topicSelect.setData(
    topicData.map(t => {
      return { value: t, text: t };
    })
  );
  topicSelect.set(topic);

  languageSelect.setData(
    languageData.map(t => {
      return { value: t, text: t };
    })
  );
  languageSelect.set(language);

  for (const a of filteredApps) {
    render(a);
  }

  lazyLoadImages();
}

const lang = (findGetParameter("lang") || "en").toLowerCase();

function saveAppCatalog() {
  set(`${lang}-apps`, apps);
  set(`${lang}-apps-date`, new Date());
  console.info("add catalog to cache");
}

async function getAppCatalog() {
  const date = get<Date>(`${lang}-apps-date`);

  const day = 24 * 1000 * 60 * 60;

  if (date && new Date(date).valueOf() > Date.now() - day) {
    console.info("get catalog from cache");

    apps = get(`${lang}-apps`) || [];
    update((document.getElementById("search") as HTMLInputElement).value);
  }

  if (apps.length === 0) {
    console.info("load catalog from wiki");

    if (lang !== "en") await loadAppCatalog(lang);
    await loadAppCatalog();

    shuffleArray(apps);

    saveAppCatalog();
  }
}

function addApp(obj: App) {
  const duplicates = apps.filter(
    a => a.name.toUpperCase() === obj.name.toUpperCase()
  );

  if (duplicates.length === 0) apps.push(obj);
  else {
    const app = duplicates[0];

    app.description = app.description || obj.description;
    app.images.push(...obj.images);
    app.images = removeDuplicates(app.images);
    app.languages.push(...obj.languages);
    app.languages = removeDuplicates(app.languages);

    app.topics.push(...obj.topics);
    app.topics = removeDuplicates(app.topics);

    app.website = app.website || obj.website;

    if (/List_of_OSM-based_services/g.test(app.wiki))
      app.wiki = obj.wiki || app.wiki;
    app.sourceCode = app.sourceCode || obj.sourceCode;
  }
}

async function loadAppCatalog(language = "en") {
  const serviceItemObjects = await requestTemplates("Service item", language);
  for (const source of serviceItemObjects.filter(
    s => !containsOfflineLink(s["name"] || "")
  )) {
    const obj: App = transformServiceItem(source);

    addApp(obj);
  }

  shuffleArray(apps);
  update((document.getElementById("search") as HTMLInputElement).value);

  const layerObjects = await requestTemplates("Layer", language);

  for (const source of layerObjects.filter(
    s =>
      !(
        containsOfflineLink(s["name"] || "") ||
        containsOfflineLink(s["slippy_web"] || "")
      ) && !((s["discontinued"] || "").toUpperCase() === "YES")
  )) {
    const obj: App = transformLayer(source);

    addApp(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);

  const softwareObjects = await requestTemplates("Software", language);

  for (const source of softwareObjects.filter(
    s =>
      !(
        containsOfflineLink(s["name"] || "") ||
        containsOfflineLink(s["web"] || "")
      ) && !((s["status"] || "").toUpperCase() === "BROKEN")
  )) {
    const obj: App = transformSoftware(source);

    addApp(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);
}

getAppCatalog();

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function findGetParameter(parameterName: string) {
  let result: string | undefined;
  let tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
