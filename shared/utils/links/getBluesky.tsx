export function getBluesky(bluesky: string | undefined) {
  if (!bluesky) {
    return undefined;
  }

  return `https://bsky.app/profile/${bluesky}`;
}
