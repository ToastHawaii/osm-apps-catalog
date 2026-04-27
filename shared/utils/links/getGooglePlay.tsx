export function getGooglePlay(googlePlayID: string | undefined) {
  if (!googlePlayID) {
    return undefined;
  }

  return `https://play.google.com/store/apps/details?id=${googlePlayID}`;
}
