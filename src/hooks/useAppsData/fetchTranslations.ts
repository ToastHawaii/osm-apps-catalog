import i18next from "i18next";

import { getJson } from "@shared/utils/jsonRequest";
import { isDevelopment } from "@shared/utils/isDevelopment";
import { AppTranslation } from "@shared/data/AppTranslation";

async function fetchTranslationsForOneLang(
  lang: string,
): Promise<AppTranslation[]> {
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

export function fetchTranslations(lang: string) {
  // Get fallback languages to load translations too
  const langs = (
    i18next.services.languageUtils.toResolveHierarchy(lang) as string[]
  )
    .map((l) => l.toLowerCase())
    .filter((l) => l !== "en")
    .reverse();

  const translationsQuery = langs.map(fetchTranslationsForOneLang);
  return translationsQuery;
}
