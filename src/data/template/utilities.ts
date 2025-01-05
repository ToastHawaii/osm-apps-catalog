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

import { toWikiUrl } from "../../ui/utilities/url";

export type App = {
  name: string;
  unmaintained?: boolean;
  lastRelease?: string;
  description: string;
  images: string[];
  imageWiki?: string;
  website?: string | undefined;
  documentation?: string;
  source: {
    name: string;
    wiki?: string;
    url: string;
    lastChange: string;
  }[];
  author?: string;
  // free of charge software
  gratis?: boolean;
  // FLOSS license
  libre?: boolean;
  price?: string;
  license?: string;
  sourceCode?: string | undefined;
  languages: string[];
  languagesUrl?: string | undefined;
  genre: string[];
  topics: string[];
  platform: string[];
  coverage: string[];
  install: {
    asin?: string;
    fDroidID?: string;
    obtainiumLink?: string;
    googlePlayID?: string;
    huaweiAppGalleryID?: string;
    appleStoreID?: string;
    macAppStoreID?: string;
    microsoftAppID?: string;
  };
  map?: {
    map: string[];
    mapData: string[];
    datasource: string[];
    rotateMap: string[];
    "3D": string[];
    showWebsite: string[];
    showPhoneNumber: string[];
    showOpeningHours: string[];
  };
  routing?: {
    routing: string[];
    createRouteManually: string[];
    calculateRoute: string[];
    createRouteViaWaypoints: string[];
    profiles: string[];
    turnRestrictions: string[];
    calculateRouteOffline: string[];
    routingProviders: string[];
    avoidTraffic: string[];
    trafficProvider: string[];
  };
  navigating?: {
    navigating: string[];
    findLocation: string[];
    findNearbyPOI: string[];
    navToPoint: string[];
    voice: string[];
    keepOnRoad: string[];
    turnLanes: string[];
    withoutGPS: string[];
    predefinedRoute: string[];
  };
  tracking?: {
    tracking: string[];
    customInterval: string[];
    trackFormats: string[];
    geotagging: string[];
    fastWayPointAdding: string[];
    uploadGPX: string[];
  };
  monitoring?: {
    monitoring: string[];
    showTrack: string[];
    showExistingTrack: string[];
    showAltitudeDiagram: string[];
    showDOP: string[];
    showSatellites: string[];
    showNMEAlive: string[];
    showSpeed: string[];
    sendPosition: string[];
  };
  editing?: {
    addPOI: string[];
    editPOI: string[];
    addWay: string[];
    editGeom: string[];
    editTags: string[];
    editRelations: string[];
    viewNotes: string[];
    createNotes: string[];
    editNotes: string[];
    editSource: string[];
    offsetDBsupport: string[];
    uploadOSMData: string[];
  };
  rendering?: { rendererOutputFormats: string[] };
  accessibility?: {
    accessibility: string[];
    textOnlyUI: string[];
    brailleUI: string[];
    explorerMode: string[];
    publicTransportMode: string[];
    dangerWarnings: string[];
    screenReader: string[];
    screenReaderLang: string[];
  };
  community: {
    forum?: string;
    forumTag?: string;
    irc?: { server?: string; channel: string };
    matrix?: string;
    mastodon?: string;
    bluesky?: string;
    issueTracker?: string;
    githubDiscussions?: string;
    telegram?: string;
    slack?: string;
    reddit?: string;
  };
  score: {
    total: number;
    details: {
      translationKey: string;
      points: number;
      fulfilled: boolean;
    }[];
  };
  filter?: string;
};

export function containsOfflineLink(value: string = "") {
  return /<((s(trike)?)|(del))>/gi.test(value);
}

export function extractLanguageCodeFromTemplate(value: string): string {
  const match = /{{#language:([\w-]+)/.exec(value);

  if (match) return match[1];
  return value;
}

export function extractNameWebsiteWiki(
  value: string | undefined,
  pageName: string | undefined
) {
  value = (value || "").replace(/{{PAGENAME}}/gi, pageName || "");

  const obj: {
    name: string;
    website?: string;
    wiki?: string;
  } = { name: value };

  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    const match = regex.exec(value);

    if (match) {
      obj.website = new URL(match[2]).toString();
      value = value.replace(regex, "").trim();
      if (value) obj.name = value;
    }
  }
  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[5];
      obj.website = new URL(match[2]).toString();
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;

    const match = regex.exec(value);

    if (match) {
      if (match[3]) obj.name = match[3];
      else obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  {
    const regex = /\[\[([^\]]*)\]\]/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  return obj;
}

export function extractWebsite(value: string = "") {
  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    const match = regex.exec(value);

    if (match) {
      return match[2];
    }
  }
  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;

    const match = regex.exec(value);

    if (match) {
      return match[2];
    }
  }
  {
    const regex = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;

    const match = regex.exec(value);

    if (match) {
      return toWikiUrl(match[1]);
    }
  }
  {
    const regex =
      /{{URL\|((https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))}}/gi;

    const match = regex.exec(value);

    if (match) {
      return match[1];
    }
  }
  {
    const regex =
      /{{[Gg]it[Hh]ub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    const match = regex.exec(value);

    if (match) {
      return `https://github.com/${match[1]}`;
    }
  }
  {
    const regex =
      /{{[Gg]it[Ll]ab[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    const match = regex.exec(value);

    if (match) {
      return `https://gitlab.com/${match[1]}`;
    }
  }
  {
    const regex =
      /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

    const match = regex.exec(value);

    if (match) {
      return match[1];
    }
  }

  return undefined;
}

export function processWikiText(text: string = "") {
  // clean up <ref>
  {
    const regex = /<ref>([^<]*)<\/ref>/g;

    text = text.replace(regex, ``);
  }

  // Wikipedia
  {
    const regex = /\[\[:wikipedia:([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://en.wikipedia.org/wiki/$1">$3</a>`
    );
  }
  {
    const regex = /\[\[:wikipedia:([^\]]*)\]\]/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://en.wikipedia.org/wiki/$1">$1</a>`
    );
  }
  // Url
  {
    const regex = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/;

    let match = regex.exec(text);
    while (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${toWikiUrl(match[1])}">${match[3]}</a>`
      );

      match = regex.exec(text);
    }
  }
  {
    const regex = /\[\[([^\]]*)\]\]/;

    let match = regex.exec(text);
    while (match) {
      text = text.replace(
        regex,
        `<a target="_blank" href="${toWikiUrl(match[1])}">${match[1]}</a>`
      );

      match = regex.exec(text);
    }
  }

  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    text = text.replace(regex, `<a target="_blank" href="$2">$2</a>`);
  }
  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    text = text.replace(regex, `<a target="_blank" href="$2">$5</a>`);
  }

  {
    const regex = /{{(Key|Tag|TagKey)\|([^}|]*)(\|([^}|]*))?}}/gi;

    let match = regex.exec(text);
    while (match) {
      if (!match[4]) {
        text = text.replace(
          regex,
          `<a target="_blank" href="https://wiki.openstreetmap.org/wiki/Key:$2">$2</a>=*`
        );
      } else {
        text = text.replace(
          regex,
          `<a target="_blank" href="https://wiki.openstreetmap.org/wiki/Key:$2">$2</a>=<a target="_blank" href="https://wiki.openstreetmap.org/wiki/Tag:$2=$4">$4</a>`
        );
      }

      match = regex.exec(text);
    }
  }

  // Format
  {
    const regex = /'''([^(''')]*)'''/g;

    text = text.replace(regex, `<strong>$1</strong>`);
  }

  // GitHub
  {
    const regex =
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://github.com/$1">$1</a>`
    );
  }
  {
    const regex =
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://github.com/$1">$5</a>`
    );
  }

  // GitLab
  {
    const regex =
      /{{GitLab[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://gitlab.com/$1">$1</a>`
    );
  }
  {
    const regex =
      /{{GitLab[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://gitlab.com/$1">$5</a>`
    );
  }

  // User
  {
    const regex = /{{User(\|([^(}})]+))}}/gi;

    text = text.replace(regex, (substring) => {
      const parts = substring.substring(2, substring.length - 2).split("|");
      const displayName = parts[1];
      let wiki = displayName;
      let osm = displayName;
      let link;
      const params = Object.fromEntries(
        parts.slice(2).map((s) => s.split("="))
      );
      if (typeof params["wiki"] === "string") {
        wiki = params["wiki"];
      }
      if (typeof params["osm"] === "string") {
        osm = params["osm"];
      }

      if (wiki) {
        link = `https://wiki.openstreetmap.org/wiki/User:${wiki}`;
      } else if (osm) {
        link = `https://www.openstreetmap.org/user/${osm}`;
      }

      return `<a target="_blank" href="${link}">${displayName}</a>`;
    });
  }
  {
    const regex = /{{Osm( )?User(\|([^(}})]+))}}/gi;

    text = text.replace(regex, (substring) => {
      const parts = substring.substring(2, substring.length - 2).split("|");
      const name = parts[1];
      return `<a target="_blank" href="https://www.openstreetmap.org/user/${name}">${name}</a>`;
    });
  }

  return text;
}

export function toWikiText(text: string = "") {
  text = text.replaceAll(/\!\!/g, "!&#33;");

  const regex =
    /<a target="_blank" href="(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//= ]*))">([^\<]*)<\/a>/i;

  let match = regex.exec(text);
  while (match) {
    if (match[1].startsWith("https://wiki.openstreetmap.org/wiki/")) {
      text = text.replace(regex, `[[${match[1].substring(36)}|${match[4]}]]`);
    } else {
      text = text.replace(regex, `[${match[1]} ${match[4]}]`);
    }

    match = regex.exec(text);
  }

  return text;
}

export function toSourceDisplayText(name: string) {
  switch (name) {
    case "taginfo":
      return "taginfo";

    case "Wikidata":
      return `Wikidata <i class="fas fa-pen"></i>`;

    case "Layer":
      return `Wiki (Layer) <i class="fas fa-pen"></i>`;

    case "ServiceItem":
      return `Wiki (ServiceItem) <i class="fas fa-pen"></i>`;

    case "Software":
      return `Wiki (Software) <i class="fas fa-pen"></i>`;

    default:
      throw "Unexpected value for name: " + name;
  }
}
