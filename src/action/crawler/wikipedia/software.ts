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
import {
  appendFullStop,
  trim,
  toDate,
  toValues,
  splitByCommaButNotInsideBraceRegex,
} from "../../../shared/utilities/string";
import {
  processWikiText,
  extractNameWebsiteWiki,
  extractWebsite,
} from "../../utilities";
import { App } from "../../../shared/data/App";
import { isFreeAndOpenSource } from "../../utilities/isFreeAndOpenSource";
import { languageFilter } from "../../utilities/languageFilter";
import { plainText } from "../wiki/plainText";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: plainText(
      extractNameWebsiteWiki(source["name"], source.sourceWiki).name
    ),
    lastRelease: toDate(source["latest release date "]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: [
      ...toWikimediaUrl(source["screenshot"], 250),
      ...toWikimediaUrl(source["logo"], 250),
    ],
    imageWiki: source["screenshot"] || source["logo"],
    website: toUrl(extractWebsite(source["website"])),
    documentation: toWikiUrl(source.sourceWiki) || "",
    source: [
      {
        name: "Wikipedia Software",
        wiki: source.sourceWiki,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    author: processWikiText(source["author"] || source["developer"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    sourceCode: toUrl(extractWebsite(source["repo"])),
    libre: isFreeAndOpenSource(source["license"]),
    license: processWikiText(source["license"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v),
    languages: (source["language"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(languageFilter)
      .map(languageValueFormat),
    genre: toValues(source["genre"]),
    topics: toValues(source["genre"]),
    platform: (source["operating system"] || "")
      .replace(/\[\[/g, "")
      .replace(/\]\]/g, "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim),
    coverage: [],
    install: {},
    community: {},
  } as any;

  return obj;
}
