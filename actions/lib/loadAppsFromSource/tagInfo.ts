import { getJson } from "@shared/utils/jsonRequest";
import { newUrl } from "@shared/utils/url";

export async function loadAppsFromTagInfoProjects() {
  const projectObjects = (await getJson(
    "https://taginfo.openstreetmap.org/api/4/projects/all",
  )) as {
    url: string;
    data_until: string;
    data: {
      id: string;
      name: string;
      project_url: string;
      icon_url: string;
      doc_url: string;
      description: string;
      key_entries: number;
      tag_entries: number;
      unique_keys: number;
      unique_tags: number;
    }[];
  };
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
