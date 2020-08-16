import { initMap } from "./map";
import { filters } from "./filters";
import { attributes } from "./attributes";
import { local } from "./local";

initMap(
  filters,
  attributes,
   local
);

import "details-element-polyfill";
import { createElement } from "./utilities/html";

document.addEventListener("click", e => {
  const titleElement = document.querySelector(".attribut .title");
  if (titleElement) titleElement.remove();

  for (const target of e.composedPath()) {
    if (
      target &&
      (target as HTMLElement).classList &&
      (target as HTMLElement).classList.contains("attribut")
    ) {
      const titleElement = createElement(
        "span",
        (target as HTMLElement).title,
        ["title"]
      );

      (target as HTMLElement).append(titleElement);

      setTimeout(() => {
        titleElement.remove();
      }, 2000);
    }
  }
});
