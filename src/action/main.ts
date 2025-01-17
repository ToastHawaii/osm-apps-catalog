import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

import "../data/i18n";

import { loadApps } from "../data/loadApps";
import { shuffle } from "../utilities/array";
import { App } from "../data/template/utilities";

const lastUpdate = new Date("2025-01-11");

/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let apps = await loadApps();

    shuffle(apps);
    apps = apps.sort(function (a, b) {
      return b.score.total - a.score.total;
    });

    apps.forEach((app: any) => {
      delete app.score.details;
    });

    await uploadToRepo(
      "api/apps/all.json",
      JSON.stringify(apps),
      "Update app catalog",
      core.getInput("ghToken")
    );
    await uploadToRepo(
      "sitemap.xml",
      await generateSitemap(apps),
      "Update sitemap",
      core.getInput("ghToken")
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
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
    url: "https://osm-apps.zottelig.ch",
    priority: 1.0,
  });
  links.push({ url: "https://osm-apps.zottelig.ch/docs/", priority: 0.9 });
  links.push({
    url: "https://osm-apps.zottelig.ch/?category=focus",
    priority: 0.8,
  });
  links.push({
    url: "https://osm-apps.zottelig.ch/?category=latest",
    priority: 0.8,
  });
  links.push({
    url: "https://osm-apps.zottelig.ch/?category=mobile",
    priority: 0.8,
  });
  links.push({
    url: "https://osm-apps.zottelig.ch/?category=navigation",
    priority: 0.8,
  });
  links.push({
    url: "https://osm-apps.zottelig.ch/?category=edit",
    priority: 0.8,
  });
  links.push(
    ...apps.map((app) => ({
      url: `https://osm-apps.zottelig.ch/?app=${app.id}`,
      priority: (app.score.total / 10) * 0.5 + 0.1,
      lastmod:
        lastUpdate > new Date(app.source[0].lastChange)
          ? lastUpdate
          : new Date(app.source[0].lastChange),
    }))
  );

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://osm-apps.zottelig.ch",
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
