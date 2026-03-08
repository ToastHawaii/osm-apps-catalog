import { getJson } from "@shared/utils/jsonRequest";
import { newUrl } from "@shared/utils/url";

interface ApiResult {
  /** URL of the request. */
  url: string;
  /** All changes in the source until this date are reflected in this taginfo result. */
  data_until: string;
  /** Array with results. */
  data: {
    /** Project id */
    id: string;
    /** Project name */
    name: string;
    /** Project URL */
    project_url: string;
    /** Icon URL */
    icon_url: string;
    /** Documentation URL */
    doc_url: string;
    /** Project description */
    description: string;
    /** Key entries for this project */
    key_entries: number;
    /** Tag entries for this project */
    tag_entries: number;
    /** Unique keys known to this project */

    unique_keys: number;
    /** Unique tags known to this project */
    unique_tags: number;
  }[];
}

export async function loadAppsFromTagInfoProjects() {
  const projectObjects = (await getJson(
    "https://taginfo.openstreetmap.org/api/4/projects/all",
  )) as ApiResult;
  const source = "https://taginfo.openstreetmap.org/projects/";
  return projectObjects.data.map(
    (obj) =>
      ({
        name: obj.name,
        website: newUrl(obj.project_url).toString(),
        images: [],
        logos: obj.icon_url ? [obj.icon_url] : [],
        documentation: obj.doc_url,
        source: [
          {
            name: "taginfo",
            url: source + obj.id,
            lastChange: projectObjects.data_until,
          },
        ],
        description: obj.description,
        genre: [],
        topics: [],
        languages: [],
        platform: [],
        coverage: [],
        install: {},
        community: {},
      }) as any,
  );
}
