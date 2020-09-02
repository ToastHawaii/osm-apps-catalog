import { toWikimediaUrl } from "../utilities/image";
import { toWikiUrl, toUrl } from "../utilities/url";
import { languageValueToDisplay } from "../language";
import { removeDuplicates } from "../utilities/array";
import {
  appendFullStop,
  trim,
  firstLetterToUpperCase
} from "../utilities/string";
import {
  App,
  processWikiText,
  splitByCommaButNotInsideBraceRegex,
  extractNameWebsiteWiki,
  extractWebsite,
  extractLanguageCodeFromTemplate
} from "./utilities";

export function transform(source: { [name: string]: string }) {
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
