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

import { App } from "../data/App";

export function display(a: App) {
  const topics = a.cache?.topics || a.topics.map((t) => t.toUpperCase());
  return topics.some((t) =>
    ["DISPLAY", "VIEWING TOOL", "MAP VISUALIZATION"].includes(t)
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
    ["NAVI", "ROUTING", "ROUTER", "ROUTING", "ROUTING TOOL"].includes(t)
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
      ].includes(t)
    )
  );
}
