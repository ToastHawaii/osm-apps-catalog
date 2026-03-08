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

export function isGitForgeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return host === "github.com";
  } catch {
    return false;
  }
}

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
        // The language of github is only recognized automatically based on the description, so if
        // there is another source, use language from there
        onlyAddLanguageIfEmpty: app.source[0].name === "GitHub",
      }),
    );

  console.info(
    "source code is on github: " +
      apps.filter(
        (a) =>
          isGitForgeUrl(a.sourceCode || "") &&
          !a.source.some((s) => s.name === "GitHub"),
      ).length,
  );

  console.info(
    "has hint for github: " +
      apps.filter(
        (a) =>
          (isGitForgeUrl(a.sourceCode || "") ||
            isGitForgeUrl(a.website || "") ||
            isGitForgeUrl(a.documentation || "")) &&
          !a.source.some((s) => s.name === "GitHub"),
      ).length,
  );

  console.info(
    "ex: has hint for github: " +
      apps.filter(
        (a) =>
          (isGitForgeUrl(a.sourceCode || "") ||
            isGitForgeUrl(a.website || "") ||
            isGitForgeUrl(a.documentation || "") ||
            isGitForgeUrl(a.community.issueTracker || "") ||
            isGitForgeUrl(a.community.githubDiscussions || "")) &&
          !a.source.some((s) => s.name === "GitHub"),
      ).length,
  );

  return apps;
}
