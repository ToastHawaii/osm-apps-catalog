import i18next from "i18next";
import * as en from "./locales/en.json";
import * as cs from "./locales/cs.json";
import * as de from "./locales/de.json";
import * as es from "./locales/es.json";
import * as fr from "./locales/fr.json";
import * as it from "./locales/it.json";
import * as ja from "./locales/ja.json";
import * as nb_NO from "./locales/nb_NO.json";
import * as pl from "./locales/pl.json";
import * as ru from "./locales/ru.json";
import * as ku from "./locales/ku.json";

i18next.init({
  lng:
    new URLSearchParams(location.search).get("lang")?.toLocaleLowerCase() ||
    "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    cs: {
      translation: cs,
    },
    de: {
      translation: de,
    },
    es: {
      translation: es,
    },
    fr: {
      translation: fr,
    },
    it: {
      translation: it,
    },
    ja: {
      translation: ja,
    },
    no: {
      translation: nb_NO,
    },
    pl: {
      translation: pl,
    },
    ru: {
      translation: ru,
    },
    uk: {
      translation: uk,
    },
  },
});
