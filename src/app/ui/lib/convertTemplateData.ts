import { SupportedLanguages } from "@shared/lib/SupportedLanguages";

import { templateData } from "./templateData";

import templateEn from "../locales/wiki-software-template/en.json";
import templateCs from "../locales/wiki-software-template/cs.json";
import templateDe from "../locales/wiki-software-template/de.json";
import templateEl from "../locales/wiki-software-template/el.json";
import templateEs from "../locales/wiki-software-template/es.json";
import templateEt from "../locales/wiki-software-template/et.json";
import templateFr from "../locales/wiki-software-template/fr.json";
import templateHu from "../locales/wiki-software-template/hu.json";
import templateId from "../locales/wiki-software-template/id.json";
import templateIt from "../locales/wiki-software-template/it.json";
import templateJa from "../locales/wiki-software-template/ja.json";
import templateKo from "../locales/wiki-software-template/ko.json";
import templateNb_NO from "../locales/wiki-software-template/nb-NO.json";
import templatePl from "../locales/wiki-software-template/pl.json";
import templatePt from "../locales/wiki-software-template/pt.json";
import templateRu from "../locales/wiki-software-template/ru.json";
import templateSv from "../locales/wiki-software-template/sv.json";
import templateTa from "../locales/wiki-software-template/ta.json";
import templateTr from "../locales/wiki-software-template/tr.json";
import templateUk from "../locales/wiki-software-template/uk.json";
import templateZh_Hans from "../locales/wiki-software-template/zh_Hans.json";
import templateZh_Hant from "../locales/wiki-software-template/zh-Hant.json";

/**
 * This is a helper function to convert the wiki.openstreetmap.org Software template data to json files for i18n for this app.
 * It is not used in the application, but can be used manually when template data are updated or translated in the wiki.openstreetmap.org
 */

export function convertToJson() {
  const files = {} as Record<
    string,
    Record<string, { label?: string; description?: string }>
  >;
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
  SupportedLanguages.forEach((lang) => {
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

/**
 * This is a helper function to convert json files back to the template data for the wiki.openstreetmap.org Software template https://wiki.openstreetmap.org/w/index.php?title=Template:Software/doc&action=edit&templatedata=edit.
 * It is not used in the application, but can be used manually when template data are updated or translated in weblate.
 */
export function convertFromJson() {
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
  } as Record<string, Record<string, { label?: string; description?: string }>>;

  Object.entries(templateData.params).forEach((e) => {
    const label = {} as any;
    SupportedLanguages.forEach((lang) => {
      label[lang] = files[lang][e[0]]?.label;
    });
    templateData.params[e[0]].label = label;
    const description = {} as any;
    SupportedLanguages.forEach((lang) => {
      description[lang] = files[lang][e[0]]?.description;
    });
    templateData.params[e[0]].description = description;
  });

  console.info(JSON.stringify(templateData, undefined, "  "));
}
