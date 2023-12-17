import i18next from "i18next";
import * as en from "./locales/en.json";
import * as no from "./locales/nb_NO.json";

i18next.init({
  lng:
    new URLSearchParams(location.search).get("lang")?.toLocaleLowerCase() ||
    "en",
  resources: {
    en: {
      translation: en,
    },
    no: {
      translation: no,
    },
  },
});
