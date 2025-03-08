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

import { toWikiUrl } from "../utilities/url";

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

  obj.name = processWikiText(obj.name);
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
      `<a href="https://en.wikipedia.org/wiki/$1" target="_blank" rel="noreferrer">$3</a>`
    );
  }
  {
    const regex = /\[\[:wikipedia:([^\]]*)\]\]/gi;

    text = text.replace(
      regex,
      `<a href="https://en.wikipedia.org/wiki/$1" target="_blank" rel="noreferrer">$1</a>`
    );
  }
  // Url
  {
    const regex = /\[\[([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/;

    let match = regex.exec(text);
    while (match) {
      text = text.replace(
        regex,
        `<a href="${toWikiUrl(match[1])}" target="_blank" rel="noreferrer">${match[3]}</a>`
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
        `<a href="${toWikiUrl(match[1])}" target="_blank" rel="noreferrer">${match[1]}</a>`
      );

      match = regex.exec(text);
    }
  }

  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    text = text.replace(regex, `<a href="$2" target="_blank" rel="noreferrer">$2</a>`);
  }
  {
    const regex =
      /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    text = text.replace(regex, `<a href="$2" target="_blank" rel="noreferrer">$5</a>`);
  }

  {
    const regex = /{{(Key|Tag|TagKey)\|([^}|]*)(\|([^}|]*))?}}/gi;

    let match = regex.exec(text);
    while (match) {
      if (!match[4]) {
        text = text.replace(
          regex,
          `<a href="https://wiki.openstreetmap.org/wiki/Key:$2" target="_blank" rel="noreferrer">$2</a>=*`
        );
      } else {
        text = text.replace(
          regex,
          `<a href="https://wiki.openstreetmap.org/wiki/Key:$2" target="_blank" rel="noreferrer">$2</a>=<a href="https://wiki.openstreetmap.org/wiki/Tag:$2=$4" target="_blank" rel="noreferrer">$4</a>`
        );
      }

      match = regex.exec(text);
    }
  }

  // Format
  {
    const strongRegex = /'''([^(''')]*)'''/g;
    text = text.replace(strongRegex, `<strong>$1</strong>`);

    const emRegex = /''([^('')]*)''/g;
    text = text.replace(emRegex, `<em>$1</em>`);
  }

  // GitHub
  {
    const regex =
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/gi;

    text = text.replace(
      regex,
      `<a href="https://github.com/$1" target="_blank" rel="noreferrer">$1</a>`
    );
  }
  {
    const regex =
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    text = text.replace(
      regex,
      `<a href="https://github.com/$1" target="_blank" rel="noreferrer">$5</a>`
    );
  }

  // GitLab
  {
    const regex =
      /{{GitLab[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/gi;

    text = text.replace(
      regex,
      `<a href="https://gitlab.com/$1" target="_blank" rel="noreferrer">$1</a>`
    );
  }
  {
    const regex =
      /{{GitLab[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/gi;

    text = text.replace(
      regex,
      `<a href="https://gitlab.com/$1" target="_blank" rel="noreferrer">$5</a>`
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

      return `<a href="${link}" target="_blank" rel="noreferrer">${displayName}</a>`;
    });
  }
  {
    const regex = /{{Osm( )?User(\|([^(}})]+))}}/gi;

    text = text.replace(regex, (substring) => {
      const parts = substring.substring(2, substring.length - 2).split("|");
      const name = parts[1];
      return `<a href="https://www.openstreetmap.org/user/${name}" target="_blank" rel="noreferrer">${name}</a>`;
    });
  }

  text = text.replaceAll(/!&#33;/g, "!!");

  return text;
}

export function toWikiText(text: string = "") {
  text = text.replaceAll(/!!/g, "!&#33;");

  const regex =
    /<a href="(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//= ]*))" target="_blank" rel="noreferrer">([^\<]*)<\/a>/i;

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

/**
 * Returns a hash code from a string
 * @param str The string to hash.
 * @return A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
