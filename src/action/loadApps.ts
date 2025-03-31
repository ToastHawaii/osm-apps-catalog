import { requestTemplates } from "./crawler/wiki/requestTemplates";
// import { requestTemplates as requestWikipediaTemplates } from "./crawler/wikipedia/requestTemplates";
import { transform as transformSoftware } from "./crawler/wiki/software";
import { transform as transformServiceItem } from "./crawler/wiki/serviceItem";
import { transform as transformLayer } from "./crawler/wiki/layer";
// import { transform as transformWikipediaSoftware } from "./crawler/wikipedia/software";
import { equalsIgnoreCase, equalsYes } from "../utilities/string";
import { containsOfflineLink, extractWebsite } from "./utilities";
import { App } from "../data/App";
import { addApp } from "./addApp";
import { toUrl } from "../utilities/url";
import { requestWikidata, transformWikidataResult } from "./crawler/wikidata";
import { getJson } from "../utilities/jsonRequest";
import { groupBy, mergeWith, uniqBy } from "lodash";
import { requestGitHub, transformGitHubResult } from "./crawler/github";

async function loadAppsFromOsmWikiServiceItems(language: string) {
  return (await requestTemplates("Service item", language))
    .filter((s) => !containsOfflineLink(s["name"]))
    .map((source) => transformServiceItem(source));
}
async function loadAppsFromOsmWikiLayers(language: string) {
  return (await requestTemplates("Layer", language))
    .filter(
      (s) =>
        !containsOfflineLink(s["name"]) &&
        !containsOfflineLink(s["slippy_web"]) &&
        !equalsYes(s["discontinued"])
    )
    .map((source) => transformLayer(source));
}

async function loadAppsFromOsmWikiSoftwares(language: string) {
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
        !equalsIgnoreCase(s["status"], "broken")
    )
    .map((source) => transformSoftware(source as any));
}

async function loadAppsFromWikidata(language: string) {
  const wikidataResults = await Promise.all(requestWikidata(language));

  const objs = new Map<string, App>();
  for (const wikidataResult of wikidataResults) {
    for (const source of wikidataResult.results.bindings) {
      const obj = transformWikidataResult(source);
      const dup = objs.get(obj.name);
      if (!dup) {
        objs.set(obj.name, obj);
      } else {
        objs.set(
          obj.name,
          mergeWith(obj, dup, (o, s) => {
            if (typeof o === "string") {
              return o || s;
            }
          })
        );
      }
    }
  }
  return Array.from(objs.values());
}

async function loadAppsFromGitHub(githubToken?: string | undefined) {
  let objs = await requestGitHub(githubToken);

  objs = uniqBy(objs, (o) => o.full_name);

  const groupedObjs = groupBy(objs, (o) => o.name);
  Object.entries(groupedObjs)
    .filter((o) => o[1].length > 1)
    .flatMap((o) => o[1])
    .forEach((o) => {
      o.name = `${o.name} by ${o.owner.login}`;
    });

  return objs.map((source) => transformGitHubResult(source));
}

async function loadAppsFromTagInfoProjects() {
  const projectObjects = (await getJson(
    "https://taginfo.openstreetmap.org/api/4/projects/all"
  )) as {
    url: string;
    data_until: string;
    data: {
      id: string;
      name: string;
      project_url: string;
      icon_url: string;
      doc_url: string;
      description: string;
      key_entries: number;
      tag_entries: number;
      unique_keys: number;
      unique_tags: number;
    }[];
  };
  const source = "https://taginfo.openstreetmap.org/projects/";
  return projectObjects.data.map(
    (obj) =>
      ({
        name: obj.name,
        website: new URL(obj.project_url).toString(),
        images: [],
        logos: obj.icon_url ? [obj.icon_url] : [],
        documentation: obj.doc_url,
        source: [
          {
            name: "taginfo",
            url: source + obj.id,
            lastChange: projectObjects.data_until,
          },
        ],
        description: obj.description,
        genre: [],
        topics: [],
        languages: [],
        platform: [],
        coverage: [],
        install: {},
        community: {},
      } as any)
  );
}

// async function loadAppsFromWikipediaSoftware(language: string) {
// const wikipediaSoftwareObjectsRequest = requestWikipediaTemplates(
//   "Infobox software",
//   language
// );
// const wikipediaSoftwareObjects = await wikipediaSoftwareObjectsRequest;
// for (const source of wikipediaSoftwareObjects.filter(
//   (s) => !equalsYes(s["discontinued"])
// )) {
//   const obj: App = transformWikipediaSoftware(source);
//   addApp(apps, obj);
// }
// }

export async function loadApps(githubToken?: string) {
  const apps: App[] = [];
  const language = "en";

  (
    await Promise.all([
      loadAppsFromOsmWikiServiceItems(language),
      loadAppsFromOsmWikiLayers(language),
      loadAppsFromOsmWikiSoftwares(language),
      loadAppsFromWikidata(language),
      loadAppsFromGitHub(githubToken),
      loadAppsFromTagInfoProjects(),
    ])
  )
    .flatMap((a) => a)
    .forEach((app) =>
      addApp(apps, app, {
        includeRepositoryForUniqueCheck: app.source[0].name === "GitHub",
        checkWebsiteWithRepo: app.source[0].name === "taginfo",
      })
    );

  return apps;
}
