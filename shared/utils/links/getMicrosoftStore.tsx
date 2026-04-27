export function getMicrosoftStore(microsoftAppID: string | undefined) {
  if (!microsoftAppID) {
    return undefined;
  }

  return `https://apps.microsoft.com/detail/${microsoftAppID}`;
}
