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

import { equalsIgnoreCase } from "./utilities/string";

const platforms: {
  name: string;
  synonym: string[];
  version: { name: string; synonym: string[] }[];
}[] = [
  {
    name: "Linux",
    synonym: ["linux"],
    version: [
      { name: "Openmoko Linux", synonym: ["openmoko", "openmoko linux"] },
    ],
  },
  { name: "Android", synonym: ["android"], version: [] },
  { name: "Firefox OS", synonym: ["firefox os", "firefoxos"], version: [] },
  { name: "Maemo", synonym: ["maemo"], version: [] },
  { name: "MeeGo", synonym: ["meego"], version: [] },
  { name: "Tizen", synonym: ["tizen"], version: [] },
  { name: "WebOS", synonym: ["webos"], version: [] },
  {
    name: "iOS",
    synonym: ["ios"],
    version: [
      { name: "iPhone", synonym: ["iphone"] },
      { name: "iPad", synonym: ["ipad"] },
      { name: "iPod touch", synonym: ["ipod touch", "ipod"] },
    ],
  },
  {
    name: "MacOS",
    synonym: ["macos", "mac", "mac os", "os x", "osx", "mac os x", "macosx"],
    version: [],
  },
  { name: "Unix", synonym: ["unix"], version: [] },
  { name: "Bada OS", synonym: ["bada"], version: [] },
  { name: "BSD", synonym: ["bsd"], version: [] },
  { name: "FreeBSD", synonym: ["freebsd"], version: [] },
  {
    name: "Amiga OS",
    synonym: ["amigaos", "amiga os", "amiga"],
    version: [
      { name: "MorphOS", synonym: ["morphos"] },
      { name: "ArOS", synonym: ["aros"] },
    ],
  },

  { name: "Windows CE", synonym: ["windows ce", "wince"], version: [] },
  {
    name: "Windows Mobile",
    synonym: ["windows mobile", "wm"],
    version: [
      { name: "Windows Mobile 5", synonym: ["windows mobile 5", "wm5"] },
      { name: "Windows Mobile 6", synonym: ["windows mobile 6", "wm6"] },
      {
        name: "Windows Mobile 2000",
        synonym: ["windows mobile 2000", "wm2000"],
      },
      {
        name: "Windows Mobile 2003",
        synonym: ["windows mobile 2003", "wm2003"],
      },
      { name: "Pocket PC", synonym: ["pocket pc", "pocketpc"] },
    ],
  },
  {
    name: "Windows Phone",
    synonym: ["windows phone", "windows phone 10"],
    version: [],
  },
  {
    name: "Windows",
    synonym: ["windows", "win"],
    version: [
      { name: "Windows XP", synonym: ["windows xp", "winxp"] },
      { name: "Windows 2000", synonym: ["windows 2000", "win2k"] },
      { name: "Windows Vista", synonym: ["windows vista", "vista"] },
      { name: "Windows 7", synonym: ["windows 7", "win7"] },
      { name: "Windows 8", synonym: ["windows 8", "win8"] },
      { name: "Windows 8.1", synonym: ["windows 8.1", "win8.1"] },
      { name: "Windows 10", synonym: ["windows 10", "win10"] },
    ],
  },
  {
    name: "BlackBerry OS",
    synonym: ["blackberry os", "blackberry", "bbos"],
    version: [],
  },
  { name: "Brew", synonym: ["brew"], version: [] },
  { name: "Palm OS", synonym: ["palm", "palm os", "palmos"], version: [] },
  { name: "Symbian", synonym: ["symbian", "s60"], version: [] },
  {
    name: "Cross-platform",
    synonym: ["cross-platform", "cross platform"],
    version: [],
  },
  { name: "Java ME", synonym: ["j2me", "java me"], version: [] },
  { name: "Java SE", synonym: ["j2se", "java se"], version: [] },
  { name: "Java", synonym: ["java"], version: [] },
  { name: "Node.js", synonym: ["node", "node.js"], version: [] },
  { name: "Qt", synonym: ["qt"], version: [] },
  { name: "React Native", synonym: ["react native"], version: [] },
  { name: "Unity", synonym: ["unity"], version: [] },
  {
    name: "Web",
    synonym: ["web", "web-based", "webapp", "web-app", "browser"],
    version: [],
  },
  {
    name: "Software for miscellaneous platforms",
    synonym: ["other"],
    version: [],
  },
];

export function platformValueToDisplay(value: string) {
  for (const platform of platforms) {
    for (const version of platform.version) {
      if (version.synonym.filter((s) => equalsIgnoreCase(s, value)).length > 0)
        return platform.name;
    }

    if (platform.synonym.filter((s) => equalsIgnoreCase(s, value)).length > 0)
      return platform.name;
  }
  return value;
}
