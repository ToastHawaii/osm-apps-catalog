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
import { languageValueFormat } from "../../ui/language";
import { removeDuplicates } from "../../ui/utilities/array";
import {
  appendFullStop,
  equalsYes,
  splitByCommaButNotInsideBraceRegex,
  toDate,
  trim,
} from "../../ui/utilities/string";
import {
  App,
  processWikiText,
  extractWebsite,
  extractNameWebsiteWiki,
} from "./utilities";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: extractNameWebsiteWiki(source["name"], source.sourceWiki).name,
    lastRelease: toDate(source["date"]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: [
      ...toWikimediaUrl(source["screenshot"], 250),
      ...toWikimediaUrl(source["logo"], 250),
    ],
    imageWiki: source["screenshot"] || source["logo"],
    website: toUrl(extractWebsite(source["slippy_web"])),
    documentation: toWikiUrl(source.sourceWiki) || "",
    source: [
      {
        name: "Layer",
        wiki: source.sourceWiki,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    sourceCode: toUrl(extractWebsite(source["repo"])),
    author: processWikiText(source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    languages: (source["tiles_languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => languageValueFormat(v)),
    languagesUrl: toUrl(source["tiles_languagesurl"]),
    genre: [],
    topics: [],
    platform: ["Web"],
    coverage: [],
    install: {},
    license: processWikiText(source["tiles_license"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    community: {
      issueTracker: toUrl(source["bugtracker_web"]),
    },
  } as any;

  if (!equalsYes(source["notlayer"])) {
    obj.topics.push("Tile layer");
    obj.genre.push("Tile layer");
  }
  if (source["slippy_web"]) {
    obj.topics.push("Slippy map");
    obj.genre.push("Slippy map");
  }

  obj.languages = removeDuplicates(obj.languages).sort();
  return obj;
}
