import { toWikiUrl, toUrl } from "@shared/utils/url";
import { uniq, upperFirst } from "lodash";
import {
  appendFullStop,
  trim,
  startsWithIgnoreCase,
  splitByCommaButNotInsideBraceRegex,
  splitBySemicolonButNotInsideBraceRegex,
} from "@shared/utils/string";
import {
  processWikiText,
  extractNameWebsiteWiki,
  extractWebsite,
  extractLanguageCodeFromTemplate,
} from "./utils";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";
import { toWikimediaUrl } from "@actions/lib/image";
import { languageFilter } from "@actions/lib/languageFilter";
import { languageValueFormat } from "@actions/lib/languageValueFormat";

export function transform(source: Record<string, string>) {
  const obj: App = {
    name: plainText(
      extractNameWebsiteWiki(source["name"], source.sourceWiki).name,
    ),
    description: appendFullStop(processWikiText(source["descr"] || "")),
    images: toWikimediaUrl(source["image"], 250),
    logos: [],
    imageWiki: source["image"],
    source: [
      {
        name: "ServiceItem",
        language: source["language"].toLowerCase(),
        id: source.sourceWiki,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    sourceCode: toUrl(extractWebsite(source["material"])),
    libre: startsWithIgnoreCase(source["material"], "{{yes"),
    languages: (source["lang"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(extractLanguageCodeFromTemplate)
      .map(trim)
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: toUrl(extractWebsite(source["lang"])),
    genre: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(upperFirst)
      .sort(),
    topics: (source["genre"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .map(upperFirst)
      .sort(),
    platform: [],
    coverage: [],
    install: {},
    community: {},
  } as any;

  if (source["region"]) {
    obj.coverage.push(
      ...source["region"]
        .split(splitBySemicolonButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v)
        .map(upperFirst),
    );
  }

  obj.languages = uniq(obj.languages).sort();
  obj.coverage = uniq(obj.coverage).sort();
  obj.topics = uniq(obj.topics).sort();

  const name = extractNameWebsiteWiki(source["name"], source.sourceWiki);
  obj.name = plainText(name.name || obj.name);
  obj.website = name.website;
  obj.documentation = name.wiki || obj.documentation;
  return obj;
}
