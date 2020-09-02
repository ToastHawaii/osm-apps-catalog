import { toWikimediaUrl } from "../utilities/image";
import { toWikiUrl, toUrl } from "../utilities/url";
import { languageValueToDisplay } from "../language";
import { removeDuplicates } from "../utilities/array";
import { appendFullStop, trim } from "../utilities/string";
import {
  App,
  processWikiText,
  extractRepo,
  splitByCommaButNotInsideBraceRegex,
  extractWebsite
} from "./utilities";

export function transform(source: { [name: string]: string }) {
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
