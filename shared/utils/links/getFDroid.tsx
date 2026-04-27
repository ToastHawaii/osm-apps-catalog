export function getFDroid(fDroidID: string | undefined) {
  if (!fDroidID) {
    return undefined;
  }

  return `https://f-droid.org/repository/browse/?fdid=${fDroidID}`;
}
