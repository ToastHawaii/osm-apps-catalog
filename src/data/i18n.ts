import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as en from "./locales/en.json";
import * as cs from "./locales/cs.json";
import * as de from "./locales/de.json";
import * as el from "./locales/el.json";
import * as es from "./locales/es.json";
import * as fr from "./locales/fr.json";
import * as id from "./locales/id.json";
import * as it from "./locales/it.json";
import * as ja from "./locales/ja.json";
import * as ko from "./locales/ko.json";
import * as nb_NO from "./locales/nb_NO.json";
import * as pl from "./locales/pl.json";
import * as pt from "./locales/pt.json";
import * as ru from "./locales/ru.json";
import * as tr from "./locales/tr.json";
import * as uk from "./locales/uk.json";
import * as zh_Hant from "./locales/zh_Hant.json";
import * as zh_Hans from "./locales/zh_Hans.json";

i18next.use(LanguageDetector).init({
  detection: {
    lookupQuerystring: "lang",
  },
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    cs: { translation: cs },
    de: { translation: de },
    el: { translation: el },
    es: { translation: es },
    fr: { translation: fr },
    id: { translation: id },
    it: { translation: it },
    ja: { translation: ja },
    ko: { translation: ko },
    no: { translation: nb_NO },
    pl: { translation: pl },
    pt: { translation: pt },
    ru: { translation: ru },
    tr: { translation: tr },
    uk: { translation: uk },
    zh: { translation: zh_Hant },
    "zh-Hans": { translation: zh_Hans },
  },
});
