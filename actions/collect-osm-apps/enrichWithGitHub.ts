import {
  searchByRepos,
  transformGitHubResult,
} from "@actions/lib/crawler/github";
import { mergeApps } from "@actions/lib/mergeApps";
import { App } from "@shared/data/App";
import eld from "eld";

export function getGithubOwnerRepo(urlString: string | undefined) {
  if (!urlString) {
    return undefined;
  }

  try {
    const url = new URL(urlString);

    if (
      !["github.com", "www.github.com"].includes(url.hostname.toLowerCase())
    ) {
      return undefined;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      return undefined;
    }

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");

    return { owner, repo };
  } catch {
    return undefined;
  }
}

/** enrich app with infos from github, if not already done */
export async function enrichWithGitHub(apps: App[], gitHubToken: string) {
  const appsWithGitHub = apps
    .filter((app) => !app.source.some((s) => s.name === "GitHub"))
    .map((app) => ({
      app,
      gitHub:
        getGithubOwnerRepo(app.sourceCode) ||
        getGithubOwnerRepo(app.website) ||
        getGithubOwnerRepo(app.documentation),
    }))
    .filter((g) => g.gitHub) as {
    app: App;
    gitHub: {
      owner: string;
      repo: string;
    };
  }[];

  const results = await searchByRepos(
    appsWithGitHub.map((app) => app.gitHub),
    gitHubToken,
  );

  await (eld as any).load("large");

  results
    .map((source) => ({
      app: transformGitHubResult(eld, source) as unknown as App,
      gitHub: { repo: source.name, owner: source.owner.login },
    }))
    .forEach((obj) => {
      appsWithGitHub
        .filter(
          (a) =>
            a.gitHub.owner.toLowerCase() === obj.gitHub.owner.toLowerCase() &&
            a.gitHub.repo.toLowerCase() === obj.gitHub.repo.toLowerCase(),
        )
        .map((a) => a.app)
        .forEach((app) =>
          mergeApps(app, obj.app, { onlyAddLanguageIfEmpty: true }),
        );
    });
}
