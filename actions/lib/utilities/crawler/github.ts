import { chain, uniqBy, upperFirst, words } from "lodash";
import { newUrl } from "@shared/utilities/url";
import { equalsIgnoreCase } from "@shared/utilities/string";
import { getFrameworkDisplay } from "@actions/lib/utilities/getFrameworkDisplay";
import { getPlatformDisplay } from "@actions/lib/utilities/getPlatformDisplay";
import { getProgramingLanguageDisplay } from "@actions/lib/utilities/getProgramingLanguageDisplay";
import { isFreeAndOpenSource } from "@actions/lib/utilities/isFreeAndOpenSource";

const ignoredTopics = [
  // OpenStreetMap
  "openstreetmap",
  "osm",
  "openstreetmaps",
  "open-street-map",
  "openstreetmap-data",
  "osm-data",

  // General map
  "map",
  "maps",
  "mapping",
  "geo",
  "cartography",

  // General
  "gui",
  "gui-application",
  "application",
  "app",
  "static-website",

  // Hosting/Dev platform
  "github-page",
  "azure",
  "jekyll",
  "firebase",
  "firebase-auth",
  "firebase-firestore",
  "firebase-realtime-database",
  "github",
  "github",
  "github-actions",
  "git",
  "svn",
  "kubernetes",
  "k8s",
  "dataviz",

  // Not specific enough
  "520",
  "705",
  "955",
  "1050",

  // Used feature/standard
  "mqtt",

  // Offtopic
  "multilanguage",
  "released",
  "help-wanted",
  "psram-needed",

  // License
  "agplv3",
  "gplv3",
  "foss",
  "open-source",

  // Tools
  "cmake",
  "tkinter",

  // Events
  "hacktoberfest",
  "hactoberfest",
  "hakctoberfest",
  "hactoberfest2019",
  "hacktoberfest2020",
  "hacktoberfest2021",
  "hacktoberfest2022",
  "hacktoberfest2023",
  "30daymapchallenge",
  "eccv2020",

  // Companies
  "interline-io",
];

export function transformGitHubResult(eld: any, result: any) {
  let language: string | undefined;
  if (
    result.description &&
    (words(result.description).length >= 6 || result.description.length > 42)
  ) {
    const detected = eld.detect(result.description);
    if (detected.isReliable()) {
      language = detected.language;
    }
  }

  const topics = result.repositoryTopics.nodes.map(
    (n: any) => n.topic.name,
  ) as string[];

  const mul = topics.includes("multilanguage");

  return {
    name: (result.name || "")
      .replaceAll("-", " ")
      .replaceAll("_", " ")
      .split(" ")
      .map((w: any) => upperFirst(w))
      .join(" "),
    unmaintained: result.isArchived,
    lastRelease: result.latestRelease?.publishedAt.substring(0, 10),
    description: result.descriptionHTML || "",
    images: result.usesCustomOpenGraphImage ? [result.openGraphImageUrl] : [],
    logos: [],
    website: result.homepageUrl
      ? newUrl(
          !result.homepageUrl.toUpperCase().startsWith("HTTP")
            ? "https://" + result.homepageUrl
            : result.homepageUrl,
        ).toString()
      : "",
    documentation: result.hasWikiEnabled
      ? result.url + "/wiki/"
      : result.url || "",
    author: `<a href='${result.owner.url}' target='_blank' rel='noreferrer'>${result.owner.login}</a> and other <a href='${result.url}/graphs/contributors' target='_blank' rel='noreferrer'>contributors</a>`,
    libre: isFreeAndOpenSource(result.licenseInfo?.spdxId),
    license:
      result.licenseInfo?.spdxId !== "NOASSERTION"
        ? result.licenseInfo?.spdxId
          ? [result.licenseInfo.spdxId]
          : []
        : [],
    sourceCode: result.url || "",
    languages: [...(language ? [language] : []), ...(mul ? ["mul"] : [])],
    languagesUrl: "",
    genre: [],
    topics: chain(topics)
      .filter((t) => !equalsIgnoreCase(t, result.name))
      .filter((t) => !ignoredTopics.includes(t))
      .map((t) => t.replaceAll("-", " "))
      .map(upperFirst)
      .filter((t) => !getPlatformDisplay(t))
      .filter((t) => !getFrameworkDisplay(t))
      .filter((t) => !getProgramingLanguageDisplay(t))
      .uniq()
      .value(),
    platform: chain(topics)
      .map((t) => t.replaceAll("-", " "))
      .map(upperFirst)
      .map((t) => getPlatformDisplay(t))
      .filter((t) => !!t)
      .uniq()
      .value(),
    coverage: [],
    install: {},
    community: {
      githubDiscussions: result.hasDiscussionsEnabled
        ? result.nameWithOwner
        : "",
      issueTracker: result.hasIssuesEnabled ? result.url + "/issues/" : "",
    },
    source: [
      {
        name: "GitHub",
        wiki: "",
        url: result.url,
        lastChange: result.updatedAt,
      },
    ],
  };
}

export async function requestGitHub(githubToken: string) {
  const results: any[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  const newerThen5Year = new Date();
  newerThen5Year.setFullYear(newerThen5Year.getFullYear() - 5);
  const pushedAfter = newerThen5Year.toISOString().substring(0, 10);
  while (hasNextPage && results.length < 1000) {
    const json: any = await request(pushedAfter, cursor, githubToken, "desc");

    const edgeNodes = json.data.search.edges.map((e: any) => e.node);
    results.push(...edgeNodes);

    hasNextPage = json.data.search.pageInfo.hasNextPage;
    cursor = json.data.search.pageInfo.endCursor;
  }

  hasNextPage = true;
  cursor = null;
  while (hasNextPage && results.length < 2000 && !hasDuplicates(results)) {
    const json: any = await request(pushedAfter, cursor, githubToken, "asc");

    const edgeNodes = json.data.search.edges.map((e: any) => e.node);
    results.push(...edgeNodes);

    hasNextPage = json.data.search.pageInfo.hasNextPage;
    cursor = json.data.search.pageInfo.endCursor;
  }

  return results;
}
async function request(
  pushedAfter: string,
  cursor: string | null,
  githubToken: string,
  sort: string,
) {
  const query = `
      query {
        search(query: "topic:openstreetmap,openstreetmap-data,overpass-api pushed:>${pushedAfter} stars:>=3 sort:stars-${sort} -topic:api-client,vscode-extension", type: REPOSITORY, first: 50 ${
          cursor ? `, after: "${cursor}"` : ""
        }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ... on Repository {
                name
                nameWithOwner
                description
                descriptionHTML
                url
                homepageUrl
                openGraphImageUrl
                usesCustomOpenGraphImage
                stargazerCount
                isArchived
                hasDiscussionsEnabled
                hasIssuesEnabled
                hasWikiEnabled
                updatedAt
                licenseInfo {
                  spdxId
                }
                owner {
                  login
                  url
                }
                repositoryTopics(first: 100) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                latestRelease {
                  publishedAt 
                }        
              }
            }
          }
        }
      }
    `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }

  const json = await response.json();
  return json;
}

function hasDuplicates(a: any[]) {
  return uniqBy(a, (a) => a.nameWithOwner).length !== a.length;
}
