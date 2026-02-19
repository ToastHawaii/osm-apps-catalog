export function getMastodon(address: string | undefined) {
  if (!address) {
    return undefined;
  }

  const [user, domain] = address.split("@");
  return `https://${domain}/@${user}`;
}
