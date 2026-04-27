export function getReddit(reddit: string | undefined) {
  if (!reddit) {
    return undefined;
  }

  return `https://www.reddit.com/r/${reddit}`;
}
