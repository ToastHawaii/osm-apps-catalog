import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";

export function render(apps: App[]) {
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header"></div>`,
        ...apps.map(
          (app) =>
            `<div class="cell header text-center">${
              app.website
                ? `<a href="${app.website}" target="_blank">${app.name}</a>`
                : app.name
            }</div>`
        ),
      ].join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header"></div>`,
        ...apps.map(
          (app) => `<div class="cell align-middle text-center">
        ${
          app.website
            ? `<a href="${app.website}" target="_blank">${renderImage(app)}</a>`
            : renderImage(app)
        }
      </div>`
        ),
      ].join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }

  renderParam(
    apps,
    "Description",
    (app) => `<small>${app.description}</small>`
  );
  renderParam(apps, "Author", (app) => app.author);
  renderParam(apps, "Platforms", (app) => app.platform.join(", "));
}

function renderParam(
  apps: App[],
  label: string,
  value: (app: App) => string | undefined
) {
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header">${label}</div>`,
        ...apps.map(
          (app) => `<div class="cell">${value(app) || unknown()}</div>`
        ),
      ].join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }
}

function unknown() {
  return `unknown`;
}
