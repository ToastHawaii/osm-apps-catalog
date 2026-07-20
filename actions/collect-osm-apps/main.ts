import * as core from "@actions/core";

import "../../src/app/ui/lib/i18n";

import { loadApps } from "./loadApps";
import { shuffle } from "@shared/utils/array";
import { uploadToRepo } from "../lib/uploadToRepo";
import { enrichFocus } from "./enrichFocus";
import { enrichFirstCrawled } from "./enrichFirstCrawled";
import { generateSitemap } from "./generateSitemap";
import { getKnownApps } from "@actions/lib/getKnownApps";
import { getValidatedFundings } from "@actions/lib/getValidatedFundings";
import { enrichSpotlight } from "./enrichSpotlight";
import { enrichId } from "./enrichId";
import { enrichScoreTotal } from "./enrichScoreTotal";
import { enrichWithGitHub } from "@actions/collect-osm-apps/enrichWithGitHub";
import { createOctokit } from "@actions/lib/crawler/createOctokit";
import { extractFunding } from "@actions/collect-osm-apps/extractFunding";

/**
 * The main function for the action.
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const octokit = createOctokit(core.getInput("ghToken"));

    let apps = await loadApps(octokit);

    await enrichWithGitHub(apps, octokit);

    enrichId(apps);
    enrichScoreTotal(apps);

    const knownApps = await getKnownApps();
    enrichFirstCrawled(apps, knownApps);
    enrichFocus(apps, knownApps);
    enrichSpotlight(apps, knownApps);

    // Shuffle before sorting to get a random order for apps with the same score
    shuffle(apps);
    apps = apps.sort((a, b) => b.score - a.score);

    const validatedFundings = await getValidatedFundings();
    const fundingResult = extractFunding(apps, validatedFundings);

    apps = fundingResult.apps;
    const fundings = fundingResult.fundings;

    await uploadToRepo(
      [
        {
          filePath: "docs/api/apps/all.json",
          content: JSON.stringify(apps),
        },
        {
          filePath: "public/api/fundings.json",
          content: JSON.stringify(fundings),
        },
        {
          filePath: "docs/sitemap.xml",
          content: await generateSitemap(apps),
        },
      ],
      "chore: auto update apps data and sitemap",
      octokit,
    );
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
