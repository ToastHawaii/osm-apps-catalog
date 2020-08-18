import { toWikimediaUrl } from "./utilities/image";
import { toWikiUrl, toUrl } from "./utilities/url";

export type App = {
  name: string;
  description: string;
  image?: string;
  website?: string;
  wiki: string;
  languages: string[];
  topics: string[];
};

export function transformSoftware(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: source["description"] || "",
    image: toWikimediaUrl(source["screenshot"], 250),
    website: toUrl(source["web"]),
    wiki: toWikiUrl(source["wiki"] || source.sourceWiki) || "",
    languages: (source["languages"] || "")
      .split(/[;,]/)
      .map(trim)
      .map(extractLanguageCodeFromLocal)
      .filter(v => v)
      .map(v => v.toLowerCase()),
    topics: (source["genre"] || "")
      .split(/[;,]/)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
  };

  {
    const name = processNameWebsiteWiki(source["name"]);
    obj.name = name.name || obj.name;
    obj.website = obj.website || name.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = processNameWebsiteWiki(source["web"]);
    obj.name = obj.name || name.name;
    obj.website = name.website || obj.website;
    obj.wiki = obj.wiki || name.wiki || "";
  }
  {
    const name = processNameWebsiteWiki(source["wiki"]);
    obj.name = obj.name || name.name;
    obj.website = obj.website || name.website;
    obj.wiki = name.wiki || obj.wiki;
  }
  return obj;
}

const splitByCommaButNotInsideBraceRegex = /,+(?![^\(]*\))/;

export function containsOfflineLink(value: string) {
  return /<s(trike)?>/gi.test(value);
}

function extractLanguageCodeFromLocal(value: string): string {
  const match = /(\w{2,3})-/.exec(value);

  if (match) return match[1];
  return value;
}

export function transformServiceItem(source: { [name: string]: string }) {
  const obj: App = {
    name: source["name"] || "",
    description: source["descr"] || "",
    image: toWikimediaUrl(source["image"], 250),
    wiki: toWikiUrl(source.sourceWiki) || "",
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter(v => v)
      .map(v => v.toLowerCase()),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(v => v)
      .map(firstLetterToUpperCase)
  };

  let name = processNameWebsiteWiki(source["name"]);
  obj.name = name.name || obj.name;
  obj.website = name.website;
  obj.wiki = obj.wiki || name.wiki || "";
  return obj;
}

function extractLanguageCodeFromTemplate(value: string): string {
  const match = /:(\w{2})/.exec(value);

  if (match) return match[1];
  return value;
}

function firstLetterToUpperCase(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function trim(value: string): string {
  return value.replace(/^[\.\s]+|[\.\s]+$/gm, "");
}

function processNameWebsiteWiki(value: string = "") {
  const obj: {
    name: string;
    website?: string;
    wiki?: string;
  } = { name: value };

  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.website = match[2];
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /(\[((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?) (.*)\])/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[6];
      obj.website = match[2];
      value = value.replace(regex, "");
    }
  }
  {
    const regex = /\[\[(.*)\]\]/g;

    const match = regex.exec(value);

    if (match) {
      obj.name = match[1];
      obj.wiki = toWikiUrl(match[1]);
      value = value.replace(regex, "");
    }
  }

  return obj;
}
