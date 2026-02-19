import { App } from "@shared/data/App";
import { addOrMergeApp } from "@actions/collect-osm-apps/addOrMergeApp";
import { loadAppsFromGitHub } from "@actions/lib/loadAppsFromSource/gitHub";
import {
  loadAppsFromOsmWikiServiceItems,
  loadAppsFromOsmWikiLayers,
  loadAppsFromOsmWikiSoftwares,
} from "@actions/lib/loadAppsFromSource/osmWiki";
import { loadAppsFromTagInfoProjects } from "@actions/lib/loadAppsFromSource/tagInfo";
import { loadAppsFromWikidata } from "@actions/lib/loadAppsFromSource/wikidata";
import { AppQueries } from "@actions/lib/crawler/wikidata";

export async function loadApps(githubToken: string) {
  const apps: App[] = [];
  const languageMode = "en";

  (
    await Promise.all([
      loadAppsFromOsmWikiSoftwares(languageMode),
      loadAppsFromOsmWikiLayers(languageMode),
      loadAppsFromWikidata(AppQueries),
      loadAppsFromOsmWikiServiceItems(languageMode),
      loadAppsFromGitHub(githubToken),
      loadAppsFromTagInfoProjects(),
    ])
  )
    .flatMap((a) => a)
    .forEach((app) =>
      addOrMergeApp(apps, app, {
        includeRepositoryForUniqueCheck: app.source[0].name === "GitHub",
        checkWebsiteWithRepo: app.source[0].name === "taginfo",
        includeSourceForUniqueCheck: false,
        // The language of github is only recognised automatically based on the description, so if
        // there is another source, use language from there
        onlyAddLanguageIfEmpty: app.source[0].name === "GitHub",
      }),
    );

  return apps;
}
