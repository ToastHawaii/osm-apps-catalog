import { getOctokit } from "@actions/github";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";

export function createOctokit(githubToken: string) {
  if (!githubToken) {
    throw new Error("GitHub token is required.");
  }

  return getOctokit(
    githubToken,
    {
      // Handle GitHub rate limits
      throttle: {
        onRateLimit: (retryAfter, options, octokit, retryCount) => {
          octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${options.url}`,
          );

          if (retryCount < 1) {
            // only retries once
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          }
        },
        onSecondaryRateLimit: (_retryAfter, options, octokit) => {
          // does not retry, only logs a warning
          octokit.log.warn(
            `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
          );
        },
      },
    },

    // Octokit plugin for GitHub’s recommended request throttling https://github.com/octokit/plugin-throttling.js
    throttling,

    // Add Octokit plugin for GitHub’s recommended request retries https://github.com/octokit/plugin-retry.js
    retry,
  );
}
