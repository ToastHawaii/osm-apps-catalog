import { createElement, getHtmlElement } from "./utilities/html";
import * as SlimSelect from "slim-select";
import { requestTemplates } from "./crawler";
import "./lazyLoadImages";
import {
  transformServiceItem,
  transformSoftware,
  App,
  containsOfflineLink
} from "./transformTemplates";
import { lazyLoadImages } from "./lazyLoadImages";
import { set, get } from "./utilities/storage";

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

function saveAppCatalog() {
  set("apps", apps);
  set("apps-date", new Date());
  console.info("add catalog to cache");
}

function getAppCatalog() {
  const date = get<Date>("apps-date");

  const day = 24 * 1000 * 60 * 60;

  if (date && new Date(date).valueOf() > Date.now() - day) {
    console.info("get catalog from cache");

    apps = get("apps") || [];
    update((document.getElementById("search") as HTMLInputElement).value);
  }

  if (apps.length === 0) {
    console.info("load catalog from wiki");
    loadAppCatalog();
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
    app.image = app.image || obj.image;
    app.languages.push(...obj.languages);
    app.languages = removeDuplicates(app.languages);

    app.topics.push(...obj.topics);
    app.topics = removeDuplicates(app.topics);

    app.website = app.website || obj.website;
    app.wiki = obj.wiki || app.wiki;
    app.sourceCode = app.sourceCode || obj.sourceCode;
  }
}

async function loadAppCatalog() {
  const serviceItemObjects = await requestTemplates("Service item");
  for (const source of serviceItemObjects.filter(
    s => !containsOfflineLink(s["name"] || "")
  )) {
    const obj: App = transformServiceItem(source);

    addApp(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);

  const softwareObjects = await requestTemplates("Software");

  for (const source of softwareObjects.filter(
    s =>
      !(
        containsOfflineLink(s["name"] || "") ||
        containsOfflineLink(s["web"] || "")
      )
  )) {
    const obj: App = transformSoftware(source);

    addApp(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);

  shuffleArray(apps);

  saveAppCatalog();
}

getAppCatalog();

function render(obj: {
  name: string;
  description: string;
  image: { thumb?: string; orginal?: string };
  website?: string;
  wiki?: string;
  sourceCode?: string;
  languages: string[];
  topics: string[];
}) {
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";

  const element = createElement(
    "div",
    `<div class="header">
        <div class="name">${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${obj.name}</a>`
            : obj.name
        }</div>
        ${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${
                obj.image.thumb
                  ? `<img class="img" src="${defaultImage}" dynamic-src="${obj.image.thumb} ${obj.image.orginal} ${defaultImage}"/>`
                  : `<img class="img" src="${defaultImage}"/>`
              }</a>`
            : obj.image.thumb
            ? `<img class="img" src="${defaultImage}" dynamic-src="${obj.image.thumb} ${obj.image.orginal} ${defaultImage}"/>`
            : `<img class="img" src="${defaultImage}"/>`
        }
      </div>
      <div class="description">${obj.description}</div>
      ${
        obj.website
          ? `<a class="link" href="${obj.website}" target="_blank"><i class="far fa-map"></i></a>`
          : ""
      }
      ${
        obj.wiki
          ? `<a class="link" href="${obj.wiki}" target="_blank"><i class="fas fa-atlas"></i></a>`
          : ""
      }
      ${
        obj.sourceCode
          ? `<a class="link" href="${obj.sourceCode}" target="_blank"><i class="far fa-file-code"></i></a>`
          : ""
      }
      <div class="topics">${obj.topics
        .map(t => {
          const background = textToColor(t);

          const yiq =
            (background.r * 299 + background.g * 587 + background.b * 114) /
            1000;

          return `<span class="topic" style="background: rgb(${background.r},${
            background.g
          },${background.b}); color:${
            yiq >= 128 ? "black" : "white"
          };">${t}</span>`;
        })
        .join("")}</div>`,
    ["app"]
  );

  getHtmlElement(".apps").appendChild(element);
}

function textToColor(s: string) {
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = 0; i < s.length; i++) {
    if (i % 3 === 0) r = (r + s.charCodeAt(i)) % 256;
    else if (i % 3 === 1) g = (g + s.charCodeAt(i)) % 256;
    else b = (b + s.charCodeAt(i)) % 256;
  }
  return { r, g, b };
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
