export function isGitHubUrl(urlString: string) {
  const url = new URL(urlString);

  return ["github.com", "www.github.com"].includes(url.hostname.toLowerCase());
}
