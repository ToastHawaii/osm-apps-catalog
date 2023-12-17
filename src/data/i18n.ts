import i18next from "i18next";
import * as en from "./locales/en.json";
import * as de from "./locales/de.json";
import * as no from "./locales/nb_NO.json";

i18next.init({
  lng:
    new URLSearchParams(location.search).get("lang")?.toLocaleLowerCase() ||
    "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    de: {
      translation: de,
    },
    no: {
      translation: no,
    },
  },
});
