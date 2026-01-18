import { equalsIgnoreCase, equalsYes } from "@shared/utilities/string";
import { requestTemplates } from "../crawler/osmWiki/requestTemplates";
import { containsOfflineLink, extractWebsite } from "../crawler/osmWiki/utilities";
import { toUrl } from "@shared/utilities/url";
import { transform as transformSoftware } from "../crawler/osmWiki/software";
import { transform as transformServiceItem } from "../crawler/osmWiki/serviceItem";
import { transform as transformLayer } from "../crawler/osmWiki/layer";

export async function loadAppsFromOsmWikiSoftwares(language: string) {
  return (await requestTemplates("Software", language))
    .filter(
      (s) =>
        !containsOfflineLink(s["name"]) &&
        !containsOfflineLink(s["web"]) &&
        !equalsIgnoreCase(s["status"], "unfinished") &&
        (!equalsIgnoreCase(s["status"], "unmaintained") ||
          // No longer maintained but can still be installed.
          toUrl(extractWebsite(s["web"])) ||
          s["asin"] ||
          s["fDroidID"] ||
          s["obtainiumLink"] ||
          s["googlePlayID"] ||
          s["huaweiAppGalleryID"] ||
          s["appleStoreID"] ||
          s["macAppStoreID"] ||
          s["microsoftAppID"]) &&
        !equalsIgnoreCase(s["status"], "broken") &&
        s["name"] !== "software template",
    )
    .map((source) => transformSoftware(source as any))
    .filter((app) => !app.genre.includes("Library"));
}
export async function loadAppsFromOsmWikiLayers(language: string) {
  return (await requestTemplates("Layer", language))
    .filter(
      (s) =>
        !containsOfflineLink(s["name"]) &&
        !containsOfflineLink(s["slippy_web"]) &&
        !equalsYes(s["discontinued"]) &&
        s["name"] !== "layer template",
    )
    .map((source) => transformLayer(source));
}

export async function loadAppsFromOsmWikiServiceItems(language: string) {
  return (await requestTemplates("Service item", language))
    .filter((s) => !containsOfflineLink(s["name"]))
    .map((source) => transformServiceItem(source));
}
