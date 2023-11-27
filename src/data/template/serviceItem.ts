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

import { toWikimediaUrl } from "../../ui/utilities/image";
import { toWikiUrl, toUrl } from "../../ui/utilities/url";
import { languageValueToDisplay } from "../../ui/language";
import { removeDuplicates } from "../../ui/utilities/array";
import {
  appendFullStop,
  trim,
  firstLetterToUpperCase,
} from "../../ui/utilities/string";
import {
  App,
  processWikiText,
  splitByCommaButNotInsideBraceRegex,
  extractNameWebsiteWiki,
  extractWebsite,
  extractLanguageCodeFromTemplate,
} from "./utilities";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: extractNameWebsiteWiki(source["name"], source.sourceWiki).name,

    description: appendFullStop(processWikiText(source["descr"] || "")),
    images: toWikimediaUrl(source["image"], 250),
    imageWiki: source["image"],
    source: [
      {
        name: "ServiceItem",
        wiki: source.sourceWiki,
        displayName: `Wiki (ServiceItem) <i class="fas fa-pen"></i>`,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    sourceCode: toUrl(extractWebsite(source["material"])),
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter((v) => v)
      .map((v) => languageValueToDisplay(v)),
    languagesUrl: toUrl(extractWebsite(source["lang"])),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(firstLetterToUpperCase)
      .sort(),
    platform: [],
    install: {},
  };

  if (source["region"])
    obj.topics.push(
      `Coverage: ${source["region"]
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
        .join(", ")}`
    );

  obj.languages = removeDuplicates(obj.languages).sort();
  obj.topics = removeDuplicates(obj.topics).sort();

  let name = extractNameWebsiteWiki(source["name"], source.sourceWiki);
  obj.name = name.name || obj.name;
  obj.website = name.website;
  obj.documentation = name.wiki || obj.documentation;
  return obj;
}
