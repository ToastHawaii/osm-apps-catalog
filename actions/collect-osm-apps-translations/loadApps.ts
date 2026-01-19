// import { App } from "@shared/data/App";
// import { addApp } from "@actions/collect-osm-apps/addApp";
import {
  // loadAppsFromOsmWikiLayers,
  // loadAppsFromOsmWikiServiceItems,
  loadAppsFromOsmWikiSoftwares,
} from "@actions/lib/utilities/loadAppsFromSource/osmWiki";

export async function loadApps(/*githubToken: string*/) {
  return await Promise.all([
   // loadAppsFromOsmWikiServiceItems("notEn"),
   // loadAppsFromOsmWikiLayers("notEn"),
    loadAppsFromOsmWikiSoftwares("notEn"),
    // loadAppsFromWikidata(language),
    // loadAppsFromGitHub(githubToken),
  ]);
}
