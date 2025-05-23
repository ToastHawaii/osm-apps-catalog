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

import { toWikimediaUrl } from "../../utilities/image";
import { toWikiUrl, toUrl } from "../../../shared/utilities/url";
import { languageValueFormat } from "../../utilities/languageValueFormat";
import { uniq, upperFirst } from "lodash";
import {
  appendFullStop,
  trim,
  startsWithIgnoreCase,
  splitByCommaButNotInsideBraceRegex,
  splitBySemicolonButNotInsideBraceRegex,
} from "../../../shared/utilities/string";
import {
  processWikiText,
  extractNameWebsiteWiki,
  extractWebsite,
  extractLanguageCodeFromTemplate,
} from "./utilities";
import { App } from "../../../shared/data/App";
import { plainText } from "./plainText";
import { languageFilter } from "../../utilities/languageFilter";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: plainText(
      extractNameWebsiteWiki(source["name"], source.sourceWiki).name
    ),
    description: appendFullStop(processWikiText(source["descr"] || "")),
    images: toWikimediaUrl(source["image"], 250),
    logos: [],
    imageWiki: source["image"],
    source: [
      {
        name: "ServiceItem",
        wiki: source.sourceWiki,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    sourceCode: toUrl(extractWebsite(source["material"])),
    libre: startsWithIgnoreCase(source["material"], "{{yes"),
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: toUrl(extractWebsite(source["lang"])),
    genre: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(upperFirst)
      .sort(),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(upperFirst)
      .sort(),
    platform: [],
    coverage: [],
    install: {},
    community: {},
  } as any;

  if (source["region"]) {
    obj.coverage.push(
      ...source["region"]
        .split(splitBySemicolonButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(upperFirst)
    );
  }

  obj.languages = uniq(obj.languages).sort();
  obj.coverage = uniq(obj.coverage).sort();
  obj.topics = uniq(obj.topics).sort();

  let name = extractNameWebsiteWiki(source["name"], source.sourceWiki);
  obj.name = plainText(name.name || obj.name);
  obj.website = name.website;
  obj.documentation = name.wiki || obj.documentation;
  return obj;
}
