import { equalsIgnoreCase, trim } from "@shared/utilities/string";

const platforms: {
  name: string;
  synonym: string[];
  version: { name: string; synonym: string[] }[];
}[] = [
  {
    name: "Linux",
    synonym: ["linux", "GNU/Linux"],
    version: [
      { name: "Openmoko Linux", synonym: ["openmoko", "openmoko linux"] },
    ],
  },
  {
    name: "Android",
    synonym: ["android", "android app", "android application"],
    version: [
      { name: "Android Jelly Bean", synonym: ["android jelly bean"] },
      { name: "F-Droid", synonym: ["fdroid", "f droid"] },
      { name: "osmdroid", synonym: ["osmdroid"] },
    ],
  },
  {
    name: "Arduino",
    synonym: ["arduino", "arduino library"],
    version: [
      {
        name: "Arduino® Nano ESP32",
        synonym: ["esp32 arduino", "esp32", "esp32 s2", "esp32 s3"],
      },
    ],
  },
  {
    name: "Raspberry Pi",
    synonym: ["raspberry", "raspberry pi"],
    version: [],
  },
  { name: "Firefox OS", synonym: ["firefox os", "firefoxos"], version: [] },
  { name: "Maemo", synonym: ["maemo"], version: [] },
  { name: "MeeGo", synonym: ["meego"], version: [] },
  { name: "Sailfish OS", synonym: ["sailfishos"], version: [] },
  { name: "Tizen", synonym: ["tizen"], version: [] },
  { name: "WebOS", synonym: ["webos"], version: [] },
  { name: "KaiOS", synonym: ["kaios", "kai os"], version: [] },
  {
    name: "iOS",
    synonym: ["ios", "ios app"],
    version: [
      { name: "iPhone", synonym: ["iphone"] },
      { name: "iPad", synonym: ["ipad", "iPadOS"] },
      { name: "iPod touch", synonym: ["ipod touch", "ipod"] },
    ],
  },
  { name: "watchOS", synonym: ["watchos", "Apple Watch"], version: [] },
  { name: "tvOS", synonym: ["tvos"], version: [] },
  { name: "visionOS", synonym: ["visionos"], version: [] },
  {
    name: "MacOS",
    synonym: ["macos", "mac", "mac os", "os x", "osx", "mac os x", "macosx"],
    version: [],
  },
  { name: "Unix", synonym: ["unix"], version: [] },
  { name: "Bada OS", synonym: ["bada"], version: [] },
  {
    name: "BSD",
    synonym: ["bsd", "Berkeley Software Distribution"],
    version: [],
  },
  { name: "FreeBSD", synonym: ["freebsd"], version: [] },
  {
    name: "Amiga OS",
    synonym: ["amigaos", "amiga os", "amiga"],
    version: [
      { name: "MorphOS", synonym: ["morphos"] },
      { name: "ArOS", synonym: ["aros"] },
    ],
  },
  {
    name: "Garmin",
    synonym: ["garmin", "garmin gps devices"],
    version: [{ name: "Garmin Watch", synonym: ["garmin watch"] }],
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
    synonym: ["windows", "win", "Microsoft Windows"],
    version: [
      { name: "Windows XP", synonym: ["windows xp", "winxp"] },
      { name: "Windows 2000", synonym: ["windows 2000", "win2k"] },
      { name: "Windows Vista", synonym: ["windows vista", "vista"] },
      { name: "Windows 7", synonym: ["windows 7", "win7"] },
      { name: "Windows 8", synonym: ["windows 8", "win8"] },
      { name: "Windows 8.1", synonym: ["windows 8.1", "win8.1"] },
      { name: "Windows 10", synonym: ["windows 10", "win10"] },
      { name: "Windows 11", synonym: ["windows 11", "win11"] },
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
  {
    name: "Java",
    synonym: ["java"],
    version: [
      { name: "Java ME", synonym: ["j2me", "java me"] },
      { name: "Java SE", synonym: ["j2se", "java se"] },
    ],
  },
  {
    name: "Node.js",
    synonym: ["node", "node.js", "nodejs", "node-js", "node js"],
    version: [],
  },
  { name: "Qt", synonym: ["qt"], version: [] },
  { name: "Unity", synonym: ["unity"], version: [] },
  {
    name: "Web",
    synonym: [
      "web",
      "web-based",
      "web based",
      "webapp",
      "web-app",
      "web app",
      "browser",
      "web browser",
      "web application",
      "pwa",
    ],
    version: [],
  },
  {
    name: "Web Assembly",
    synonym: ["web assembly", "webassembly", "wasm"],
    version: [],
  },
  {
    name: "Docker",
    synonym: ["docker"],
    version: [],
  },
];

export function getPlatformDisplay(value: string) {
  // Remove version
  value = trim(value.replaceAll(/[0-9]+((\.[0-9]+)+\+?|\+)$/gi, ""));

  for (const platform of platforms) {
    for (const version of platform.version) {
      if (version.synonym.find((s) => equalsIgnoreCase(s, value)))
        return platform.name;
    }

    if (platform.synonym.find((s) => equalsIgnoreCase(s, value)))
      return platform.name;
  }
  return "";
}
