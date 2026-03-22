import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { toUpper, uniq } from "lodash";
import i18next from "i18next";

import { getJson } from "@shared/utils/jsonRequest";
import { App } from "@shared/data/App";
import { isDevelopment } from "@shared/utils/isDevelopment";
import { prepareLanguage } from "@shared/data/prepareLanguage";
import { AppTranslation } from "@shared/data/AppTranslation";
import { mergeAppSources } from "@shared/lib/mergeAppSources";
import { languageValueToDisplay } from "@app/ui/lib/language";
import { getUserRegion } from "@lib/utils/getUserRegion";
import { some } from "@shared/utils/array";
import { useTranslation } from "react-i18next";
import { get, set } from "@lib/utils/storage";

function useUserContext() {
  const userRegion = getUserRegion();

  const userLangs = navigator.languages.map((l) => languageValueToDisplay(l));

  return {
    region: userRegion,
    languages: userLangs,
  };
}

async function loadData() {
  try {
    let data;
    if (!isDevelopment) {
      data = await getJson("/api/apps/all.json", {});
    } else {
      data = await getJson("https://osm-apps.org/api/apps/all.json", {});
    }

    try {
      set("appsData", data);
    } catch (error) {
      console.error("Data could not be cached.", error);
    }

    return data;
  } catch (error) {
    console.error("Data could not be loaded, try to use local cache.", error);
    return get("appsData") || [];
  }
}

async function loadTranslations(lang: string) {
  if (lang === "en") {
    return [];
  }

  try {
    if (!isDevelopment) {
      return await getJson(`/api/apps/all.${lang}.json`, {});
    } else {
      return await getJson(
        `https://osm-apps.org/api/apps/all.${lang}.json`,
        {},
      );
    }
  } catch {
    console.error(`Translations for ${lang} could not be loaded.`);
    return [];
  }
}

function useAppsData2() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const userContext = useUserContext();

  const [apps, setApps] = useState<App[]>([]);

  function matchesLanguage(app: App, languagesUp: string[]) {
    return some(app.cache.languages, languagesUp);
  }

  function matchesCoverage(app: App, coverageUp: string[]) {
    return (
      app.cache.coverage.some((a) =>
        coverageUp.some((c) => a.startsWith(c) || c.startsWith(a)),
      ) || app.coverage.length === 0
    );
  }

  function scoreAppForUser(app: App, languagesUp: string[], coverageUp: string[]) {
    let score = 0;

    const langMatch = matchesLanguage(app, languagesUp);
    const coverageMatch = matchesCoverage(app, coverageUp);

    if (langMatch) score += 1;
    if (coverageMatch) score += 2;

    return score;
  }

  useEffect(() => {
    let cancelled = false;

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

      const rawApps = (await appsQuery) as App[];

      if (cancelled) return;

      prepareLanguage(rawApps);

      let processedApps = rawApps.map((app) => ({
        ...app,
        cache: {
          topics: app.topics.map(toUpper),
          languages: app.languages.map(toUpper),
          platform: app.platform.map(toUpper),
          programmingLanguages: app.programmingLanguages?.map(toUpper) ?? [],
          coverage: app.coverage.map(toUpper),
        },
      }));

      const translationsLists = (await Promise.all(
        translationsQuery,
      )) as AppTranslation[][];

      if (cancelled) return;

      translationsLists
        .filter((t) => t.length > 0)
        .forEach((translations) => {
          const translationsMap = new Map(translations.map((t) => [t.id, t]));
          processedApps = processedApps.map((app) => {
            const translation = translationsMap.get(app.id);
            if (!translation) return app;

            return {
              ...app,
              name: translation.name || app.name,
              // It is better to have a translated text then a shorter text, so
              // we mix subtitle and description
              subtitle:
                translation.subtitle ||
                translation.descriptionShort ||
                translation.description ||
                app.subtitle,
              description: translation.description || app.description,
              descriptionShort:
                translation.descriptionShort ||
                translation.description ||
                app.descriptionShort,
              documentation: translation.documentation || app.documentation,
              community: { ...app.community, ...translation.community },
              source: mergeAppSources(app.source, translation.source),
            };
          });
        });

      // After sort by score: prefer apps that match the user's context.
      const userLangs = userContext.languages.map((l) =>
        languageValueToDisplay(l),
      );
      const languages =
        userLangs.length > 0
          ? uniq([languageValueToDisplay("mul"), ...userLangs])
          : [];
      const languagesUp = uniq(languages).map(toUpper);

      const userRegion = userContext.region;
      const coverage = userRegion ? uniq(["Worldwide", userRegion]) : [];
      const coverageUp = coverage.map(toUpper);

      if (languagesUp.length > 0 || coverageUp.length > 0) {
        processedApps = [...processedApps].sort(
          (a, b) =>
            // desc
            scoreAppForUser(b, languagesUp, coverageUp) -
            scoreAppForUser(a, languagesUp, coverageUp),
        );
      }

      if (!cancelled) {
        setApps(processedApps);
      }

      if (isDevelopment) {
        // printCalcScore(apps);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lang, JSON.stringify(userContext)]);

  return { apps };
}

const AppStateContext = createContext<{
  apps: App[];
} | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const { apps } = useAppsData2();

  const appState = useMemo(() => {
    return {
      apps,
    };
  }, [apps]);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppsData() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState outside provider");
  return ctx;
}
