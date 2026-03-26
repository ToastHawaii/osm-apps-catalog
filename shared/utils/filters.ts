import { equalsYes } from "@shared/utils/string";
import { App } from "../data/App";

export function display(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["DISPLAY", "VIEWING TOOL", "MAP VISUALIZATION"].includes(t),
  );
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
  const platform = a.cache?.platform || a.platform.map((p) => p.toUpperCase());
  return platform.some((p) => p === "WEB");
}

export function mobile(a: App) {
  const platform = a.cache?.platform || a.platform.map((p) => p.toUpperCase());
  return (
    platform.some((t) => mobilePlatforms.includes(t)) ||
    a.install.asin ||
    a.install.fDroidID ||
    a.install.obtainiumLink ||
    a.install.googlePlayID ||
    a.install.huaweiAppGalleryID ||
    a.install.appleStoreID
  );
}

export function offlineUse(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) => ["OFFLINE", "CACHE"].includes(t));
}

export function publicTransport(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "PUBLIC TRANSPORT",
      "PUBLIC TRANSPORTATION",
      "BUS",
      "TRAIN",
      "RAILWAY",
    ].includes(t),
  );
}

export function winterSport(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) => ["SKIING", "SKI", "WINTER SPORTS"].includes(t));
}

export function wheelchair(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) => ["WHEELCHAIR"].includes(t));
}

export function universalMapApps(app: App) {
  /// universal maps: main goal is display map data
  return (
    display(app) &&
    equalsYes(...(app.map?.showWebsite || [])) &&
    equalsYes(...(app.map?.showOpeningHours || [])) &&
    // can calculate a route
    equalsYes(...(app.routing?.calculateRoute || [])) &&
    // can find a location
    equalsYes(...(app.navigating?.findLocation || [])) &&
    // and support some contributing
    equalsYes(
      ...[
        ...(app.editing?.addPOI || []),
        ...(app.editing?.addWay || []),

        ...(app.editing?.createNotes || []),

        ...(app.editing?.editPOI || []),
        ...(app.editing?.editGeom || []),
        ...(app.editing?.editTags || []),
      ],
    )
  );
}

export function tourism(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  if (
    topics.some((t) =>
      [
        "TRAVEL",
        "TOURISM",
        "TOURISTS",
        "BENCHES",
        "CAMPING",
        "HOTELS",
        "CAMPERSITE",
        "WIKIVOYAGE",
        "WEBCAM",
      ].includes(t),
    )
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
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "HIKING",
      "HIKE",
      "HIKERS",
      "GUIDEPOSTS",
      "TREKKING",
      "HIKING TRAILS",
      "TOPOGRAPHY",
    ].includes(t),
  );
}

export function food(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["FOOD", "RESTAURANT", "RESTAURANTS", "VEGAN", "BREWERY"].includes(t),
  );
}

export function divers(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
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
    ].includes(t),
  );
}

export function cycling(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "CYCLING",
      "CYCLISTS",
      "BIKE",
      "BIKING",
      "BICYCLE",
      "MTB",
      "BICYCLE INFRASTRUCTURE",
    ].includes(t),
  );
}

export function calcRoute(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "ROUTING",
      "ROUTER",
      "ROUTING TOOL",
      "ROUTE PLANNING SOFTWARE",
      "ROUTE PLANNING",
    ].includes(t),
  );
}

export function navigation(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "NAVI",
      "GLOBAL NAVIGATION SATELLITE SYSTEM",
      "AUTOMOTIVE NAVIGATION SYSTEM",
      "MARINE NAVIGATION",
    ].includes(t),
  );
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
  return equalsYes(...(a.editing?.editNotes || []));
}

export function edit(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return (
    equalsYes(...(a.editing?.createNotes || [])) ||
    topics.some((t) =>
      [
        "ADD POIS",
        "EDIT",
        "EDITING",
        "EDITOR",
        "EDITOR SOFTWARE",
        "EDITOR TOOL",
      ].includes(t),
    )
  );
}

export function trackRec(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["TRACK RECORDING", "TRACKER", "TRACKING", "TRACK LOGGING"].includes(t),
  );
}

export function qa(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
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
    ].includes(t),
  );
}

export function changeset(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "HASHTAG TOOL",
      "MONITORING TOOL",
      "CHANGESET REVIEW TOOL",
      "WELCOMING TOOL",
    ].includes(t),
  );
}

export function convert(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
      "EXPORT",
      "EXPORTER",
      "CONVERTER",
      "CONVERSION",
      "DATA CONVERSION",
      "RENDER",
      "RENDERER",
      "MAP RENDERER",
      "OPENSTREETMAP RENDERER",
    ].includes(t),
  );
}

export function print(a: App) {
  const outputFormats = ["SVG", "PDF", "PNG"];
  if (
    a.rendering?.rendererOutputFormats.some((o) => outputFormats.includes(o))
  ) {
    return true;
  }

  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["PRINT", "POSTER", "FIELDPAPERS", "3D PRINTING"].includes(t),
  );
}

export function maps3D(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) => ["3D"].includes(t));
}

export function isochrone(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) => ["ISOCHRONES"].includes(t));
}

export function library(a: App) {
  const genre = a.genre.map((p) => p.toUpperCase());
  if (genre.some((p) => p === "API")) {
    return true;
  }

  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    [
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
    ].includes(t),
  );
}

export function indoor(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());

  return topics.some((t) =>
    ["INDOOR", "INDOORS", "INDOORMAP", "INDOOR MAP", "INDOOR MAPS"].includes(t),
  );
}
