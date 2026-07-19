export interface Funding {
  appId: number;
  links: {
    url: string;
    source: string;
    verified: boolean;
  }[];
}

export async function getValidatedFundings() {
  console.info(`Load: https://osm-apps.org/api/fundings.json`);
  try {
    return (await (
      await fetch("https://osm-apps.org/api/fundings.json", {})
    ).json()) as Funding[];
  } catch (e) {
    console.error(
      `Error on loading https://osm-apps.org/api/fundings.json: ${JSON.stringify(
        e,
      )}`,
    );
    throw e;
  }
}
