import { useState, useEffect } from "react";
import { chain, uniq } from "lodash";
import i18next from "i18next";

import { getJson } from "@shared/utilities/jsonRequest";
import { App } from "@shared/data/App";
import { isDevelopment } from "@shared/utilities/isDevelopment";
import { printCalcScore } from "../lib/utils/printCalcScore";
import { prepareLanguage } from "@shared/data/prepareLanguage";
import { AppTranslation } from "@shared/data/AppTranslation";
import { mergeAppSources } from "@shared/utilities/mergeAppSources";
import { languageValueToDisplay } from "@app/ui/utilities/language";
import { getUserRegion } from "@lib/utils/getUserRegion";
import { some } from "@shared/utilities/array";
import { useTranslation } from "react-i18next";

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
  if (lang === "en") {
    return [];
  }

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

export function useAppsData() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [apps, setApps] = useState<App[]>([]);

  function sortByLang(a: App, languagesUp: string[]) {
    return some(a.cache.languages, languagesUp);
  }

  function sortByCoverage(a: App, coverageUp: string[]) {
    return (
      a.cache.coverage.some((a) =>
        coverageUp.some((c) => a.startsWith(c) || c.startsWith(a)),
      ) || a.coverage.length === 0
    );
  }

  useEffect(() => {
    (async () => {
      const appsQuery = loadData();

      // Get fallback languages to load translations too
      const langs = (
        i18next.services.languageUtils.toResolveHierarchy(lang) as string[]
      )
        .map((l) => l.toLowerCase())
        .filter((l) => l !== "en")
        .reverse();

      const translationsQuery = langs.map((l) => loadTranslations(l));

      let apps = (await appsQuery) as App[];
      prepareLanguage(apps);

      for (const app of apps as App[]) {
        app.cache = {
          topics: app.topics.map((t) => t.toUpperCase()),
          platform: app.platform.map((p) => p.toUpperCase()),
          languages: app.languages.map((l) => l.toUpperCase()),
          coverage: app.coverage.map((c) => c.toUpperCase()),
        };
      }

      const translationsLists = (await Promise.all(
        translationsQuery,
      )) as AppTranslation[][];

      translationsLists
        .filter((t) => t.length > 0)
        .forEach((translations) => {
          apps.forEach((app) => {
            const translation = translations.find((t) => t.id === app.id);
            if (translation) {
              app.name = translation.name || app.name;
              app.description = translation.description || app.description;
              app.descriptionShort =
                translation.descriptionShort ||
                translation.description ||
                app.descriptionShort;
              app.documentation =
                translation.documentation || app.documentation;
              app.community = { ...app.community, ...translation.community };
              app.source = mergeAppSources(app.source, translation.source);
            }
          });
        });

      // After sort by score: prefer apps that match the user's context.
      const userLangs = navigator.languages.map((l) =>
        languageValueToDisplay(l),
      );
      const languages =
        userLangs.length > 0
          ? uniq([languageValueToDisplay("mul"), ...userLangs])
          : [];
      const languagesUp = uniq(languages).map((t) => t.toUpperCase());
      if (languagesUp.length > 0) {
        apps = chain(apps)
          .sortBy((a) => !sortByLang(a, languagesUp))
          .value();
      }

      const userRegion = getUserRegion();
      const coverage = userRegion ? uniq(["Worldwide", userRegion]) : [];
      const coverageUp = coverage.map((t) => t.toUpperCase());
      if (coverageUp.length > 0) {
        apps = chain(apps)
          .sortBy((a) => !sortByCoverage(a, coverageUp))
          .value();
      }

      if (languagesUp.length > 0 && coverageUp.length > 0) {
        apps = chain(apps)
          .sortBy(
            (a) =>
              !(sortByLang(a, languagesUp) && sortByCoverage(a, coverageUp)),
          )
          .value();
      }

      setApps(apps);
      if (isDevelopment) {
        printCalcScore(apps);
      }
    })();
  }, [lang]);

  return { apps };
}
