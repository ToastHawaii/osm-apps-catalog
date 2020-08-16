import { getJson } from "./utilities/jsonRequest";
import { findClosingBracketIndex } from "./utilities/string";
import { createElement } from "./utilities/html";
import { toWikimediaUrl } from "./utilities/image";
import { toWikiUrl, toUrl } from "./utilities/url";

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
  const softwareRequest = requestTemplates("Software", (source, wiki) => {
    const obj: {
      name: string;
      description: string;
      image?: string;
      website?: string;
      wiki: string;
      languages: string[];
      themes: string[];
    } = {
      name: source["name"] || "",
      description: source["description"] || "",
      image: toWikimediaUrl(source["screenshot"]),
      website: toUrl(source["web"]),
      wiki: toWikiUrl(source["wiki"] || wiki) || "",
      languages: (source["languages"] || "").split(/;/).filter(v => v),
      themes: (source["genre"] || "")
        .split(";")
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

    render(obj);

    console.info(obj);
  });
  const serviceItemRequest = requestTemplates(
    "Service item",
    (source, wiki) => {
      const obj: {
        name: string;
        description: string;
        image?: string;
        website?: string;
        wiki: string;
        languages: string[];
        themes: string[];
      } = {
        name: source["name"] || "",
        description: source["descr"] || "",
        image: toWikimediaUrl(source["image"]),
        wiki: toWikiUrl(wiki) || "",
        languages: (source["lang"] || "")
          .split(/,+(?![^\(]*\))/)
          .map(v => {
            const match = /:(\w{2})/.exec(v);

            if (match) return match[1];
            return v;
          })
          .filter(v => v),
        themes: (source["genre"] || "")
          .split(/,+(?![^\(]*\))/)
          .map(v => v.replace(/^[\.\s]+|[\.\s]+$/gm, ""))
          .filter(v => v)
          .map(v => `${v[0].toUpperCase()}${v.slice(1)}`)
      };

      let name = processNameWebsiteWiki(source["name"]);
      obj.name = name.name || obj.name;
      obj.website = name.website;
      obj.wiki = obj.wiki || name.wiki || "";

      render(obj);

      console.info(obj);
    }
  );

  await softwareRequest;
  await serviceItemRequest;
})();

function render(obj: {
  name: string;
  description: string;
  image?: string | undefined;
  website?: string | undefined;
  wiki?: string | undefined;
  languages: string[];
  themes: string[];
}) {
  const element = createElement(
    "div",
    `<div class="header">
        <div class="name">${obj.name}</div>
        ${
          obj.image
            ? `<img class="img" src="${obj.image}"/>`
            : `<img class="img" src="https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png"/>`
        }
      </div>
      <div class="description">${obj.description}</div>
      ${
        obj.website
          ? `<a target="_blank" href="${obj.website}">Website</a>`
          : ""
      }
      ${obj.wiki ? `<a target="_blank" href="${obj.wiki}">Wiki</a>` : ""}
      <div class="themes">${obj.themes
        .map(t => {
          const background = textToColor(t);

          const yiq =
            (background.r * 299 + background.g * 587 + background.b * 114) /
            1000;

          return `<span class="thema" style="background: rgb(${background.r},${
            background.g
          },${background.b}); color:${
            yiq >= 128 ? "black" : "white"
          };">${t}</span>`;
        })
        .join("")}</div>`,
    ["app"]
  );

  document.body.appendChild(element);
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

function parseTemplateToObject(
  title: string,
  content: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  const obj: { [name: string]: string } = {};
  const props = content.split(/\|(?![^{]*})(?![^\[]*\])/g);
  props.shift();

  for (const p in props) {
    const pair = props[p].trim();
    const start = pair.indexOf("=");
    const name = pair.substring(0, start).trim();
    const value = pair.substring(start + 1).trim();

    if (value) obj[name] = value;
  }

  transform(obj, title);
}

function parsePage(
  title: string,
  content: string,
  template: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  //console.info(content);
  const start = content.search(
    new RegExp("{{" + template.replace(" ", "[_ ]"), "gi")
  );

  if (start === -1) return;

  let templateContent = content.substring(start);

  const closing = findClosingBracketIndex(templateContent, 0);

  const rest = templateContent.substring(closing + 1);
  templateContent = templateContent.substring(0, closing + 1);

  templateContent = templateContent
    .substring(templateContent.indexOf("|"), templateContent.length - 2)
    .trim();

  console.info(templateContent);
  parseTemplateToObject(title, templateContent, transform);

  parsePage(title, rest, template, transform);
}

async function loadPages(
  ids: string[],
  template: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  const params: { [name: string]: string } = {
    prop: "revisions",
    rvprop: "content",
    pageids: ids.join("|"),
    rvslots: "*"
  };

  const response = await osmMediaApiQuery(params);

  const pages = response.query.pages;
  for (const p in pages) {
    const content = pages[p].revisions[0].slots.main.content;
    parsePage(pages[p].title, content, template, transform);
  }
}

async function osmMediaApiQuery(params: { [name: string]: string }) {
  const base = "https://wiki.openstreetmap.org/w/api.php";

  params["origin"] = "*";
  params["action"] = "query";
  params["formatversion"] = "2";
  params["format"] = "json";

  return await getJson(base, params);
}

async function requestTemplates(
  template: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  const params = {
    list: "embeddedin",
    eititle: "Template:" + template,
    eilimit: "500"
  };

  const response = await osmMediaApiQuery(params);

  if (response.continue && response.continue.eicontinue)
    loadPagesByTemplatePage(response.continue.eicontinue, template, transform);

  return processPagesByTemplateResult(response, template, transform);
}

function processPagesByTemplateResult(
  response: { continue: { eicontinue: any }; query: { embeddedin: any } },
  template: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  const pages = response.query.embeddedin;
  let ids = [];
  for (const p in pages) {
    if (!/^\w{2}:/g.test(pages[p].title)) ids.push(pages[p].pageid);

    if (ids.length >= 50) {
      loadPages(ids, template, transform);
      ids = [];
    }
  }

  if (ids.length > 0) {
    loadPages(ids, template, transform);
  }
}

async function loadPagesByTemplatePage(
  con: string,
  template: string,
  transform: (obj: { [name: string]: string }, title: string) => void
) {
  const params = {
    list: "embeddedin",
    eititle: "Template:" + template,
    eicontinue: con,
    eilimit: "500"
  };

  const response = await osmMediaApiQuery(params);

  processPagesByTemplateResult(response, template, transform);
}
