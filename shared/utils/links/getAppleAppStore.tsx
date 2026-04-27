export function getAppleAppStore(appleStoreID: string | undefined) {
  if (!appleStoreID) {
    return undefined;
  }

  return `https://apps.apple.com/app/id${appleStoreID}`;
}
