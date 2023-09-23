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
import { platformValueToDisplay } from "../platform";
import { languageValueToDisplay } from "../language";
import { removeDuplicates } from "../utilities/array";
import {
  appendFullStop,
  trim,
  firstLetterToUpperCase,
  toDate,
} from "../utilities/string";
import {
  App,
  processWikiText,
  extractRepo,
  splitByCommaButNotInsideBraceRegex,
  extractNameWebsiteWiki,
} from "./utilities";

export function transform(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    lastChange: source["timestamp"] || "",
    lastRelease: toDate(source["date"]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    website: toUrl(source["web"]),
    documentation: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    source: toWikiUrl(source.sourceWiki) || "",
    author: (source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => processWikiText(v))
      .join(", "),
    sourceCode: toUrl(
      extractRepo(source["repo"] || source["git"] || source["svn"])
    ),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => languageValueToDisplay(v)),
    languagesUrl: toUrl(source["languagesurl"]),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(firstLetterToUpperCase),
    platform: (source["platform"] || "")
      .replace(/\[\[/g, "")
      .replace(/\]\]/g, "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => platformValueToDisplay(v)),
    install: {
      asin: source["asin"],
      bbWorldID: source["bbWorldID"],
      fDroidID: source["fDroidID"],
      googlePlayID: source["googlePlayID"],
      appleStoreID: source["appleStoreID"],
      macAppStoreID: source["macAppStoreID"],
      microsoftAppID: source["microsoftAppID"],
    },
  };

  obj.platform = removeDuplicates(obj.platform).sort();
  obj.languages = removeDuplicates(obj.languages).sort();

  if (hasValue(source["profiles"]))
    obj.topics.push(
      ...(source["profiles"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
    );

  if (hasValue(source["datasource"]))
    obj.topics.push(
      ...(source["datasource"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
    );

  if (hasValue(source["accessibility"])) {
    obj.topics.push(
      ...(source["accessibility"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
    );
    obj.topics.push("Accessibility");
  }
  if (equalsYes(source["accessibility"])) obj.topics.push("Accessibility");

  if (equalsYes(source["tracking"])) obj.topics.push("Tracking");

  if (equalsYes(source["monitoring"])) obj.topics.push("Monitoring");

  if (equalsYes(source["navigating"], source["navToPoint"]))
    obj.topics.push("Navi");

  if (
    equalsYes(
      source["routing"],
      source["calculateRoute"],
      source["calculateRouteOffline"]
    )
  )
    obj.topics.push("Routing");

  if (equalsYes(source["3D"])) obj.topics.push("3D");
  if (equalsYes(source["findLocation"])) obj.topics.push("Search");
  if (equalsYes(source["findNearbyPOI"])) obj.topics.push("POI");

  if (
    equalsYes(
      source["addPOI"],
      source["addWay"],
      source["editPOI"],
      source["editTags"],
      source["editGeom"],
      source["editRelations"]
    )
  )
    obj.topics.push("Editor");

  obj.topics = removeDuplicates(obj.topics).sort();

  {
    const name = extractNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["web"]);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["wiki"]);
    obj.name = obj.name || name.name;
    obj.website = obj.website || name.website;
    obj.documentation = name.wiki || obj.documentation;
  }
  return obj;
}

function hasValue(value: string = "") {
  value = value.toUpperCase();
  return value && value !== "YES" && value !== "NO" && value !== "?";
}

function equalsYes(...values: (string | undefined)[]) {
  for (const value of values) if (value?.toUpperCase() === "YES") return true;

  return false;
}
