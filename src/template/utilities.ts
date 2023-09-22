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

export type App = {
  name: string;
  lastChange?: string;
  lastRelease?: string;
  images: string[];
  description: string;
  documentation: string;
  sourceWiki: string;
  website?: string;
  topics: string[];
  author?: string;
  sourceCode?: string;
  languages: string[];
  languagesUrl?: string;
  platform: string[];
  install: {
    asin?: string;
    bbWorldID?: string;
    fDroidID?: string;
    googlePlayID?: string;
    appleStoreID?: string;
    macAppStoreID?: string;
    microsoftAppID?: string;
  };
  filter?: string;
};

export const splitByCommaButNotInsideBraceRegex = /[,;]+(?![^\(]*\))/;

export function containsOfflineLink(value: string = "") {
  return /<((s(trike)?)|(del))>/gi.test(value);
}

export function extractLanguageCodeFromTemplate(value: string): string {
  const match = /{{#language:([\w-]+)/.exec(value);

  if (match) return match[1];
  return value;
}

export function extractNameWebsiteWiki(value: string = "") {
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
      obj.website = match[2];
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
      obj.website = match[2];
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
      /{{URL\|(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))}}/gi;

    const match = regex.exec(value);

    if (match) {
      return match[1];
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

export function extractRepo(value: string = "") {
  const regex =
    /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/g;

  return value.replace(regex, `https://github.com/$1`);
}

export function processWikiText(text: string = "") {
  // Wikipedia
  {
    const regex = /\[\[:wikipedia:([^\]]*(?![^\|]))(\|([^\]]*))?\]\]/g;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://en.wikipedia.org/wiki/$1">$3</a>`
    );
  }
  {
    const regex = /\[\[:wikipedia:([^\]]*)\]\]/g;

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
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/g;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://github.com/$1">$1</a>`
    );
  }
  {
    const regex =
      /{{GitHub[_ ]link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)(\|([^(}})]+))?}}/g;

    text = text.replace(
      regex,
      `<a target="_blank" href="https://github.com/$1">$5</a>`
    );
  }

  return text;
}
