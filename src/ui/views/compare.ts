import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { template } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";

export function render(filteredApps: App[]) {
  for (const p of Object.entries(template.params)) {
    const element = createElement(
      "div",
      [
        `<div class="cell" title="${
          getLocalizedValue(p[1].description, "en") || ""
        }">${getLocalizedValue(p[1].label, "en") || p[0]}</div>`,
        ...filteredApps.map(
          (a) => `<div class="cell">${a.params?.[p[0]] || ""}</div>`
        ),
      ].join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
}
