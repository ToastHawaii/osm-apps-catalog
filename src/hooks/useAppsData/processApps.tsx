import { languageCodeToDisplay } from "@app/ui/lib/language";
import { App } from "@shared/data/App";
import { toUpper, uniq } from "lodash";

function languageCodesToDisplay(langs: string[] = []) {
  return uniq(langs.map(languageCodeToDisplay));
}

export function processLanguageCodes(apps: App[]): App[] {
  return apps.map((app) => ({
    ...app,
    languages: languageCodesToDisplay(app.languages),
    accessibility: app.accessibility
      ? {
          ...app.accessibility,
          screenReaderLang: languageCodesToDisplay(
            app.accessibility.screenReaderLang,
          ),
        }
      : app.accessibility,
  }));
}

function enrichCache(apps: App[]) {
  return apps.map((app) => ({
    ...app,
    cache: {
      topics: app.topics.map(toUpper),
      languages: app.languages.map(toUpper),
      platform: app.platform.map(toUpper),
      programmingLanguages: app.programmingLanguages?.map(toUpper) ?? [],
      coverage: app.coverage.map(toUpper),
    },
  }));
}

export function processApps(apps: App[]) {
  let processedApps = processLanguageCodes(apps);
  processedApps = enrichCache(processedApps);
  return processedApps;
}
