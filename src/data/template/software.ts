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
import { platformValueToDisplay } from "../../ui/platform";
import { languageValueToDisplay } from "../../ui/language";
import { removeDuplicates } from "../../ui/utilities/array";
import {
  appendFullStop,
  trim,
  firstLetterToUpperCase,
  toDate,
  equalsYes,
} from "../../ui/utilities/string";
import {
  App,
  processWikiText,
  extractRepo,
  splitByCommaButNotInsideBraceRegex,
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
    website: toUrl(source["web"]),
    documentation: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    source: [
      {
        name: `Wiki (Software) <i class="fas fa-pen"></i>`,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    author: processWikiText(source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    sourceCode: toUrl(
      extractRepo(source["repo"] || source["git"] || source["svn"])
    ),
    license: processWikiText(source["license"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => languageValueToDisplay(v)),
    languagesUrl: toUrl(source["languagesurl"]),
    topics: toValues(source["genre"]),
    platform: (source["platform"] || "")
      .replace(/\[\[/g, "")
      .replace(/\]\]/g, "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => platformValueToDisplay(v)),
    install: {
      asin: source["asin"],
      fDroidID: source["fDroidID"],
      googlePlayID: source["googlePlayID"],
      huaweiAppGalleryID: source["huaweiAppGalleryID"],
      appleStoreID: source["appleStoreID"],
      macAppStoreID: source["macAppStoreID"],
      microsoftAppID: source["microsoftAppID"],
    },
    map: {
      mapData: toValues(source["mapData"]),
      datasource: toValues(source["datasource"]),
      rotateMap: toValues(source["rotateMap"]),
      "3D": toValues(source["3D"]),
      showWebsite: toValues(source["showWebsite"]),
      showPhoneNumber: toValues(source["showPhoneNumber"]),
      showOpeningHours: toValues(source["showOpeningHours"]),
    },
    navigatingAndRouting: {
      turnLanes: toValues(source["turnLanes"]),
      navToPoint: toValues(source["navToPoint"]),
      findLocation: toValues(source["findLocation"]),
      findNearbyPOI: toValues(source["findNearbyPOI"]),
      predefinedRoute: toValues(source["predefinedRoute"]),
      createRouteManually: toValues(source["createRouteManually"]),
      createRouteViaWaypoints: toValues(source["createRouteViaWaypoints"]),
      calculateRoute: toValues(source["calculateRoute"]),
      calculateRouteOffline: toValues(source["calculateRouteOffline"]),
      profiles: toValues(source["profiles"]),
      turnRestrictions: toValues(source["turnRestrictions"]),
      voice: toValues(source["voice"]),
      keepOnRoad: toValues(source["keepOnRoad"]),
      withoutGPS: toValues(source["withoutGPS"]),
      routingProviders: toValues(source["routingProviders"]),
      avoidTraffic: toValues(source["avoidTraffic"]),
      trafficProvider: toValues(source["trafficProvider"]),
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

  if (
    equalsYes(source["createNotes"], source["viewNotes"], source["editNotes"])
  )
    obj.topics.push("Notes");

  obj.topics = removeDuplicates(obj.topics).sort();

  {
    const name = extractNameWebsiteWiki(source["name"], source.sourceWiki);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["web"], source.sourceWiki);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["wiki"], source.sourceWiki);
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

function toValues(value: string = "") {
  return value
    .split(splitByCommaButNotInsideBraceRegex)
    .map(trim)
    .filter((v) => v)
    .map(firstLetterToUpperCase);
}