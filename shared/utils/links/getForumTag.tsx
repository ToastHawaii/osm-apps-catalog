export function getForumTag(forumTag: string | undefined) {
  if (!forumTag) {
    return undefined;
  }

  return `https://community.openstreetmap.org/tag/${forumTag}`;
}
