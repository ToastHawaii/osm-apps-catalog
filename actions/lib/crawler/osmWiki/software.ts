import { toWikiUrl, toUrl } from "@shared/utils/url";
import { some } from "@shared/utils/array";
import {
  appendFullStop,
  trim,
  toDate,
  equalsYes,
  equalsIgnoreCase,
  toValues,
  splitByCommaButNotInsideBraceRegex,
  splitBySemicolonButNotInsideBraceRegex,
} from "@shared/utils/string";
import {
  processWikiText,
  extractNameWebsiteWiki,
  extractWebsite,
} from "./utils";
import { App } from "@shared/data/App";
import { uniq, upperFirst } from "lodash";
import { plainText } from "@shared/utils/plainText";
import { isFreeAndOpenSource } from "@actions/lib/isFreeAndOpenSource";
import { getPlatformDisplay } from "@actions/lib/getPlatformDisplay";
import { toWikimediaUrl } from "@actions/lib/image";
import { languageFilter } from "@actions/lib/languageFilter";
import { languageValueFormat } from "@actions/lib/languageValueFormat";
import { platformFilter } from "@actions/lib/platformFilter";

export function transform(
  source: Record<string, string> & {
    communicationChannels: Record<string, string>;
  },
) {
  const obj: App = {
    name: plainText(
      extractNameWebsiteWiki(source["name"], source.sourceWiki).name,
    ),
    unmaintained: equalsIgnoreCase(source["status"], "unmaintained"),
    lastRelease: toDate(source["date"]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    logos: toWikimediaUrl(source["logo"], 250),
    imageWiki: source["screenshot"] || source["logo"],
    website: toUrl(extractWebsite(source["web"])),
    documentation: toWikiUrl(source.sourceWiki) || "",
    source: [
      {
        name: "Software",
        language: source["language"].toLowerCase(),
        id: source.sourceWiki,
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
      extractWebsite(source["repo"] || source["git"] || source["svn"]),
    ),
    programmingLanguages: (source["code"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v),
    gratis: some(
      [source["price"]?.toUpperCase(), source["license"]?.toUpperCase()],
      ["GRATIS", "FREE", "0"],
    ),
    libre: isFreeAndOpenSource(source["license"]),
    price: source["price"],
    license: processWikiText(source["license"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: toUrl(source["languagesurl"]),
    genre: toValues(source["genre"]),
    topics: toValues(source["genre"]),
    platform: [
      ...(source["platform"] || "")
        .replace(/\[\[/g, "")
        .replace(/\]\]/g, "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim),
      source["asin"] ||
      source["fDroidID"] ||
      source["obtainiumLink"] ||
      source["googlePlayID"] ||
      source["huaweiAppGalleryID"]
        ? "Android"
        : "",
      source["appleStoreID"] ? "iOS" : "",
      source["macAppStoreID"] ? "Mac OS" : "",
      source["microsoftAppID"] ? "Windows" : "",
    ]
      .filter(platformFilter)
      .map((p) => getPlatformDisplay(p) || p),
    coverage: [],
    install: {
      asin: source["asin"],
      fDroidID: source["fDroidID"],
      obtainiumLink: source["obtainiumLink"],
      googlePlayID: source["googlePlayID"],
      huaweiAppGalleryID:
        (source["huaweiAppGalleryID"] || "").match(/\d+$/)?.[0] || "",
      appleStoreID: (source["appleStoreID"] || "").match(/\d+$/)?.[0] || "",
      macAppStoreID: (source["macAppStoreID"] || "").match(/\d+$/)?.[0] || "",
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
        .filter(languageFilter)
        .map(languageValueFormat),
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
      issueTracker: toUrl(
        extractWebsite(source.communicationChannels["issue tracker"]),
      ),
      githubDiscussions: source.communicationChannels["github discussions"],
      telegram: source.communicationChannels["telegram"],
      slack: toUrl(source.communicationChannels["slack url"]),
    },
  } as any;

  if (source["coverage"]) {
    const coverage = source["coverage"]
      .split(splitBySemicolonButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(upperFirst);

    obj.coverage.push(...coverage);
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
        .map(upperFirst),
    );

  if (equalsYes(source["3D"])) obj.topics.push("3D");

  if (
    equalsYes(
      source["showWebsite"],
      source["showPhoneNumber"],
      source["showOpeningHours"],
      source["findNearbyPOI"],
    )
  )
    obj.topics.push("POI");

  if (
    equalsYes(
      source["routing"],
      source["createRouteManually"],
      source["calculateRoute"],
      source["calculateRouteOffline"],
    )
  )
    obj.topics.push("Routing");

  if (hasValue(source["profiles"]))
    obj.topics.push(
      ...(source["profiles"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(upperFirst),
    );

  if (equalsYes(source["navigating"], source["navToPoint"]))
    obj.topics.push("Navi");

  if (equalsYes(source["findLocation"])) obj.topics.push("Search");

  if (equalsYes(source["tracking"])) obj.topics.push("Track logging");

  if (hasValue(source["geotagging"]))
    obj.topics.push(
      ...(source["geotagging"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(upperFirst),
    );

  if (equalsYes(source["monitoring"])) obj.topics.push("Track monitoring");

  if (source["rendererOutputFormats"]) obj.topics.push("Rendering");

  if (
    equalsYes(
      source["addPOI"],
      source["editPOI"],
      source["addWay"],
      source["editGeom"],
      source["editTags"],
      source["editRelations"],
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
        .map(upperFirst),
    );

  if (hasValue(source["accessibility"])) {
    obj.topics.push(
      ...(source["accessibility"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(upperFirst),
    );
    obj.topics.push("Accessibility");
  }
  if (equalsYes(source["accessibility"])) obj.topics.push("Accessibility");
  if (
    equalsYes(
      source["textOnlyUI"],
      source["brailleUI"],
      source["explorerMode"],
      source["screenReader"],
    )
  )
    obj.topics.push("Blind");

  obj.topics = uniq(obj.topics).sort();

  {
    const name = extractNameWebsiteWiki(source["name"], source.sourceWiki);
    obj.name = plainText(name.name || obj.name);
    obj.website = obj.website || name.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["web"], source.sourceWiki);
    obj.name = plainText(obj.name || name.name);
    obj.website = name.website || obj.website;
    obj.documentation = obj.documentation || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["wiki"], source.sourceWiki);
    obj.name = plainText(obj.name || name.name);
    obj.website = obj.website || name.website;
    obj.documentation = name.wiki || obj.documentation;
  }
  return obj;
}

function hasValue(value = "") {
  value = value.toUpperCase();
  return (
    value &&
    value !== "YES" &&
    value !== "NO" &&
    value !== "NONE" &&
    value !== "?"
  );
}
