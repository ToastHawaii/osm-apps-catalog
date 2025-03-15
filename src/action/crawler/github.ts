import { App } from "../../data/App";
import { getJson } from "../../utilities/jsonRequest";
import { isFreeAndOpenSource } from "../utilities/isFreeAndOpenSource";

const platforms = ["android", "ios", "linux", "windows", "macos"];

const ignoredTopics = ["openstreetmap", "osm", ...platforms];

export function transformGithubResult(result: any) {
  return {
    name: result.name || "",
    unmaintained: result.archived,
    lastRelease: "",
    description: result.description || "",
    images: [],
    website: result.homepage
      ? new URL(
          !result.homepage.toUpperCase().startsWith("HTTP")
            ? "https://" + result.homepage
            : result.homepage
        ).toString()
      : "",
    documentation: result.has_wiki
      ? result.html_url + "/wiki/"
      : result.html_url || "",
    author: result.organization?.login
      ? "<a href='" +
        result.organization?.html_url +
        "' target='_blank' rel='noreferrer'>" +
        result.organization?.login +
        "</a>"
      : result.owner?.login
      ? "<a href='" +
        result.owner?.html_url +
        "' target='_blank' rel='noreferrer'>" +
        result.owner?.login +
        "</a>"
      : "",
    libre: isFreeAndOpenSource(result.license?.spdx_id),
    license:
      result.license?.spdx_id !== "NOASSERTION"
        ? result.license?.spdx_id
          ? [result.license?.spdx_id]
          : []
        : [],
    sourceCode: result.html_url || "",
    languages: [],
    languagesUrl: "",
    genre: [],
    topics: result.topics.filter((t: string) => !ignoredTopics.includes(t)),
    platform: result.topics.filter((t: string) => platforms.includes(t)),
    coverage: [],
    install: {},
    community: {
      githubDiscussions: result.has_discussions ? result.full_name : "",
      issueTracker: result.has_issues ? result.html_url + "/issues/" : "",
    },
    source: [
      {
        name: "Github",
        wiki: "",
        url: result.html_url,
        lastChange: result.updated_at,
      },
    ],
  } as any as App;
}

export async function requestGithub(githubToken?: string) {
  const objects: any[] = [];

  const limit = 100;
  let page = 0;
  let total = 0;

  const newerThen5Year = new Date();
  newerThen5Year.setFullYear(newerThen5Year.getFullYear() - 5);
  const dateFilter = newerThen5Year.toISOString().substring(0, 10);

  do {
    page++;

    const base = "https://api.github.com/search/repositories";

    const params: any = {};

    params["q"] = "topic:openstreetmap pushed:>" + dateFilter + " stars:>=3";
    params["per_page"] = limit;
    params["page"] = page;

    const result = await getJson(
      base,
      params,
      githubToken
        ? {
            Authorization: "Bearer " + githubToken,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        : {}
    );
    total = result.total_count;
    objects.push(...result.items);
  } while (limit * page < total && page < 10);

  return objects;
}
