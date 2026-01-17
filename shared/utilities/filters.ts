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

export function navigation(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["NAVI", "ROUTING", "ROUTER", "ROUTING", "ROUTING TOOL"].includes(t),
  );
}

export function edit(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return (
    a.hasGoal?.crowdsourcingStreetLevelImagery ||
    topics.some((t) =>
      [
        "ADD POIS",
        "EDIT",
        "EDITING",
        "EDITOR",
        "EDITOR SOFTWARE",
        "ANALYSE",
        "ANALYSER",
        "ANALYSIS",
        "TRACK RECORDING",
        "TRACKER",
        "TRACKING",
        "TRACK LOGGING",
        "VALIDATOR",
        "OSM TOOL",
        "QA",
        "QUALITY CONTROL",
        "NOTES",
        "EDITOR TOOL",
        "COMPARING TOOL",
        "HASHTAG TOOL",
        "MONITORING TOOL",
        "CHANGESET REVIEW TOOL",
        "WELCOMING TOOL",
      ].includes(t),
    )
  );
}
