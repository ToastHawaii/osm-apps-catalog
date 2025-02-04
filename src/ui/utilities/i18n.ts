import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as en from "../locales/en.json";
import * as cs from "../locales/cs.json";
import * as de from "../locales/de.json";
import * as el from "../locales/el.json";
import * as es from "../locales/es.json";
import * as et from "../locales/et.json";
import * as fr from "../locales/fr.json";
import * as hu from "../locales/hu.json";
import * as id from "../locales/id.json";
import * as it from "../locales/it.json";
import * as ja from "../locales/ja.json";
import * as ko from "../locales/ko.json";
import * as nb_NO from "../locales/nb_NO.json";
import * as pl from "../locales/pl.json";
import * as pt from "../locales/pt.json";
import * as ru from "../locales/ru.json";
import * as ta from "../locales/ta.json";
import * as tr from "../locales/tr.json";
import * as uk from "../locales/uk.json";
import * as zh_Hant from "../locales/zh_Hant.json";
import * as zh_Hans from "../locales/zh_Hans.json";

import { templateData } from "./templateData";

import * as templateEn from "../locales/wiki-software-template/en.json";
import * as templateCs from "../locales/wiki-software-template/cs.json";
import * as templateDe from "../locales/wiki-software-template/de.json";
import * as templateEs from "../locales/wiki-software-template/es.json";
import * as templateEt from "../locales/wiki-software-template/et.json";
import * as templateHu from "../locales/wiki-software-template/hu.json";
import * as templateTa from "../locales/wiki-software-template/ta.json";
import * as templateZh_Hans from "../locales/wiki-software-template/zh_Hans.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      lookupQuerystring: "lang",
    },
    fallbackLng: "en",
    resources: {
      en: { translation: { ...en, "app.props": templateEn } },
      cs: { translation: { ...cs, "app.props": templateCs } },
      de: { translation: { ...de, "app.props": templateDe } },
      el: { translation: el },
      es: { translation: { ...es, "app.props": templateEs } },
      et: { translation: { ...et, "app.props": templateEt } },
      fr: { translation: fr },
      hu: { translation: { ...hu, "app.props": templateHu } },
      id: { translation: id },
      it: { translation: it },
      ja: { translation: ja },
      ko: { translation: ko },
      no: { translation: nb_NO },
      pl: { translation: pl },
      pt: { translation: pt },
      ru: { translation: ru },
      tr: { translation: tr },
      ta: { translation: { ...ta, "app.props": templateTa } },
      uk: { translation: uk },
      zh: { translation: zh_Hant },
      "zh-Hans": { translation: { ...zh_Hans, "app.props": templateZh_Hans } },
    },
  });

const templateLangs = ["en", "cs", "de", "es", "et", "hu", "ta", "zh-hans"];

function convertTemplateDataToJson() {
  const files = {} as {
    [lang: string]: {
      [param: string]: { label?: string; description?: string };
    };
  };
  {
    const lang = "en";
    Object.entries(templateData.params).forEach((e) => {
      if (!files[lang]) {
        files[lang] = {};
      }
      if (!files[lang][e[0]]) {
        files[lang][e[0]] = {};
      }

      if (typeof e[1].label === "string") {
        files[lang][e[0]].label = e[1].label;
      } else if (e[1].label?.[lang]) {
        files[lang][e[0]].label = e[1].label?.[lang];
      }

      if (typeof e[1].description === "string") {
        files[lang][e[0]].description = e[1].description;
      } else if (e[1].description?.[lang]) {
        files[lang][e[0]].description = e[1].description?.[lang];
      }
    });
  }
  templateLangs.forEach((lang) => {
    Object.entries(templateData.params).forEach((e) => {
      if (!files[lang]) {
        files[lang] = {};
      }
      if (!files[lang][e[0]]) {
        files[lang][e[0]] = {};
      }

      if (typeof e[1].label !== "string" && e[1].label?.[lang]) {
        files[lang][e[0]].label = e[1].label?.[lang];
      }

      if (typeof e[1].description !== "string" && e[1].description?.[lang]) {
        files[lang][e[0]].description = e[1].description?.[lang];
      }
    });
  });

  console.info(JSON.stringify(files));
}

function convertJsonToTemplateData() {
  const files = {
    en: templateEn,
    cs: templateCs,
    de: templateDe,
    es: templateEs,
    hu: templateHu,
    "zh-hans": templateZh_Hans,
  } as {
    [lang: string]: {
      [param: string]: { label?: string; description?: string };
    };
  };

  Object.entries(templateData.params).forEach((e) => {
    const label = {} as any;
    templateLangs.forEach((lang) => {
      label[lang] = files[lang][e[0]]?.label;
    });
    templateData.params[e[0]].label = label;
    const description = {} as any;
    templateLangs.forEach((lang) => {
      description[lang] = files[lang][e[0]]?.description;
    });
    templateData.params[e[0]].description = description;
  });

  console.info(JSON.stringify(templateData));
}

// convertTemplateDataToJson();
// convertJsonToTemplateData();
