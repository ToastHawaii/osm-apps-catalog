import { createElement, getHtmlElement } from "./utilities/html";
import { toWikimediaUrl } from "./utilities/image";
import { toWikiUrl, toUrl } from "./utilities/url";

import * as SlimSelect from "slim-select";
import { requestTemplates } from "./crawler";

type App = {
  name: string;
  description: string;
  image?: string;
  website?: string;
  wiki: string;
  languages: string[];
  topics: string[];
};

let onUpdate = false;
const apps: App[] = [];
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

  topicData = topicData.filter((c, index) => {
    return topicData.indexOf(c) === index;
  });

  languageData = languageData.filter((c, index) => {
    return languageData.indexOf(c) === index;
  });

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

  for (const a of filteredApps.slice(0, 20)) {
    render(a);
  }
}

function processNameWebsiteWiki(value: string = "") {
  const obj: {
    name: string;
    website?: string;
    wiki?: string;
  } = { name: value };

  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.website = match[2];
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[6];
      obj.website = match[2];
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /\[\[(.*)\]\]/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  return obj;
}

(async function () {
  const serviceItemObjects = await requestTemplates("Service item");
  for (const source of serviceItemObjects) {
    const obj: App = {
      name: source["name"] || "",
      description: source["descr"] || "",
      image: toWikimediaUrl(source["image"]),
      wiki: toWikiUrl(source.sourceWiki) || "",
      languages: (source["lang"] || "")
        .split(/,+(?![^\(]*\))/)
        .map(v => {
          const match = /:(\w{2})/.exec(v);

          if (match) return match[1];
          return v;
        })
        .map(v => v.replace(/^[\.\s]+|[\.\s]+$/gm, ""))
        .filter(v => v)
        .map(v => v.toLowerCase()),
      topics: (source["genre"] || "")
        .split(/,+(?![^\(]*\))/)
        .map(v => v.replace(/^[\.\s]+|[\.\s]+$/gm, ""))
        .filter(v => v)
        .map(v => `${v[0].toUpperCase()}${v.slice(1)}`)
    };

    let name = processNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = name.website;
    obj.wiki = obj.wiki || name.wiki || "";

    apps.push(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);

  const softwareObjects = await requestTemplates("Software");

  for (const source of softwareObjects) {
    const obj: App = {
      name: source["name"] || "",
      description: source["description"] || "",
      image: toWikimediaUrl(source["screenshot"]),
      website: toUrl(source["web"]),
      wiki: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
      languages: (source["languages"] || "")
        .split(/[;,]/)
        .map(v => v.replace(/^[\.\s]+|[\.\s]+$/gm, ""))
        .map(v => {
          const match = /(\w{2,3})-/.exec(v);

          if (match) return match[1];
          return v;
        })
        .filter(v => v)
        .map(v => v.toLowerCase()),
      topics: (source["genre"] || "")
        .split(/[;,]/)
        .map(v => v.replace(/^[\.\s]+|[\.\s]+$/gm, ""))
        .filter(v => v)
        .map(v => `${v[0].toUpperCase()}${v.slice(1)}`)
    };

    let name = processNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.wiki = obj.wiki || name.wiki || "";

    name = processNameWebsiteWiki(source["web"]);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.wiki = obj.wiki || name.wiki || "";

    name = processNameWebsiteWiki(source["wiki"]);
    obj.name = obj.name || name.name;
    obj.website = obj.website || name.website;
    obj.wiki = name.wiki || obj.wiki;

    apps.push(obj);
  }
  update((document.getElementById("search") as HTMLInputElement).value);
})();

function render(obj: {
  name: string;
  description: string;
  image?: string | undefined;
  website?: string | undefined;
  wiki?: string | undefined;
  languages: string[];
  topics: string[];
}) {
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
                obj.image
                  ? `<img class="img" src="${obj.image}"/>`
                  : `<img class="img" src="https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png"/>`
              }</a>`
            : obj.image
            ? `<img class="img" src="${obj.image}"/>`
            : `<img class="img" src="https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png"/>`
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
