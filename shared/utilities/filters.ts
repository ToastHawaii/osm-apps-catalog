import { equalsYes } from "@shared/utilities/string";
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
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  const platform = a.cache?.platform || a.platform.map((p) => p.toUpperCase());
  return (
    topics.some((t) => ["OFFLINE", "CACHE"].includes(t)) ||
    platform.some((t) => mobilePlatforms.includes(t)) ||
    a.install.asin ||
    a.install.fDroidID ||
    a.install.obtainiumLink ||
    a.install.googlePlayID ||
    a.install.huaweiAppGalleryID ||
    a.install.appleStoreID
  );
}

export function calcRoute(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["ROUTING", "ROUTER", "ROUTING TOOL", "ROUTE PLANNING SOFTWARE"].includes(
      t,
    ),
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
      "COMPARING TOOL",
      "VALIDATOR",
      "QA",
      "QUALITY CONTROL",
      "CHANGESET REVIEW TOOL",
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

export function library(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());

  const libraryTopics = [
    "LIBRARY",
    "JAVA LIBRARY",
    "ANDROID LIBRARY",
    "ARDUINO LIBRARY",
    "PHP LIBRARY",
    "MATLAB LIBRARY",
    "GECODER LIBRARY",
    "COMPOSER LIBRARY",
    "PYTHON3 LIBRARY",
    "JULIA LIBRARY",
    "GOLANG LIBRARY",
    "ELIXIR LIBRARY",
    "PLATFORMIO LIBRARY",
    "CPP LIBRARY",
    "R PACKAGE",
    "NPM PACKAGE",
  ];

  return topics.some((t) => libraryTopics.includes(t));
}
