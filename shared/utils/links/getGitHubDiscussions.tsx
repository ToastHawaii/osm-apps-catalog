export function getGitHubDiscussions(githubDiscussions: string | undefined) {
  if (!githubDiscussions) {
    return undefined;
  }

  return `https://github.com/${githubDiscussions}/discussions`;
}
