import * as core from "@actions/core";
import { loadApps } from "../data/loadApps";

import { context, getOctokit } from "@actions/github";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const apps = await loadApps();

    const jsonFilePath = "api/apps/all.json"; // Pfad zur Datei im Repo
    await uploadJsonToRepo(
      jsonFilePath,
      apps,
      "Add JSON file from GitHub Action",
      core.getInput("ghToken")
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
async function uploadJsonToRepo(
  filePath: string,
  content: object,
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
  const base64Content = Buffer.from(JSON.stringify(content, null, 2)).toString(
    "base64"
  );

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
