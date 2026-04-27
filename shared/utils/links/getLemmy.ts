export function getLemmy(communityId: string | undefined) {
  if (!communityId) {
    return undefined;
  }

  const [community, domain] = communityId.split("@");
  return `https://${domain}/c/${community}`;
}
