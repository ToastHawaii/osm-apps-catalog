// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";
import { renderBadges } from "./renderBadges";

export function render(app: App) {
  const element = createElement(
    "div",
    `<div class="header">
        <div><div class="corner-badge">${
          app.libre
            ? '<span title="Libre"><i class="fas fa-fw fa-book-open"></i></span>'
            : app.gratis
            ? '<span title="Proprietary"><i class="fas fa-wine-bottle"></i></span>'
            : ""
        }${
      app.gratis || app.libre
        ? '<span title="Free"><i class="fas fa-fw fa-gift"></i></span>'
        : ""
    }</div><strong>${
      app.website
        ? `<a href="${app.website}" target="_blank">${app.name}</a>`
        : app.name
    }</strong></div>
        ${
          app.website
            ? `<a href="${app.website}" target="_blank">${renderImage(app)}</a>`
            : renderImage(app)
        }
      </div>
      <div><small>${app.description}${
      app.documentation
        ? ` <a href="${app.documentation}" target="_blank">Documentation</a>`
        : ""
    }</small></div>
      ${
        app.website
          ? `<a class="download" href="${app.website}" target="_blank" title="Website"><i class="far fa-map"></i></a>`
          : ""
      }

      ${
        app.install.asin
          ? `<a class="download" href="https://www.amazon.com/dp/${app.install.asin}" target="_blank" title="Amazon Appstore"><i class="fab fa-amazon"></i></a>`
          : ""
      }
      ${
        app.install.fDroidID
          ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}" target="_blank" title="F-Droid"><i class="fab fa-android"></i></a>`
          : ""
      }
      ${
        app.install.googlePlayID
          ? `<a class="download" href="https://play.google.com/store/apps/details?id=${app.install.googlePlayID}" target="_blank" title="Google Play"><i class="fab fa-google-play"></i></a>`
          : ""
      }
      ${
        app.install.huaweiAppGalleryID
          ? `<a class="download" href="https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}" target="_blank" title="Huawei App Gallery"><i class="fas fa-shopping-bag"></i></a>`
          : ""
      }
      ${
        app.install.appleStoreID
          ? `<a class="download" href="https://itunes.apple.com/app/${
              app.install.appleStoreID.toUpperCase().startsWith("ID")
                ? app.install.appleStoreID
                : `id${app.install.appleStoreID}`
            }" target="_blank" title="iTunes App Store"><i class="fab fa-app-store-ios"></i></a>`
          : ""
      }
      ${
        app.install.macAppStoreID
          ? `<a class="download" href="https://itunes.apple.com/app/${
              app.install.macAppStoreID.toUpperCase().startsWith("ID")
                ? app.install.macAppStoreID
                : `id${app.install.macAppStoreID}`
            }" target="_blank" title="Mac App Store"><i class="fab fa-app-store"></i></a>`
          : ""
      }
      ${
        app.install.microsoftAppID
          ? `<a class="download" href="https://www.microsoft.com/store/apps/${app.install.microsoftAppID}" target="_blank" title="Microsoft Store"><i class="fab fa-microsoft"></i></a>`
          : ""
      }
      <div class="badges">${renderBadges(app.topics)}</div>

            <a class="more-infos-button" href="#">More <i class="fas fa-angle-down"></i></a>
            <div class="more-infos" style="display:none;">
        <div class="more-infos-title">Informations</div>
        ${
          app.platform.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Platforms</span> <span class="more-info-text">${app.platform.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          app.lastRelease
            ? `<div class="more-info">
          <span class="more-info-title">Last release</span> <span class="more-info-text">${app.lastRelease}</span>
        </div>`
            : ""
        }
        ${
          app.languagesUrl
            ? `<a class="more-info" href="${app.languagesUrl}" target="_blank">
                <span class="more-info-title">Languages</span> <span class="more-info-text">${
                  app.languages.length > 0
                    ? app.languages.join(", ")
                    : `<i class="fas fa-language"></i>`
                }</span>
              </a>`
            : app.languages.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Languages</span> <span class="more-info-text">${app.languages.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          app.coverage && app.coverage.length
            ? `<div class="more-info">
          <span class="more-info-title">Coverage</span> <span class="more-info-text">${
            app.coverage[app.coverage.length - 1]
          }</span>
        </div>`
            : ""
        }
        ${
          app.author
            ? `<div class="more-info">
          <span class="more-info-title">Author</span> <span class="more-info-text">${app.author}</span>
        </div>`
            : ""
        }
        ${
          app.price
            ? `<div class="more-info">
          <span class="more-info-title">Price</span> <span class="more-info-text">${app.price}</span>
        </div>`
            : ""
        }
        ${
          app.license
            ? `<div class="more-info">
          <span class="more-info-title">License</span> <span class="more-info-text">${app.license}</span>
        </div>`
            : ""
        }
        ${
          app.sourceCode
            ? `<a class="more-info" href="${app.sourceCode}" target="_blank">
          <span class="more-info-title">Source code</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        <div class="more-info">
        <span class="more-info-title">Source</span> <span class="more-info-text">${app.source
          .map((s) => `<a href="${s.url}" target="_blank">${s.displayName}</a>`)
          .join(", ")}</span>
        </div>
        `,
    ["app"]
  );

  const moreButton = element.querySelector(
    ".more-infos-button"
  ) as HTMLButtonElement;

  const moreInfos = element.querySelector(".more-infos") as HTMLElement;

  moreButton?.addEventListener("click", (ev) => {
    moreButton?.setAttribute("style", "display: none;");
    moreInfos?.setAttribute("style", "");

    ev.preventDefault();
  });

  getHtmlElement("#list").appendChild(element);
}
