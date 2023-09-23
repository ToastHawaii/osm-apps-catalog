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

import { getJson } from "./utilities/jsonRequest";
import { findClosingBracketIndex, equalsIgnoreCase } from "./utilities/string";

type Template = {
  [name: string]: string;
};

export async function requestTemplates(template: string, language: string) {
  const objects: Template[] = [];
  let con;

  do {
    const params: {
      [name: string]: string;
    } = {
      list: "embeddedin",
      eititle: "Template:" + template,
      eilimit: "500",
    };
    if (con) params.eicontinue = con;

    const response = await osmMediaApiQuery(params);

    objects.push(
      ...(await processPagesByTemplateResult(response, template, language))
    );

    con = response.continue?.eicontinue;
  } while (con);

  return objects;
}

async function osmMediaApiQuery(params: { [name: string]: string }) {
  const base = "https://wiki.openstreetmap.org/w/api.php";

  params["origin"] = "*";
  params["action"] = "query";
  params["formatversion"] = "2";
  params["format"] = "json";

  return await getJson(base, params);
}

async function processPagesByTemplateResult(
  response: { continue: { eicontinue: any }; query: { embeddedin: any } },
  template: string,
  language: string
) {
  const pages = response.query.embeddedin;

  const objects: Template[] = [];
  let ids = [];
  for (const p in pages) {
    if (equalsIgnoreCase(language, "en")) {
      if (
        !/^(af|ast|az|id|ms|bs|br|ca|cs|da|de|et|en|es|eo|eu|fr|fy|gl|hr|ia|is|it|ht|gcf|ku|lv|lb|lt|hu|nl|no|nn|oc|pl|pt|ro|sq|sk|sl|sr-latn|fi|sv|tl|vi|tr|diq|el|be|bg|mk|mn|ru|sr|uk|hy|he|ar|fa|ps|ne|bn|ta|ml|si|th|my|ka|ko|tzm|zh-hans|zh-hant|ja|yue):/gi.test(
          pages[p].title
        )
      )
        ids.push(pages[p].pageid);
    } else if (new RegExp(`^${language}:`, "ig").test(pages[p].title))
      ids.push(pages[p].pageid);

    if (ids.length >= 50) {
      objects.push(...(await loadPages(ids, template)));
      ids = [];
    }
  }

  if (ids.length > 0) {
    objects.push(...(await loadPages(ids, template)));
  }

  return objects;
}

async function loadPages(ids: string[], template: string) {
  const params: { [name: string]: string } = {
    prop: "revisions",
    rvprop: "content|timestamp",
    pageids: ids.join("|"),
    rvslots: "*",
  };

  const response = await osmMediaApiQuery(params);

  const pages = response.query.pages;

  const objects: Template[] = [];
  for (const p in pages) {
    const content = pages[p].revisions[0].slots.main.content;
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

    objects.push(parseTemplateToObject(templateContent));

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
