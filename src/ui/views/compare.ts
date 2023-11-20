import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";

export function render(apps: App[]) {
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header param-title"></div>`,
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
        `<div class="cell header param-title"></div>`,
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
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header param-title"></div>`,
        ...apps.map(
          (app) => `<div class="cell">
          ${
            app.website
              ? `<a class="download" href="${app.website}" target="_blank" title="Website" itemprop="url"><i class="far fa-map"></i></a>`
              : ""
          }
    
          ${
            app.install.asin
              ? `<a class="download" href="https://www.amazon.com/dp/${app.install.asin}" target="_blank" title="Amazon Appstore" itemprop="installUrl"><i class="fab fa-amazon"></i></a>`
              : ""
          }
          ${
            app.install.fDroidID
              ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}" target="_blank" title="F-Droid" itemprop="installUrl"><i class="fab fa-android"></i></a>`
              : ""
          }
          ${
            app.install.googlePlayID
              ? `<a class="download" href="https://play.google.com/store/apps/details?id=${app.install.googlePlayID}" target="_blank" title="Google Play" itemprop="installUrl"><i class="fab fa-google-play"></i></a>`
              : ""
          }
          ${
            app.install.huaweiAppGalleryID
              ? `<a class="download" href="https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}" target="_blank" title="Huawei App Gallery" itemprop="installUrl"><i class="fas fa-shopping-bag"></i></a>`
              : ""
          }
          ${
            app.install.appleStoreID
              ? `<a class="download" href="https://itunes.apple.com/app/${
                  app.install.appleStoreID.toUpperCase().startsWith("ID")
                    ? app.install.appleStoreID
                    : `id${app.install.appleStoreID}`
                }" target="_blank" title="iTunes App Store" itemprop="installUrl"><i class="fab fa-app-store-ios"></i></a>`
              : ""
          }
          ${
            app.install.macAppStoreID
              ? `<a class="download" href="https://itunes.apple.com/app/${
                  app.install.macAppStoreID.toUpperCase().startsWith("ID")
                    ? app.install.macAppStoreID
                    : `id${app.install.macAppStoreID}`
                }" target="_blank" title="Mac App Store" itemprop="installUrl"><i class="fab fa-app-store"></i></a>`
              : ""
          }
          ${
            app.install.microsoftAppID
              ? `<a class="download" href="http://www.windowsphone.com/s?appid=${app.install.microsoftAppID}" target="_blank" title="Microsoft Store" itemprop="installUrl"><i class="fab fa-microsoft"></i></a>`
              : ""
          }
      </div>`
        ),
      ].join(""),
      ["row"]
    );

    getHtmlElement("#compare").appendChild(element);
  }

  renderParam(apps, "Description", (app) => app.description);
  renderParam(apps, "Author", (app) => app.author);
  renderParam(apps, "Platforms", (app) => app.platform.join(", "));
  renderParam(apps, "Last release", (app) => app.lastRelease);
  renderParam(apps, "Languages", (app) =>
    app.languagesUrl
      ? `<a href="${app.languagesUrl}" target="_blank">
      ${
        app.languages.length > 0
          ? app.languages.join(", ")
          : `<i class="fas fa-language"></i>`
      }
    </a>`
      : app.languages.join(", ")
  );
  renderParam(apps, "License", (app) => app.license);
  renderParam(apps, "Source code", (app) =>
    app.sourceCode
      ? `<a href="${app.sourceCode}" target="_blank"><i class="fas fa-code"></i></a>`
      : ""
  );
  renderParam(apps, "Source", (app) =>
    app.source
      .map((s) => `<a href="${s.url}" target="_blank">${s.name}</a>`)
      .join(", ")
  );
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
        `<div class="cell header param-title">${label}</div>`,
        ...apps.map(
          (app) =>
            `<div class="cell param-text">${value(app) || unknown()}</div>`
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
