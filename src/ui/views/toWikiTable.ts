import { App } from "../../data/template/utilities";
import { templateData } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";
import { equalsIgnoreCase, equalsYes } from "../utilities/string";

export function toWikiTable(
  apps: App[],
  params: string[],
  id: string,
  lang: string
) {
  const appWithFields = apps
    .filter((app) => params.some((p) => (app as any)[id]?.[p]))
    .sort((a, b) => {
      const nameA = a.name.toUpperCase() || "";
      const nameB = b.name.toUpperCase() || "";
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

  let rows = params
    .map((p) => {
      if (
        !appWithFields
          .map((app) => (app as any)[id]?.[p])
          .some(
            (values: string[] | undefined) =>
              values &&
              values.filter((v) => v && v.toUpperCase() !== "NO").length > 0
          )
      ) {
        return undefined;
      }

      return `! title="${getLocalizedValue(
        templateData.params[p].description,
        lang
      )}" |${getLocalizedValue(templateData.params[p].label, lang)}
${appWithFields
  .map((app) => `|${toWikiValue((app as any)[id]?.[p])}\n`)
  .join("")}`;
    })
    .filter((e) => e);

  const wikiTable = `<div style="overflow-x:auto;max-width:100%">
{| class="wikitable sticky" style="font-size: 85%; text-align: center;"
|+
! title="${getLocalizedValue(
    templateData.params["name"].description,
    lang
  )}" |${getLocalizedValue(templateData.params["name"].label, lang)}
${appWithFields.map((app) => `!${app.name || "{{?}}"}\n`).join("")}|-
${rows.join("|-\n")}|}
</div>`;
  return wikiTable;
}

function toWikiValue(value: string | string[] | undefined): string {
  debugger;
  if (!value) {
    return "{{?}}";
  }

  if (typeof value === "string") {
    if (equalsYes(value)) {
      return "{{yes}}";
    } else if (equalsIgnoreCase(value, "no")) {
      return "{{no}}";
    }
    return value;
  }

  if (value.length === 0) {
    return "{{?}}";
  }

  return value.map((v) => toWikiValue(v)).join(", ");
}
