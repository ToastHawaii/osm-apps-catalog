import { toWikimediaUrl } from "../utilities/image";
import { toWikiUrl, toUrl } from "../utilities/url";
import { platformValueToDisplay } from "../platform";
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
  extractRepo,
  splitByCommaButNotInsideBraceRegex,
  extractNameWebsiteWiki
} from "./utilities";

export function transform(source: { [name: string]: string }) {
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
