import { toWikiUrl, toUrl } from "@shared/utilities/url";
import { uniq } from "lodash";
import {
  appendFullStop,
  equalsYes,
  splitByCommaButNotInsideBraceRegex,
  toDate,
  trim,
} from "@shared/utilities/string";
import {
  processWikiText,
  extractWebsite,
  extractNameWebsiteWiki,
} from "./utilities";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utilities/plainText";
import { toWikimediaUrl } from "@actions/lib/utilities/image";
import { isFreeAndOpenSource } from "@actions/lib/utilities/isFreeAndOpenSource";
import { languageFilter } from "@actions/lib/utilities/languageFilter";
import { languageValueFormat } from "@actions/lib/utilities/languageValueFormat";

export function transform(source: Record<string, string>) {
  const obj: App = {
    name: plainText(
      extractNameWebsiteWiki(source["name"], source.sourceWiki).name,
    ),
    lastRelease: toDate(source["date"]) || "",
    description: appendFullStop(processWikiText(source["description"] || "")),
    images: toWikimediaUrl(source["screenshot"], 250),
    logos: toWikimediaUrl(source["logo"], 250),
    imageWiki: source["screenshot"] || source["logo"],
    website: toUrl(extractWebsite(source["slippy_web"])),
    documentation: toWikiUrl(source.sourceWiki) || "",
    source: [
      {
        name: "Layer",
        language: source["language"].toLowerCase(),
        id: source.sourceWiki,
        url: toWikiUrl(source.sourceWiki) || "",
        lastChange: source["timestamp"] || "",
      },
    ],
    sourceCode: toUrl(
      extractWebsite(source["style_web"]) || extractWebsite(source["repo"]),
    ),
    author: processWikiText(source["author"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter((v) => v)
      .join(", "),
    languages: (source["tiles_languages"] || "")
      .split(splitByCommaButNotInsideBraceRegex)
      .map(trim)
      .filter(languageFilter)
      .map(languageValueFormat),
    languagesUrl: toUrl(source["tiles_languagesurl"]),
    genre: [],
    topics: [],
    platform: ["Web"],
    coverage: [],
    install: {},
    license: uniq([
      ...processWikiText(source["tiles_license"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v),
      ...processWikiText(source["style_license"] || "")
        .split(splitByCommaButNotInsideBraceRegex)
        .map(trim)
        .filter((v) => v),
    ]),
    libre: isFreeAndOpenSource([
      source["tiles_license"],
      source["style_license"],
    ]),
    community: {
      forum: source.communicationChannels["forum"],
      forumTag: source.communicationChannels["forum tag"],
      irc: source.communicationChannels["irc channel"]
        ? {
            server: source.communicationChannels["irc server"],
            channel: source.communicationChannels["irc channel"],
          }
        : undefined,
      matrix: source.communicationChannels["matrix room"],
      bluesky: source.communicationChannels["bluesky handle"],
      mastodon: source.communicationChannels["mastodon address"],
      issueTracker:
        toUrl(source["bugtracker_web"]) ||
        toUrl(extractWebsite(source.communicationChannels["issue tracker"])),
      githubDiscussions: source.communicationChannels["github discussions"],
      telegram: source.communicationChannels["telegram"],
      slack: toUrl(source.communicationChannels["slack url"]),
    },
  } as any;

  if (!equalsYes(source["notlayer"])) {
    obj.topics.push("Tile layer");
    obj.genre.push("Tile layer");
  }
  if (source["slippy_web"]) {
    obj.topics.push("Slippy map");
    obj.genre.push("Slippy map");
  }

  obj.languages = uniq(obj.languages).sort();
  return obj;
}
