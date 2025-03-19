import { upperFirst } from "lodash";
import { App } from "../../data/App";
import { getJson } from "../../utilities/jsonRequest";
import { isFreeAndOpenSource } from "../utilities/isFreeAndOpenSource";
import { getPlatformDisplay } from "../utilities/getPlatformDisplay";
import { getProgramingLanguageDisplay } from "../utilities/getProgramingLanguageDisplay";
import { getFrameworkDisplay } from "../utilities/getFrameworkDisplay";

const ignoredTopics = [
  "openstreetmap",
  "osm",
  "open-street-map",
  "foss",
  "github-page",
  "jekyll",
  "30daymapchallenge",
  "dataviz",
  "hacktoberfest",
  "hacktoberfest2021",
];

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
      ? `<a href='${result.organization?.html_url}' target='_blank' rel='noreferrer'>${result.organization?.login}</a> and other <a href='${result.html_url}/graphs/contributors' target='_blank' rel='noreferrer'>contributors</a>`
      : result.owner?.login
      ? `<a href='${result.owner?.html_url}' target='_blank' rel='noreferrer'>${result.owner?.login}</a> and other <a href='${result.html_url}/graphs/contributors' target='_blank' rel='noreferrer'>contributors</a>`
      : `<a href='${result.html_url}/graphs/contributors' target='_blank' rel='noreferrer'>contributors</a>`,
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
    topics: result.topics
      .filter((t: string) => !ignoredTopics.includes(t))
      .map((t: string) => t.replaceAll("-", " "))
      .map(upperFirst)
      .filter((t: string) => !getPlatformDisplay(t))
      .filter((t: string) => !getFrameworkDisplay(t))
      .filter((t: string) => !getProgramingLanguageDisplay(t)),
    platform: result.topics
      .map((t: string) => t.replaceAll("-", " "))
      .map(upperFirst)
      .map((t: string) => getPlatformDisplay(t))
      .filter((t: string) => t),
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
        lastChange: result.pushed_at,
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

    params[
      "q"
    ] = `topic:openstreetmap pushed:>${dateFilter} stars:>=3 -topic:java-library,android-library,php-library,matlab-library,gecoder-library,composer-library,python3-library,julia-library,golang-library,elixir-library,cpp-library,r-package,npm-package,api-client,vscode-extension`;
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
