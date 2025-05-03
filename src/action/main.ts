import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

import "../app/ui/utilities/i18n";

import { loadApps } from "./loadApps";
import { shuffle } from "../shared/utilities/array";
import { getLastMod } from "./utilities/getLastMod";
import { App } from "../shared/data/App";
import { chain, sortBy } from "lodash";

const lastUpdate = new Date("2025-05-03");


// todo: statistik erstellen, neuer ablauf,
// apps loaden
// jmergen
// ignorierte Apps mit wiedersprüchen ausgeben & ignorieren


/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let apps = await loadApps(core.getInput("ghToken"));

    const knownApps = await getKnownApps();

    await firstCrawled(apps, knownApps);
    await focus(apps, knownApps);

    shuffle(apps);
    apps = apps.sort(function (a, b) {
      return b.score - a.score;
    });

    apps.forEach((app: any) => {
      delete app.score.details;
    });

    await uploadToRepo(
      "docs/api/apps/all.json",
      JSON.stringify(apps),
      "Update app catalog",
      core.getInput("ghToken")
    );
    await uploadToRepo(
      "docs/sitemap.xml",
      await generateSitemap(apps),
      "Update sitemap",
      core.getInput("ghToken")
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

async function getKnownApps() {
  console.info(`Load: https://osm-apps.org/api/apps/all.json`);
  try {
    return (await (
      await fetch("https://osm-apps.org/api/apps/all.json", {})
    ).json()) as App[];
  } catch (e) {
    console.error(
      `Error on loading https://osm-apps.org/api/apps/all.json: ${JSON.stringify(
        e
      )}`
    );
    throw e;
  }
}

async function firstCrawled(apps: App[], knownApps: App[]) {
  const now = new Date().toISOString();

  for (const app of apps) {
    const knownApp = knownApps.find((k) => k.id === app.id);
    if (!knownApp) {
      app.source = app.source.map((s) => ({ ...s, firstCrawled: now }));
    } else {
      for (const source of app.source) {
        const knownSource = knownApp.source.find(
          (k) => k.name === source.name && k.url === source.url
        );
        if (!knownSource) {
          source.firstCrawled = now;
        } else {
          source.firstCrawled =
            knownSource.firstCrawled || "2025-03-01T00:00:00Z";
        }
      }
    }

    app.source = sortBy(app.source, getLastMod).reverse();
  }
}

async function focus(apps: App[], knownApps: App[]) {
  const now = new Date().toISOString();
  var yesterday = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24
  ).toISOString();

  for (const app of apps) {
    const knownApp = knownApps.find((k) => k.id === app.id);
    if (!knownApp) {
      app.lastFocus = "0000-00-00T00:00:00Z";
    } else {
      app.lastFocus = knownApp.lastFocus || "0000-00-00T00:00:00Z";
    }
  }

  // Find all those that have changed in the last day and show those that have not been displayed
  // for the longest time
  const focusedApps = chain(apps)
    .filter((a) => getLastMod(a.source[0]) > yesterday)
    .sortBy((a) => a.lastFocus)
    .take(10)
    .value();

  for (const app of focusedApps) {
    app.lastFocus = now;
  }
}

async function generateSitemap(apps: App[]) {
  // An array with your links
  const links: {
    url: string;
    priority: number;
    lastmod?: Date;
  }[] = [];

  links.push({
    url: "https://osm-apps.org",
    priority: 1.0,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/docs/",
    priority: 0.9,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=focus",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=latest",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=mobile",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=navigation",
    priority: 0.8,
    lastmod: lastUpdate,
  });
  links.push({
    url: "https://osm-apps.org/?category=edit",
    priority: 0.8,
  });
  links.push(
    ...apps.map((app) => ({
      url: `https://osm-apps.org/?app=${app.id}`,
      priority: (app.score / 10) * 0.5 + 0.1,
      lastmod:
        lastUpdate > new Date(getLastMod(app.source[0]))
          ? lastUpdate
          : new Date(getLastMod(app.source[0])),
    }))
  );

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://osm-apps.org",
  });

  // Return a promise that resolves with your XML string
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  return data.toString();
}

async function uploadToRepo(
  filePath: string,
  content: string,
  commitMessage: string,
  ghToken: string
): Promise<void> {
  if (!ghToken) {
    throw new Error("GitHub token is required to upload files.");
  }

  const octokit = getOctokit(ghToken);
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // JSON-Inhalt als Base64 kodieren
  const base64Content = Buffer.from(content).toString("base64");

  // Prüfen, ob die Datei existiert
  let sha: string | undefined;
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
    });
    if ("sha" in data) {
      sha = data.sha; // SHA der vorhandenen Datei speichern
    }
  } catch (error) {
    if ((error as { status: number })?.status !== 404) {
      throw error; // Fehler weitergeben, falls es kein 404 ist
    }
  }

  // Datei erstellen oder aktualisieren
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: commitMessage,
    content: base64Content,
    sha,
  });

  console.log(`File "${filePath}" has been uploaded to the repository.`);
}
