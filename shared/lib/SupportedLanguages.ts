export const SupportedLanguages = [
  "en",
  "cs",
  "de",
  "el",
  "es",
  "et",
  "fr",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "no",
  "pl",
  "pt",
  "ru",
  "sv",
  "ta",
  "tr",
  "uk",
  "zh-hans",
  "zh-hant",
] as const;

// Languages with enough translations to be included in the sitemap, so search
// engines know about them and can index them.
export const SitemapLanguages = [
  "en",
  "cs",
  "de",
  "el",
  "es",
  "et",
  "fr",
  "hu",
  "sv",
  "ta",
  "uk",
  "zh-hant",
] as const;

export function toReadmeLanguage(lang: string) {
  lang = lang.toLowerCase();

  if (lang === "no") {
    return "nb_NO";
  } else if (lang === "zh-hans") {
    return "zh_Hans";
  } else if (lang === "zh-hant") {
    return "zh_Hant";
  }
  return lang;
}
