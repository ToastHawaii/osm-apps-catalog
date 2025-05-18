import { requestTemplates } from "./crawler/wiki/requestTemplates";
import { transform as transformSoftware } from "./crawler/wiki/software";
import { transform as transformServiceItem } from "./crawler/wiki/serviceItem";
import { transform as transformLayer } from "./crawler/wiki/layer";
import { equalsIgnoreCase, equalsYes } from "../shared/utilities/string";
import { containsOfflineLink, extractWebsite } from "./crawler/wiki/utilities";
import { App } from "../shared/data/App";
import { addApp } from "./addApp";
import { newUrl, toUrl } from "../shared/utilities/url";
import { requestWikidata, transformWikidataResult } from "./crawler/wikidata";
import { getJson } from "../app/utilities/jsonRequest";
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
        !equalsYes(s["discontinued"]) &&
        s["name"] !== "layer template"
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
        !equalsIgnoreCase(s["status"], "broken") &&
        s["name"] !== "software template"
    )
    .map((source) => transformSoftware(source as any))
    .filter((app) => !app.genre.includes("Library"));
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

async function loadAppsFromGitHub(githubToken: string) {
  let objs = await requestGitHub(githubToken);

  objs = uniqBy(objs, (o) => o.nameWithOwner);

  const groupedObjs = groupBy(objs, (o) => o.name);
  Object.entries(groupedObjs)
    .filter((o) => o[1].length > 1)
    .flatMap((o) => o[1])
    .forEach((o) => {
      o.name = `${o.name} by ${o.owner.login}`;
    });

  return objs.map((source) =>
    transformGitHubResult(source)
  ) as unknown as App[];
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
        website: newUrl(obj.project_url).toString(),
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

export async function loadApps(githubToken: string) {
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
        // The language of github is only recognised automatically based on the description, so if
        // there is another source, use language from there
        onlyAddLanguageIfEmpty: app.source[0].name === "GitHub",
      })
    );

  return apps;
}
