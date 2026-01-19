import { App } from "@shared/data/App";
// import { loadAppsFromGitHub } from "@actions/lib/utilities/loadAppsFromSource/gitHub";
import {
  loadAppsFromOsmWikiServiceItems,
  loadAppsFromOsmWikiLayers,
  loadAppsFromOsmWikiSoftwares,
} from "@actions/lib/utilities/loadAppsFromSource/osmWiki";
import { chain } from "lodash";
import { addOrMergeApp } from "./addOrMergeApp";
import { getKnownApps } from "@actions/lib/utilities/getKnownApps";
// import { loadAppsFromTagInfoProjects } from "@actions/lib/utilities/loadAppsFromSource/tagInfo";
//  import { loadAppsFromWikidata } from "@actions/lib/utilities/loadAppsFromSource/wikidata";

export async function loadApps(/*githubToken: string*/) {
  const knownApps = await getKnownApps();

  const appsByLang: Record<string, App[]> = {};
  const languageMode = "notEn";

  chain(
    await Promise.all([
      loadAppsFromOsmWikiServiceItems(languageMode),
      loadAppsFromOsmWikiLayers(languageMode),
      loadAppsFromOsmWikiSoftwares(languageMode),
      //  loadAppsFromWikidata(languageMode),
      // loadAppsFromGitHub(githubToken),
      // loadAppsFromTagInfoProjects(),
    ]),
  )
    .flatMap((a) => a)
    .groupBy((app) => app.source[0].language)
    .forEach((apps, lang) => {
      appsByLang[lang] = appsByLang[lang] || [];
      apps.forEach((app) =>
        addOrMergeApp(appsByLang[lang], knownApps, app, {
          includeRepositoryForUniqueCheck: app.source[0].name === "GitHub",
          checkWebsiteWithRepo: app.source[0].name === "taginfo",
          // The language of github is only recognised automatically based on the description, so if
          // there is another source, use language from there
          onlyAddLanguageIfEmpty: app.source[0].name === "GitHub",
        }),
      );
    });

  return appsByLang;
}
