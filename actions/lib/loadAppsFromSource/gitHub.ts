import { App } from "@shared/data/App";
import eld from "eld";
import { uniqBy, groupBy } from "lodash";
import { requestGitHub, transformGitHubResult } from "../crawler/gitHub";
import { createOctokit } from "@actions/lib/crawler/createOctokit";

export async function loadAppsFromGitHub(
  octokit: ReturnType<typeof createOctokit>,
) {
  let objs = await requestGitHub(octokit);

  objs = uniqBy(objs, (o) => o.nameWithOwner);

  const groupedObjs = groupBy(objs, (o) => o.name);
  Object.entries(groupedObjs)
    .filter((o) => o[1].length > 1)
    .flatMap((o) => o[1])
    .forEach((o) => {
      o.name = `${o.name} by ${o.owner.login}`;
    });

  await (eld as any).load("large");

  const result = objs.map((source) =>
    transformGitHubResult(eld, source),
  ) as unknown as App[];
  console.info("Found " + result.length + " projects in GitHub");
  return result;
}
