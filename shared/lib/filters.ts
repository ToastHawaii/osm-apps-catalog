import { equalsYes } from "@shared/utils/string";
import { App } from "../data/App";
import { some } from "@shared/utils/array";
import { upperCase } from "lodash";

export function display(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["DISPLAY", "VIEWING TOOL", "MAP VISUALIZATION"]);
}

const mobilePlatforms = [
  "ANDROID",
  "GARMIN",
  "KINDLE",
  "MAEMO",
  "MEEGO",
  "PALM OS",
  "SYMBIAN",
  "UBUNTU PHONE",
  "UBUNTU TOUCH",
  "WEBOS",
  "WINDOWS MOBILE",
  "WINDOWS PHONE",
  "IOS",
  "ZAURUS",
];

export function web(a: App) {
  const platform = a.cache?.platform || a.platform.map(upperCase);
  return platform.some((p) => p === "WEB");
}

export function mobile(a: App) {
  const platform = a.cache?.platform || a.platform.map(upperCase);
  return (
    some(platform, mobilePlatforms) ||
    a.install.asin ||
    a.install.fDroidID ||
    a.install.obtainiumLink ||
    a.install.googlePlayID ||
    a.install.huaweiAppGalleryID ||
    a.install.appleStoreID
  );
}

export function offlineUse(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["OFFLINE", "CACHE"]);
}

export function publicTransport(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "PUBLIC TRANSPORT",
    "PUBLIC TRANSPORTATION",
    "BUS",
    "TRAIN",
    "RAILWAY",
  ]);
}

export function winterSport(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["SKIING", "SKI", "WINTER SPORTS"]);
}

export function wheelchair(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["WHEELCHAIR"]);
}

export function universalMapApps(app: App) {
  /// universal maps: main goal is display map data
  return (
    display(app) &&
    equalsYes(app.map?.showWebsite) &&
    equalsYes(app.map?.showOpeningHours) &&
    // can calculate a route
    equalsYes(app.routing?.calculateRoute) &&
    // can find a location
    equalsYes(app.navigating?.findLocation) &&
    // and support some contributing
    equalsYes(
      app.editing?.addPOI,
      app.editing?.addWay,

      app.editing?.createNotes,

      app.editing?.editPOI,
      app.editing?.editGeom,
      app.editing?.editTags,
    )
  );
}

export function tourism(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  if (
    some(topics, [
      "TRAVEL",
      "TOURISM",
      "TOURISTS",
      "BENCHES",
      "CAMPING",
      "HOTELS",
      "CAMPERSITE",
      "WIKIVOYAGE",
      "WEBCAM",
    ])
  ) {
    return true;
  }

  // also show apps that support search, showing POIs and route planning for pedestrians
  return (
    topics.includes("SEARCH") &&
    topics.includes("POI") &&
    topics.includes("ROUTING") &&
    topics.includes("FOOT")
  );
}

export function hiking(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "HIKING",
    "HIKE",
    "HIKERS",
    "GUIDEPOSTS",
    "TREKKING",
    "HIKING TRAILS",
    "TOPOGRAPHY",
  ]);
}

export function food(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "FOOD",
    "RESTAURANT",
    "RESTAURANTS",
    "VEGAN",
    "BREWERY",
  ]);
}

export function divers(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "QUEER",
    "GENDER EQUALITY",
    "SOCIAL INCLUSION",
    "INFANT",
    "SOLIDARITY",
    "TOILET",
    "PUBLIC TOILET",
    "BLIND",
    "BENCHES",
    "STREET_LIGHTING",
    "LAMPS",
  ]);
}

export function cycling(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "CYCLING",
    "CYCLISTS",
    "BIKE",
    "BIKING",
    "BICYCLE",
    "MTB",
    "BICYCLE INFRASTRUCTURE",
  ]);
}

export function calcRoute(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "ROUTING",
    "ROUTER",
    "ROUTING TOOL",
    "ROUTE PLANNING SOFTWARE",
    "ROUTE PLANNING",
  ]);
}

export function navigation(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "NAVI",
    "GLOBAL NAVIGATION SATELLITE SYSTEM",
    "AUTOMOTIVE NAVIGATION SYSTEM",
    "MARINE NAVIGATION",
  ]);
}

export function contribute(a: App) {
  return (
    edit(a) ||
    trackRec(a) ||
    qa(a) ||
    changeset(a) ||
    contributePhoto(a) ||
    resolveNotes(a)
  );
}

export function contributePhoto(a: App) {
  return a.hasGoal?.crowdsourcingStreetLevelImagery;
}

export function resolveNotes(a: App) {
  return equalsYes(a.editing?.editNotes);
}

export function edit(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return (
    equalsYes(a.editing?.createNotes) ||
    some(topics, [
      "ADD POIS",
      "EDIT",
      "EDITING",
      "EDITOR",
      "EDITOR SOFTWARE",
      "EDITOR TOOL",
    ])
  );
}

export function trackRec(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "TRACK RECORDING",
    "TRACKER",
    "TRACKING",
    "TRACK LOGGING",
  ]);
}

export function qa(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "ANALYSE",
    "ANALYSER",
    "ANALYSIS",
    "DATA ANALYSIS",
    "COMPARING TOOL",
    "VALIDATOR",
    "QA",
    "QUALITY CONTROL",
    "CHANGESET REVIEW TOOL",
    "STATISTICS",
  ]);
}

export function changeset(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "HASHTAG TOOL",
    "MONITORING TOOL",
    "CHANGESET REVIEW TOOL",
    "WELCOMING TOOL",
  ]);
}

export function convert(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "EXPORT",
    "EXPORTER",
    "CONVERTER",
    "CONVERSION",
    "DATA CONVERSION",
    "RENDER",
    "RENDERER",
    "MAP RENDERER",
    "OPENSTREETMAP RENDERER",
  ]);
}

export function print(a: App) {
  const outputFormats = a.rendering?.rendererOutputFormats.map(upperCase) || [];
  if (some(outputFormats, ["SVG", "PDF", "PNG"])) {
    return true;
  }

  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["PRINT", "POSTER", "FIELDPAPERS", "3D PRINTING"]);
}

export function maps3D(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["3D"]);
}

export function isochrone(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, ["ISOCHRONES"]);
}

export function library(a: App) {
  const genre = a.genre.map(upperCase);
  if (some(genre, ["API"])) {
    return true;
  }

  const topics = a.cache?.topics || a.topics.map(upperCase);
  return some(topics, [
    "LIBRARY",
    "JAVA LIBRARY",
    "ANDROID LIBRARY",
    "ARDUINO LIBRARY",
    "PHP LIBRARY",
    "MATLAB LIBRARY",
    "GECODER LIBRARY",
    "COMPOSER LIBRARY",
    "COMPOSER PACKAGE",
    "PYTHON3 LIBRARY",
    "JULIA LIBRARY",
    "GOLANG LIBRARY",
    "ELIXIR LIBRARY",
    "PLATFORMIO LIBRARY",
    "CPP LIBRARY",
    "R PACKAGE",
    "NPM PACKAGE",
    "OPENSTREETMAP API",
    "OVERPASS API",
    "NOMINATIM API",
    "OSRM API",
  ]);
}

export function indoor(a: App) {
  const topics = a.cache?.topics || a.topics.map(upperCase);

  return some(topics, [
    "INDOOR",
    "INDOORS",
    "INDOORMAP",
    "INDOOR MAP",
    "INDOOR MAPS",
  ]);
}
