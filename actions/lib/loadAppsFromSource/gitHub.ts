import { App } from "@shared/data/App";
import eld from "eld";
import { uniqBy, groupBy } from "lodash";
import { requestGitHub, transformGitHubResult } from "../crawler/github";

export async function loadAppsFromGitHub(githubToken: string) {
  let objs = await requestGitHub(githubToken);

  objs = uniqBy(objs, (o) => o.nameWithOwner);

  const groupedObjs = groupBy(objs, (o) => o.name);
  Object.entries(groupedObjs)
    .filter((o) => o[1].length > 1)
    .flatMap((o) => o[1])
    .forEach((o) => {
      o.name = `${o.name} by ${o.owner.login}`;
    });

  await (eld as any).load("large");

  return objs.map((source) =>
    transformGitHubResult(eld, source),
  ) as unknown as App[];
}
