import { useState, useEffect } from "react";
import { getJson } from "@shared/utilities/jsonRequest";
import { App } from "@shared/data/App";
import { isDevelopment } from "@shared/utilities/isDevelopment";
import { printCalcScore } from "./printCalcScore";
import { prepareLanguage } from "@shared/data/prepareLanguage";
import { AppTranslation } from "@shared/data/AppTranslation";
import { mergeAppSources } from "@shared/utilities/mergeAppSources";

async function loadData() {
  // for testing
  // return (await import("../../action/loadApps")).loadApps();

  if (!isDevelopment) {
    try {
      return await getJson("/api/apps/all.json", {});
    } catch {
      console.error("Data could not be loaded, the local cache is used.");
      return (await import("@shared/data/all.json")).default;
    }
  } else {
    return (await import("@shared/data/all.json")).default;
  }
}

async function loadTranslations(lang: string) {
  try {
    return await getJson(
      isDevelopment
        ? `https://osm-apps.org/api/apps/all.${lang}.json`
        : `/api/apps/all.${lang}.json`,
      {},
    );
  } catch {
    console.error(`Translations for ${lang} could not be loaded.`);
    return [];
  }
}

export function useData(lang: string) {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    (async () => {
      const appsQuery = loadData();
      const translationsQuery = loadTranslations(lang);

      const apps = (await appsQuery) as App[];
      const translations = (await translationsQuery) as AppTranslation[];

      apps.forEach((app) => {
        const translation = translations.find((t) => t.id === app.id);
        if (translation) {
          app.name = translation.name || app.name;
          app.description = translation.description || app.description;
          app.documentation = translation.documentation || app.documentation;
          app.community = { ...app.community, ...translation.community };
          app.source = mergeAppSources(app.source, translation.source);
        }
      });

      prepareLanguage(apps);

      for (const app of apps as App[]) {
        app.cache = {
          topics: app.topics.map((t) => t.toUpperCase()),
          platform: app.platform.map((p) => p.toUpperCase()),
          languages: app.languages.map((l) => l.toUpperCase()),
          coverage: app.coverage.map((c) => c.toUpperCase()),
        };
      }

      setApps(apps);
      if (isDevelopment) {
        printCalcScore(apps);
      }
    })();
  }, []);

  return apps;
}
