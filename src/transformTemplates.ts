import { toWikimediaUrl } from "./utilities/image";
import { toWikiUrl, toUrl } from "./utilities/url";
import { platformValueToDisplay } from "./platform";
import { languageValueToDisplay } from "./language";
import { removeDuplicates } from "./utilities/array";

export type App = {
  name: string;
  images: string[];
  description: string;
  wiki: string;
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
};

export function transformSoftware(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    website: toUrl(source["web"]),
    wiki: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    author: (source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => processWikiText(v))
      .join(", "),
    sourceCode: toUrl(
      extractRepo(source["repo"] || source["git"] || source["svn"])
    ),
    languages: (source["languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => languageValueToDisplay(v)),
    languagesUrl: toUrl(source["languagesurl"]),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase),
    platform: (source["platform"] || "")
      .replace(/\[\[/g, "")
      .replace(/\]\]/g, "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => platformValueToDisplay(v)),
    install: {
      asin: source["asin"],
      bbWorldID: source["bbWorldID"],
      fDroidID: source["fDroidID"],
      googlePlayID: source["googlePlayID"],
      appleStoreID: source["appleStoreID"],
      macAppStoreID: source["macAppStoreID"],
      microsoftAppID: source["microsoftAppID"]
    }
  };

  obj.platform = removeDuplicates(obj.platform).sort();
  obj.languages = removeDuplicates(obj.languages).sort();

  if (
    (source["profiles"] || "") &&
    (source["profiles"] || "").toUpperCase() !== "YES" &&
    (source["profiles"] || "").toUpperCase() !== "NO" &&
    (source["profiles"] || "").toUpperCase() !== "?"
  )
    obj.topics.push(
      ...(source["profiles"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter(v => v)
        .map(firstLetterToUpperCase)
    );

  if (
    (source["accessibility"] || "") &&
    (source["accessibility"] || "").toUpperCase() !== "YES" &&
    (source["accessibility"] || "").toUpperCase() !== "NO" &&
    (source["accessibility"] || "").toUpperCase() !== "?"
  ) {
    obj.topics.push(
      ...(source["accessibility"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter(v => v)
        .map(firstLetterToUpperCase)
    );
    obj.topics.push("Accessibility");
  }
  if ((source["accessibility"] || "").toUpperCase() === "YES")
    obj.topics.push("Accessibility");

  if ((source["tracking"] || "").toUpperCase() === "YES")
    obj.topics.push("Tracking");

  if ((source["monitoring"] || "").toUpperCase() === "YES")
    obj.topics.push("Monitoring");

  if (
    (source["navigating"] || "").toUpperCase() === "YES" ||
    (source["navToPoint"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Navi");

  if (
    (source["routing"] || "").toUpperCase() === "YES" ||
    (source["calculateRoute"] || "").toUpperCase() === "YES" ||
    (source["calculateRouteOffline"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Router");

  if ((source["3D"] || "").toUpperCase() === "YES") obj.topics.push("3D");

  if ((source["findLocation"] || "").toUpperCase() === "YES")
    obj.topics.push("Search");
  if ((source["findNearbyPOI"] || "").toUpperCase() === "YES")
    obj.topics.push("POI");

  if (
    (source["addPOI"] || "").toUpperCase() === "YES" ||
    (source["addWay"] || "").toUpperCase() === "YES" ||
    (source["editPOI"] || "").toUpperCase() === "YES" ||
    (source["editTags"] || "").toUpperCase() === "YES" ||
    (source["editGeom"] || "").toUpperCase() === "YES" ||
    (source["editRelations"] || "").toUpperCase() === "YES"
  )
    obj.topics.push("Editor");

  obj.topics = removeDuplicates(obj.topics).sort();

  {
    const name = extractNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["web"]);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = extractNameWebsiteWiki(source["wiki"]);
    obj.name = obj.name || name.name;
    obj.website = obj.website || name.website;
    obj.wiki = name.wiki || obj.wiki;
  }
  return obj;
}
export function transformLayer(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    website: toUrl(extractWebsite(source["slippy_web"])),
    wiki: toWikiUrl(source.sourceWiki) || "",
    sourceCode: toUrl(extractRepo(source["repo"])),
    author: (source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => processWikiText(v))
      .join(", "),
    languages: (source["tiles_languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(v => languageValueToDisplay(v)),
    languagesUrl: toUrl(source["tiles_languagesurl"]),
    topics: [],
    platform: ["Web"],
    install: {}
  };

  obj.languages = removeDuplicates(obj.languages).sort();
  return obj;
}

export function transformServiceItem(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: appendFullStop(processWikiText(source["descr"] || "")),
    images: toWikimediaUrl(source["image"], 250),
    wiki: toWikiUrl(source.sourceWiki) || "",
    sourceCode: toUrl(extractWebsite(source["material"])),
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter(v => v)
      .map(v => languageValueToDisplay(v)),
    languagesUrl: toUrl(extractWebsite(source["lang"])),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
      .sort(),
    platform: [],
    install: {}
  };

  if (source["region"])
    obj.topics.push(
      `Coverage: ${source["region"]
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter(v => v)
        .map(firstLetterToUpperCase)
        .join(", ")}`
    );

  obj.languages = removeDuplicates(obj.languages).sort();
  obj.topics = removeDuplicates(obj.topics).sort();

  let name = extractNameWebsiteWiki(source["name"]);
  obj.name = name.name || obj.name;
  obj.website = name.website;
  obj.wiki = name.wiki || obj.wiki;
  return obj;
}

const splitByCommaButNotInsideBraceRegex = /[,;]+(?![^\(]*\))/;

export function containsOfflineLink(value: string) {
  return /<((s(trike)?)|(del))>/gi.test(value);
}

// function extractLanguageCodeFromLocal(value: string): string {
//   const match = /(\w{2,3}(\-\w{2,4})?)/g.exec(value);

//   if (match) return match[1];
//   return value;
// }

function extractLanguageCodeFromTemplate(value: string): string {
  const match = /:([\w-]+)/.exec(value);

  if (match) return match[1];
  return value;
}

function firstLetterToUpperCase(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function appendFullStop(value: string): string {
  if (value && value[value.length - 1] !== ".") return `${value}.`;
  return value;
}

function trim(value: string): string {
  return value.replace(/^[\.\s]+|[\.\s]+$/gm, "");
}

function extractNameWebsiteWiki(value: string = "") {
  const obj: {
    name: string;
    website?: string;
    wiki?: string;
  } = { name: value };

  {
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    const match = regex.exec(value);

    if (match) {
      obj.website = match[2];
      value = value.replace(regex, "").trim();
      if (value) obj.name = value;
    }
  }
  {
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;

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

function extractWebsite(value: string = "") {
  {
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    const match = regex.exec(value);

    if (match) {
      return match[2];
    }
  }
  {
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;

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
    const regex = /{{URL\|(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))}}/gi;

    const match = regex.exec(value);

    if (match) {
      return match[1];
    }
  }
  {
    const regex = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

    const match = regex.exec(value);

    if (match) {
      return match[1];
    }
  }

  return undefined;
}

function extractRepo(value: string = "") {
  const regex = /{{GitHub link\|(((?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)}}/g;

  return value.replace(regex, `https://github.com/$1`);
}

function processWikiText(text: string = "") {
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
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))\])/gi;

    text = text.replace(regex, `<a target="_blank" href="$2">$2</a>`);
  }
  {
    const regex = /(\[(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)) ([^\]]*)\])/gi;
    text = text.replace(regex, `<a target="_blank" href="$2">$5</a>`);
  }

  {
    const regex = /'''([^(''')]*)'''/g;

    text = text.replace(regex, `<strong>$1</strong>`);
  }

  return text;
}
