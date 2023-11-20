import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";

export function render(apps: App[]) {
  {
    const element = createElement(
      "div",
      apps
        .map(
          (app) =>
            `<div class="cell header"><strong>${
              app.website
                ? `<a href="${app.website}" target="_blank"><span itemprop="name">${app.name}</span></a>`
                : `<span itemprop="name">${app.name}</span>`
            }</strong></div>`
        )
        .join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
  {
    const element = createElement(
      "div",
      apps
        .map(
          (app) => `<div class="cell align-middle">
        ${
          app.website
            ? `<a href="${app.website}" target="_blank">${renderImage(app)}</a>`
            : renderImage(app)
        }
      </div>`
        )
        .join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
  {
    const element = createElement(
      "div",
      apps
        .map(
          (app) =>
            `<div class="cell"><small itemprop="description">${
              app.description
            }</small></div>`
        )
        .join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
}
