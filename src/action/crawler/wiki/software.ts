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
import { toWikiUrl, toUrl } from "../../../utilities/url";
import { platformValueToDisplay } from "../../utilities/platform";
import { languageValueFormat } from "../../utilities/languageValueFormat";
import { some } from "../../../utilities/array";
import {
  appendFullStop,
  trim,
  firstLetterToUpperCase,
  toDate,
  equalsYes,
  equalsIgnoreCase,
  toValues,
  splitByCommaButNotInsideBraceRegex,
} from "../../../utilities/string";
import {
  processWikiText,
  extractNameWebsiteWiki,
  extractWebsite,
} from "../../utilities";
import { App } from "../../../data/App";
import { isOpenSource } from "./isOpenSource";
import { uniq } from "lodash";

export function transform(
  source: { [name: string]: string } & {
    communicationChannels: { [name: string]: string };
  }
) {
  const obj: App = {
    name: extractNameWebsiteWiki(source["name"], source.sourceWiki).name,
    unmaintained: equalsIgnoreCase(source["status"], "unmaintained"),
    lastRelease: toDate(source["date"]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: [
      ...toWikimediaUrl(source["screenshot"], 250),
      ...toWikimediaUrl(source["logo"], 250),
    ],
    imageWiki: source["screenshot"] || source["logo"],
    website: toUrl(extractWebsite(source["web"])),
    documentation: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    source: [
      {
        name: "Software",
        wiki: source.sourceWiki,
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
      extractWebsite(source["repo"] || source["git"] || source["svn"])
    ),
    gratis: some([source["price"], source["license"]], ["gratis", "free", "0"]),
    libre: isOpenSource(source["license"]),
    price: source["price"],
    license: processWikiText(source["license"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => languageValueFormat(v)),
    languagesUrl: toUrl(source["languagesurl"]),
    genre: toValues(source["genre"]),
    topics: toValues(source["genre"]),
    platform: (source["platform"] || "")
      .replace(/\[\[/g, "")
      .replace(/\]\]/g, "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map((v) => platformValueToDisplay(v)),
    coverage: [],
    install: {
      asin: source["asin"],
      fDroidID: source["fDroidID"],
      obtainiumLink: source["obtainiumLink"],
      googlePlayID: source["googlePlayID"],
      huaweiAppGalleryID: source["huaweiAppGalleryID"],
      appleStoreID: source["appleStoreID"],
      macAppStoreID: source["macAppStoreID"],
      microsoftAppID: source["microsoftAppID"],
    },
    map: {
      map: toValues(source["map"]),
      mapData: toValues(source["mapData"]),
      datasource: toValues(source["datasource"]),
      rotateMap: toValues(source["rotateMap"]),
      "3D": toValues(source["3D"]),
      showWebsite: toValues(source["showWebsite"]),
      showPhoneNumber: toValues(source["showPhoneNumber"]),
      showOpeningHours: toValues(source["showOpeningHours"]),
    },
    routing: {
      routing: toValues(source["routing"]),
      createRouteManually: toValues(source["createRouteManually"]),
      calculateRoute: toValues(source["calculateRoute"]),
      createRouteViaWaypoints: toValues(source["createRouteViaWaypoints"]),
      profiles: toValues(source["profiles"]),
      turnRestrictions: toValues(source["turnRestrictions"]),
      calculateRouteOffline: toValues(source["calculateRouteOffline"]),
      routingProviders: toValues(source["routingProviders"]),
      avoidTraffic: toValues(source["avoidTraffic"]),
      trafficProvider: toValues(source["trafficProvider"]),
    },
    navigating: {
      navigating: toValues(source["navigating"]),
      findLocation: toValues(source["findLocation"]),
      findNearbyPOI: toValues(source["findNearbyPOI"]),
      navToPoint: toValues(source["navToPoint"]),
      voice: toValues(source["voice"]),
      keepOnRoad: toValues(source["keepOnRoad"]),
      turnLanes: toValues(source["turnLanes"]),
      withoutGPS: toValues(source["withoutGPS"]),
      predefinedRoute: toValues(source["predefinedRoute"]),
    },
    tracking: {
      tracking: toValues(source["tracking"]),
      customInterval: toValues(source["customInterval"]),
      trackFormats: toValues(source["trackFormats"] || source["formats"]),
      geotagging: toValues(source["geotagging"]),
      fastWayPointAdding: toValues(source["fastWayPointAdding"]),
      uploadGPX: toValues(source["uploadGPX"]),
    },
    monitoring: {
      monitoring: toValues(source["monitoring"]),
      showTrack: toValues(source["showTrack"]),
      showExistingTrack: toValues(source["showExistingTrack"]),
      showAltitudeDiagram: toValues(source["showAltitudeDiagram"]),
      showDOP: toValues(source["showDOP"]),
      showSatellites: toValues(source["showSatellites"]),
      showNMEAlive: toValues(source["showNMEAlive"]),
      showSpeed: toValues(source["showSpeed"]),
      sendPosition: toValues(source["sendPosition"]),
    },
    editing: {
      addPOI: toValues(source["addPOI"]),
      editPOI: toValues(source["editPOI"]),
      addWay: toValues(source["addWay"]),
      editGeom: toValues(source["editGeom"]),
      editTags: toValues(source["editTags"]),
      editRelations: toValues(source["editRelations"]),
      viewNotes: toValues(source["viewNotes"]),
      createNotes: toValues(source["createNotes"]),
      editNotes: toValues(source["editNotes"]),
      editSource: toValues(source["editSource"]),
      offsetDBsupport: toValues(source["offsetDBsupport"]),
      uploadOSMData: toValues(source["uploadOSMData"]),
    },
    rendering: {
      rendererOutputFormats: toValues(source["rendererOutputFormats"]),
    },
    accessibility: {
      accessibility: toValues(source["accessibility"]),
      textOnlyUI: toValues(source["textOnlyUI"]),
      brailleUI: toValues(source["brailleUI"]),
      explorerMode: toValues(source["explorerMode"]),
      publicTransportMode: toValues(source["publicTransportMode"]),
      dangerWarnings: toValues(source["dangerWarnings"]),
      screenReader: toValues(source["screenReader"]),
      screenReaderLang: (source["screenReaderLang"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map((v) => languageValueFormat(v)),
    },
    community: {
      forum: source.communicationChannels["forum"],
      forumTag: source.communicationChannels["forum tag"],
      irc: source.communicationChannels["irc channel"]
        ? {
            server: source.communicationChannels["irc server"],
            channel: source.communicationChannels["irc channel"],
          }
        : undefined,
      matrix: source.communicationChannels["matrix room"],
      bluesky: source.communicationChannels["bluesky handle"],
      mastodon: source.communicationChannels["mastodon address"],
      issueTracker: toUrl(source.communicationChannels["issue tracker"]),
      githubDiscussions: source.communicationChannels["github discussions"],
      telegram: source.communicationChannels["telegram"],
      slack: toUrl(source.communicationChannels["slack url"]),
    },
  } as any;

  if (source["coverage"]) {
    const coverage = source["coverage"]
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(firstLetterToUpperCase);

    let entry = [];
    for (let index = 0; index < coverage.length; index++) {
      entry.push(coverage[index]);
      obj.coverage.push(entry.join(", "));
    }
  }

  obj.platform = uniq(obj.platform).sort();
  obj.languages = uniq(obj.languages).sort();
  obj.coverage = uniq(obj.coverage).sort();

  if (hasValue(source["datasource"]))
    obj.topics.push(
      ...(source["datasource"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
    );

  if (equalsYes(source["3D"])) obj.topics.push("3D");

  if (
    equalsYes(
      source["showWebsite"],
      source["showPhoneNumber"],
      source["showOpeningHours"],
      source["findNearbyPOI"]
    )
  )
    obj.topics.push("POI");

  if (
    equalsYes(
      source["routing"],
      source["createRouteManually"],
      source["calculateRoute"],
      source["calculateRouteOffline"]
    )
  )
    obj.topics.push("Routing");

  if (hasValue(source["profiles"]))
    obj.topics.push(
      ...(source["profiles"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(firstLetterToUpperCase)
    );

  if (equalsYes(source["navigating"], source["navToPoint"]))
    obj.topics.push("Navi");

  if (equalsYes(source["findLocation"])) obj.topics.push("Search");

  if (equalsYes(source["tracking"])) obj.topics.push("Track logging");

  if (equalsYes(source["monitoring"])) obj.topics.push("Track monitoring");

  if (source["rendererOutputFormats"]) obj.topics.push("Rendering");

  if (
    equalsYes(
      source["addPOI"],
      source["editPOI"],
      source["addWay"],
      source["editGeom"],
      source["editTags"],
      source["editRelations"]
    )
  )
    obj.topics.push("Editor");

  if (
    equalsYes(source["viewNotes"], source["createNotes"], source["editNotes"])
  )
    obj.topics.push("Notes");

  if (hasValue(source["editSource"]))
    obj.topics.push(
      ...(source["editSource"] || "")
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
  if (
    equalsYes(
      source["textOnlyUI"],
      source["brailleUI"],
      source["explorerMode"],
      source["screenReader"]
    )
  )
    obj.topics.push("Blind");

  obj.topics = uniq(obj.topics).sort();

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
  return (
    value &&
    value !== "YES" &&
    value !== "NO" &&
    value !== "NONE" &&
    value !== "?"
  );
}
