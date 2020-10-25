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

import { toWikimediaUrl } from "../utilities/image";
import { toWikiUrl, toUrl } from "../utilities/url";
import { languageValueToDisplay } from "../language";
import { removeDuplicates } from "../utilities/array";
import { appendFullStop, toDate, trim } from "../utilities/string";
import {
  App,
  processWikiText,
  extractRepo,
  splitByCommaButNotInsideBraceRegex,
  extractWebsite
} from "./utilities";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    lastChange: source["timestamp"] || "",
    lastRelease: toDate(source["date"] )|| "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    website: toUrl(extractWebsite(source["slippy_web"])),
    wiki: toWikiUrl(source.sourceWiki) || "",
    sourceWiki: toWikiUrl(source.sourceWiki) || "",
    sourceCode: toUrl(extractRepo(source["repo"])),
    author: (source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => processWikiText(v))
      .join(", "),
    languages: (source["tiles_languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => languageValueToDisplay(v)),
    languagesUrl: toUrl(source["tiles_languagesurl"]),
    topics: [],
    platform: ["Web"],
    install: {}
  };

  obj.languages = removeDuplicates(obj.languages).sort();
  return obj;
}
