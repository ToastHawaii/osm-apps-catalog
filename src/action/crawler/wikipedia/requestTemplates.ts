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

import { getJson } from "../../../utilities/jsonRequest";
import { findClosingBracketIndex } from "../../../utilities/string";

async function getCategoryMembers(
  category: string,
  language: string
): Promise<Set<string>> {
  let pages = new Set<string>();
  let continueToken = "";

  do {
    const params: {
      [name: string]: string;
    } = {
      list: "categorymembers",
      cmtitle: "Category:" + category,
      cmlimit: "max",
    };
    if (continueToken) {
      params["cmcontinue"] = continueToken;
    }

    const data = await osmMediaApiQuery(params, language);

    if (data.query?.categorymembers) {
      data.query.categorymembers.forEach((page: { title: string }) =>
        pages.add(page.title)
      );
    }

    continueToken = data.continue?.cmcontinue || "";
  } while (continueToken);

  return pages;
}

type Template = {
  [name: string]: string;
};

export async function requestTemplates(template: string, language: string) {
  const objects: Template[] = [];
  let con;

  const osmPages = await getCategoryMembers("OpenStreetMap", language);

  do {
    const params: {
      [name: string]: string;
    } = {
      list: "embeddedin",
      eititle: "Template:" + template,
      eilimit: "max",
    };
    if (con) params.eicontinue = con;

    const response = await osmMediaApiQuery(params, language);

    objects.push(
      ...(await processPagesByTemplateResult(
        response,
        template,
        language,
        osmPages
      ))
    );

    con = response.continue?.eicontinue;
  } while (con);

  return objects;
}

async function osmMediaApiQuery(
  params: { [name: string]: string },
  language: string
) {
  const base = `https://${language}.wikipedia.org/w/api.php`;

  params["action"] = "query";
  params["format"] = "json";

  return await getJson(base, params);
}

async function processPagesByTemplateResult(
  response: { continue: { eicontinue: any }; query: { embeddedin: any } },
  template: string,
  language: string,
  osmPages: Set<string>
) {
  const pages = response.query.embeddedin;

  const objects: Template[] = [];
  let ids = [];
  for (const p in pages) {
    if (osmPages.has(pages[p].title)) {
      ids.push(pages[p].pageid);
    }

    if (ids.length >= 50) {
      objects.push(...(await loadPages(ids, template, language)));
      ids = [];
    }
  }

  if (ids.length > 0) {
    objects.push(...(await loadPages(ids, template, language)));
  }

  return objects;
}

async function loadPages(ids: string[], template: string, language: string) {
  const params: { [name: string]: string } = {
    prop: "revisions",
    rvprop: "content|timestamp",
    pageids: ids.join("|"),
    rvslots: "*",
  };

  const response = await osmMediaApiQuery(params, language);

  const pages = response.query.pages;

  const objects: Template[] = [];
  for (const p in pages) {
    const content = pages[p].revisions[0].slots.main["*"];
    const pageObjects = parsePage(content, template);
    for (const o of pageObjects) {
      o.sourceWiki = pages[p].title;
      o.timestamp = pages[p].revisions[0].timestamp;
    }
    objects.push(...pageObjects);
  }
  return objects;
}

function parsePage(content: string, template: string) {
  const objects: Template[] = [];

  content = content.replace(/(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/g, "");

  const regexTemplate = new RegExp("{{" + template.replace(" ", "[_ ]"), "gi");
  let start = content.search(regexTemplate);

  while (start !== -1) {
    let templateContent = content.substring(start);

    const closing = findClosingBracketIndex(templateContent, 0);

    content = templateContent.substring(closing + 1);
    templateContent = templateContent.substring(0, closing + 1);

    templateContent = templateContent
      .substring(templateContent.indexOf("|"), templateContent.length - 2)
      .trim();

    const object = parseTemplateToObject(templateContent) as Template;
    objects.push(object);

    start = content.search(regexTemplate);
  }

  return objects;
}

function parseTemplateToObject(content: string) {
  const obj: Template = {};
  const props = content.split(/\|(?![^{]*})(?![^\[]*\])/g);
  props.shift();

  for (const p in props) {
    const pair = props[p].trim();
    const start = pair.indexOf("=");
    const name = pair.substring(0, start).trim();
    const value = pair.substring(start + 1).trim();

    if (value) obj[name] = value;
  }

  return obj;
}
