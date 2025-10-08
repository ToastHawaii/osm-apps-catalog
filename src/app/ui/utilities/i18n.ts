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
import * as sv from "../locales/sv.json";
import * as ta from "../locales/ta.json";
import * as tr from "../locales/tr.json";
import * as uk from "../locales/uk.json";
import * as zh_Hans from "../locales/zh_Hans.json";
import * as zh_Hant from "../locales/zh_Hant.json";

import { templateData } from "./templateData";

import * as templateEn from "../locales/wiki-software-template/en.json";
import * as templateCs from "../locales/wiki-software-template/cs.json";
import * as templateDe from "../locales/wiki-software-template/de.json";
import * as templateEl from "../locales/wiki-software-template/el.json";
import * as templateEs from "../locales/wiki-software-template/es.json";
import * as templateEt from "../locales/wiki-software-template/et.json";
import * as templateFr from "../locales/wiki-software-template/fr.json";
import * as templateHu from "../locales/wiki-software-template/hu.json";
import * as templateId from "../locales/wiki-software-template/id.json";
import * as templateIt from "../locales/wiki-software-template/it.json";
import * as templateJa from "../locales/wiki-software-template/ja.json";
import * as templateKo from "../locales/wiki-software-template/ko.json";
import * as templateNb_NO from "../locales/wiki-software-template/nb-NO.json";
import * as templatePl from "../locales/wiki-software-template/pl.json";
import * as templatePt from "../locales/wiki-software-template/pt.json";
import * as templateRu from "../locales/wiki-software-template/ru.json";
import * as templateSv from "../locales/wiki-software-template/sv.json";
import * as templateTa from "../locales/wiki-software-template/ta.json";
import * as templateTr from "../locales/wiki-software-template/tr.json";
import * as templateUk from "../locales/wiki-software-template/uk.json";
import * as templateZh_Hans from "../locales/wiki-software-template/zh_Hans.json";
import * as templateZh_Hant from "../locales/wiki-software-template/zh-Hant.json";

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
      el: { translation: { ...el, "app.props": templateEl } },
      es: { translation: { ...es, "app.props": templateEs } },
      et: { translation: { ...et, "app.props": templateEt } },
      fr: { translation: { ...fr, "app.props": templateFr } },
      hu: { translation: { ...hu, "app.props": templateHu } },
      id: { translation: { ...id, "app.props": templateId } },
      it: { translation: { ...it, "app.props": templateIt } },
      ja: { translation: { ...ja, "app.props": templateJa } },
      ko: { translation: { ...ko, "app.props": templateKo } },
      no: { translation: { ...nb_NO, "app.props": templateNb_NO } },
      pl: { translation: { ...pl, "app.props": templatePl } },
      pt: { translation: { ...pt, "app.props": templatePt } },
      ru: { translation: { ...ru, "app.props": templateRu } },
      sv: { translation: { ...sv, "app.props": templateSv } },
      ta: { translation: { ...ta, "app.props": templateTa } },
      tr: { translation: { ...tr, "app.props": templateTr } },
      uk: { translation: { ...uk, "app.props": templateUk } },
      "zh-hans": { translation: { ...zh_Hans, "app.props": templateZh_Hans } },
      "zh-hant": { translation: { ...zh_Hant, "app.props": templateZh_Hant } },
    },
  });

const templateLangs = [
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
];

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
    el: templateEl,
    es: templateEs,
    et: templateEt,
    fr: templateFr,
    hu: templateHu,
    id: templateId,
    it: templateIt,
    ja: templateJa,
    ko: templateKo,
    no: templateNb_NO,
    pl: templatePl,
    pt: templatePt,
    ru: templateRu,
    sv: templateSv,
    ta: templateTa,
    tr: templateTr,
    uk: templateUk,
    "zh-hans": templateZh_Hans,
    "zh-hant": templateZh_Hant,
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

  console.info(JSON.stringify(templateData, undefined, "  "));
}

// convertTemplateDataToJson();
// convertJsonToTemplateData();
