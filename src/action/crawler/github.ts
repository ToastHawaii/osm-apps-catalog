import { chain, upperFirst } from "lodash";
import { App } from "../../data/App";
import { getJson } from "../../utilities/jsonRequest";
import { isFreeAndOpenSource } from "../utilities/isFreeAndOpenSource";
import { getPlatformDisplay } from "../utilities/getPlatformDisplay";
import { getProgramingLanguageDisplay } from "../utilities/getProgramingLanguageDisplay";
import { getFrameworkDisplay } from "../utilities/getFrameworkDisplay";
import { newUrl } from "../../utilities/url";

const ignoredTopics = [
  "openstreetmap",
  "osm",
  "open-street-map",
  "openstreetmap-data",
  "osm-data",
  "foss",
  "github-page",
  "jekyll",
  "30daymapchallenge",
  "dataviz",
  "hacktoberfest",
  "hactoberfest",
  "hakctoberfest",
  "hactoberfest2019",
  "hacktoberfest2020",
  "hacktoberfest2021",
  "hacktoberfest2022",
  "hacktoberfest2023",
  "psram-needed",
  "mqtt",
  "kubernetes",
  "k8s",
  "git",
  "svn",
  "css-grid",
  "github",
  "github",
  "github-actions",
  "520",
  "705",
  "955",
  "1050",
  "agplv3",
  "help-wanted",
];

export function transformGitHubResult(result: any) {
  return {
    name: (result.name || "")
      .replaceAll("-", " ")
      .replaceAll("_", " ")
      .split(" ")
      .map((w: any) => upperFirst(w))
      .join(" "),
    unmaintained: result.archived,
    lastRelease: "",
    description: result.description || "",
    images: [],
    logos: [],
    website: result.homepage
      ? newUrl(
          !result.homepage.toUpperCase().startsWith("HTTP")
            ? "https://" + result.homepage
            : result.homepage
        ).toString()
      : "",
    documentation: result.has_wiki
      ? result.html_url + "/wiki/"
      : result.html_url || "",
    author: `<a href='${result.owner?.html_url}' target='_blank' rel='noreferrer'>${result.owner?.login}</a> and other <a href='${result.html_url}/graphs/contributors' target='_blank' rel='noreferrer'>contributors</a>`,
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
    topics: chain(result.topics as string[])
      .filter((t) => !ignoredTopics.includes(t))
      .map((t) => t.replaceAll("-", " "))
      .map(upperFirst)
      .filter((t) => !getPlatformDisplay(t))
      .filter((t) => !getFrameworkDisplay(t))
      .filter((t) => !getProgramingLanguageDisplay(t))
      .uniq()
      .value(),
    platform: chain(result.topics as string[])
      .map((t) => t.replaceAll("-", " "))
      .map(upperFirst)
      .map((t) => getPlatformDisplay(t))
      .filter((t) => !!t)
      .uniq()
      .value(),
    coverage: [],
    install: {},
    community: {
      githubDiscussions: result.has_discussions ? result.full_name : "",
      issueTracker: result.has_issues ? result.html_url + "/issues/" : "",
    },
    source: [
      {
        name: "GitHub",
        wiki: "",
        url: result.html_url,
        lastChange: result.updated_at,
      },
    ],
  } as any as App;
}

export async function requestGitHub(githubToken?: string) {
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
    ] = `topic:openstreetmap,openstreetmap-data,overpass-api pushed:>${dateFilter} stars:>=3 -topic:java-library,android-library,php-library,matlab-library,gecoder-library,composer-library,python3-library,julia-library,golang-library,elixir-library,cpp-library,r-package,npm-package,api-client,vscode-extension`;
    params["sort"] = "stars";
    params["order"] = "desc";
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

  while (limit * page < total && page < 20) {
    page++;

    const base = "https://api.github.com/search/repositories";

    const params: any = {};

    params[
      "q"
    ] = `topic:openstreetmap pushed:>${dateFilter} stars:>=3 -topic:java-library,android-library,php-library,matlab-library,gecoder-library,composer-library,python3-library,julia-library,golang-library,elixir-library,cpp-library,r-package,npm-package,api-client,vscode-extension`;
    params["sort"] = "stars";
    params["order"] = "asc";
    params["per_page"] = limit;
    params["page"] = page - 10;

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
  }

  return objects;
}
