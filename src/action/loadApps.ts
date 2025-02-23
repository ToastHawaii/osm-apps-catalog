import { requestTemplates } from "./crawler/wiki/requestTemplates";
import { transform as transformSoftware } from "./crawler/wiki/software";
import { transform as transformServiceItem } from "./crawler/wiki/serviceItem";
import { transform as transformLayer } from "./crawler/wiki/layer";
import { equalsIgnoreCase, equalsYes } from "../utilities/string";
import { containsOfflineLink, extractWebsite } from "./utilities";
import { App } from "../data/App";
import { addApp } from "./addApp";
import { toUrl } from "../utilities/url";
import { requestWikidata, transformWikidataResult } from "./crawler/wikidata";
import { getJson } from "../utilities/jsonRequest";

export async function loadApps() {
  const apps: App[] = [];
  const language = "en";

  // const serviceItemObjectsRequest = requestTemplates("Service item", language);
  // const layerObjectsRequest = requestTemplates("Layer", language);
  // const softwareObjectsRequest = requestTemplates("Software", language);
  const wikidataRequest = requestWikidata(language);

  // const serviceItemObjects = await serviceItemObjectsRequest;
  // for (const source of serviceItemObjects.filter(
  //   (s) => !containsOfflineLink(s["name"])
  // )) {
  //   const obj: App = transformServiceItem(source);

  //   addApp(apps, obj);
  // }

  // const layerObjects = await layerObjectsRequest;
  // for (const source of layerObjects.filter(
  //   (s) =>
  //     !containsOfflineLink(s["name"]) &&
  //     !containsOfflineLink(s["slippy_web"]) &&
  //     !equalsYes(s["discontinued"])
  // )) {
  //   const obj: App = transformLayer(source);

  //   addApp(apps, obj);
  // }

  // const softwareObjects = await softwareObjectsRequest;
  // for (const source of softwareObjects.filter(
  //   (s) =>
  //     !containsOfflineLink(s["name"]) &&
  //     !containsOfflineLink(s["web"]) &&
  //     !equalsIgnoreCase(s["status"], "unfinished") &&
  //     (!equalsIgnoreCase(s["status"], "unmaintained") ||
  //       // No longer maintained but can still be installed.
  //       toUrl(extractWebsite(s["web"])) ||
  //       s["asin"] ||
  //       s["fDroidID"] ||
  //       s["obtainiumLink"] ||
  //       s["googlePlayID"] ||
  //       s["huaweiAppGalleryID"] ||
  //       s["appleStoreID"] ||
  //       s["macAppStoreID"] ||
  //       s["microsoftAppID"]) &&
  //     !equalsIgnoreCase(s["status"], "broken")
  // )) {
  //   const obj: App = transformSoftware(source as any);

  //   addApp(apps, obj);
  // }

  const wikidataResults = await Promise.all(wikidataRequest);
  for (const wikidataResult of wikidataResults)
    for (const source of wikidataResult.results.bindings) {
      const obj: App = transformWikidataResult(source);
       addApp(apps, obj);
    }

  // const projectObjects = (await getJson(
  //   "https://taginfo.openstreetmap.org/api/4/projects/all"
  // )) as {
  //   url: string;
  //   data_until: string;
  //   data: {
  //     id: string;
  //     name: string;
  //     project_url: string;
  //     icon_url: string;
  //     doc_url: string;
  //     description: string;
  //     key_entries: number;
  //     tag_entries: number;
  //     unique_keys: number;
  //     unique_tags: number;
  //   }[];
  // };
  // const source = "https://taginfo.openstreetmap.org/projects/";
  // for (const obj of projectObjects.data) {
  //   const app: App = {
  //     name: obj.name,
  //     website: new URL(obj.project_url).toString(),
  //     images: obj.icon_url ? [obj.icon_url] : [],
  //     documentation: obj.doc_url,
  //     source: [
  //       {
  //         name: "taginfo",
  //         url: source + obj.id,
  //         lastChange: projectObjects.data_until,
  //       },
  //     ],
  //     description: obj.description,
  //     genre: [],
  //     topics: [],
  //     languages: [],
  //     platform: [],
  //     coverage: [],
  //     install: {},
  //     community: {},
  //   } as any;

  //   addApp(apps, app);
  // }

  return apps;
}
