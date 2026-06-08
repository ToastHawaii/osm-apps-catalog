export async function getBlackList() {
  console.info(`Load: https://osm-apps.org/api/blacklist.json`);
  try {
    return (await (
      await fetch("https://osm-apps.org/api/blacklist.json", {})
    ).json()) as {
      name: string[];
      repository: string[];
      author: string[];
    }[];
  } catch (e) {
    console.error(
      `Error on loading https://osm-apps.org/api/blacklist.json: ${JSON.stringify(
        e,
      )}`,
    );
    throw e;
  }
}
