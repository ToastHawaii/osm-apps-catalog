import { App } from "@shared/data/App";
import { addApp } from "@actions/collect-osm-apps/addApp";
import { loadAppsFromGitHub } from "@actions/lib/utilities/loadAppsFromSource/gitHub";
import {
  loadAppsFromOsmWikiServiceItems,
  loadAppsFromOsmWikiLayers,
  loadAppsFromOsmWikiSoftwares,
} from "@actions/lib/utilities/loadAppsFromSource/osmWiki";
import { loadAppsFromTagInfoProjects } from "@actions/lib/utilities/loadAppsFromSource/tagInfo";
import { loadAppsFromWikidata } from "@actions/lib/utilities/loadAppsFromSource/wikidata";

export async function loadApps(githubToken: string) {
  const apps: App[] = [];
  const languageMode = "en";

  (
    await Promise.all([
      loadAppsFromOsmWikiServiceItems(languageMode),
      loadAppsFromOsmWikiLayers(languageMode),
      loadAppsFromOsmWikiSoftwares(languageMode),
      loadAppsFromWikidata(languageMode),
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
      }),
    );

  return apps;
}
