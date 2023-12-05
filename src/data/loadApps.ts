import { requestTemplates } from "./template/crawler";
import { transform as transformSoftware } from "./template/software";
import { transform as transformServiceItem } from "./template/serviceItem";
import { transform as transformLayer } from "./template/layer";
import { shuffle } from "../ui/utilities/array";
import { equalsIgnoreCase, equalsYes } from "../ui/utilities/string";
import { App, containsOfflineLink } from "./template/utilities";
import { apps } from "../script";
import { addApp } from "./addApp";

export async function loadApps(
  doUpdate: (apps: App[]) => void,
  language = "en"
) {
  const serviceItemObjectsRequest = requestTemplates("Service item", language);
  const layerObjectsRequest = requestTemplates("Layer", language);
  const softwareObjectsRequest = requestTemplates("Software", language);

  const serviceItemObjects = await serviceItemObjectsRequest;
  for (const source of serviceItemObjects.filter(
    (s) => !containsOfflineLink(s["name"])
  )) {
    const obj: App = transformServiceItem(source);

    addApp(obj);
  }

  shuffle(apps);
  doUpdate(apps);

  const layerObjects = await layerObjectsRequest;
  for (const source of layerObjects.filter(
    (s) =>
      !containsOfflineLink(s["name"]) &&
      !containsOfflineLink(s["slippy_web"]) &&
      !equalsYes(s["discontinued"])
  )) {
    const obj: App = transformLayer(source);

    addApp(obj);
  }
  doUpdate(apps);

  const softwareObjects = await softwareObjectsRequest;
  for (const source of softwareObjects.filter(
    (s) =>
      !containsOfflineLink(s["name"]) &&
      !containsOfflineLink(s["web"]) &&
      !equalsIgnoreCase(s["status"], "unfinished") &&
      !equalsIgnoreCase(s["status"], "unmaintained") &&
      !equalsIgnoreCase(s["status"], "broken")
  )) {
    const obj: App = transformSoftware(source);

    addApp(obj);
  }
  doUpdate(apps);

  const projectObjects = window.tagInfoProjectsResponse as {
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
  const source = "https://taginfo.openstreetmap.org/projects";
  for (const obj of projectObjects.data) {
    const app: App = {
      name: obj.name,
      website: obj.project_url,
      images: obj.icon_url ? [obj.icon_url] : [],
      documentation: obj.doc_url,
      source: [
        {
          name: "taginfo",
          displayName: "taginfo",
          url: source,
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
    };

    addApp(app);
  }
  doUpdate(apps);
}
