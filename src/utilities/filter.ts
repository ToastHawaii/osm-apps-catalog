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

import { App } from "../template/utilities";

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

export function mobile(a: App) {
  return (
    a.topics
      .map((t) => t.toUpperCase())
      .some((t) => ["OFFLINE", "CACHE"].includes(t)) ||
    a.platform
      .map((t) => t.toUpperCase())
      .some((t) => mobilePlatforms.includes(t)) ||
    a.install.asin ||
    a.install.fDroidID ||
    a.install.googlePlayID ||
    a.install.huaweiAppGalleryID ||
    a.install.appleStoreID
  );
}

export function navigation(a: App) {
  return a.topics
    .map((t) => t.toUpperCase())
    .some((t) => ["NAVI", "ROUTING", "ROUTER"].includes(t));
}

export function edit(a: App) {
  return a.topics
    .map((t) => t.toUpperCase())
    .some((t) =>
      [
        "ADD POIS",
        "EDIT",
        "EDITING",
        "EDITOR",
        "ANALYSE",
        "ANALYSER",
        "ANALYSIS",
        "TRACK RECORDING",
        "TRACKER",
        "TRACKING",
        "VALIDATOR",
        "OSM TOOL",
        "QA",
        "QUALITY CONTROL",
      ].includes(t)
    );
}
