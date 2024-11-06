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
import { renderFree } from "./renderFree";
import i18next from "i18next";

export function render(app: App) {
  const element = createElement(
    "div",
    `<div class="header">
      
      <div class="with-corner-badge">${renderFree(app)}<strong>${
      app.website
        ? `<a href="${app.website}" target="_blank">${app.name}</a>`
        : app.name
    }</strong></div>
        ${
          app.website
            ? `<a href="${app.website}" target="_blank" title="${app.name}">${renderImage(app)}</a>`
            : renderImage(app)
        }
      </div>
      <div><small>${app.description}${
      app.documentation
        ? ` <a href="${app.documentation}" target="_blank">${i18next.t(
            "list.documentation"
          )}</a>`
        : ""
    }</small></div>
      ${
        app.website
          ? `<a class="download" href="${app.website}" title="${i18next.t(
              "app.website"
            )}"><i class="far fa-map"></i></a>`
          : ""
      }

      ${
        app.install.asin
          ? `<a class="download" href="https://www.amazon.com/dp/${
              app.install.asin
            }" title="${i18next.t(
              "app.install.asin"
            )}"><i class="fab fa-amazon"></i></a>`
          : ""
      }
      ${
        app.install.fDroidID
          ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${
              app.install.fDroidID
            }" title="${i18next.t(
              "app.install.fDroid"
            )}"><i class="fab fa-android"></i></a>`
          : ""
      }
      ${
        app.install.obtainiumLink
          ? `<a class="download" href="${
              app.install.obtainiumLink
            }" title="${i18next.t(
              "app.install.obtainiumLink"
            )}" ><i class="fas fa-gem" style="transform: rotate(315deg);"></i></a>`
          : ""
      }
      ${
        app.install.googlePlayID
          ? `<a class="download" href="https://play.google.com/store/apps/details?id=${
              app.install.googlePlayID
            }" title="${i18next.t(
              "app.install.googlePlay"
            )}"><i class="fab fa-google-play"></i></a>`
          : ""
      }
      ${
        app.install.huaweiAppGalleryID
          ? `<a class="download" href="https://appgallery.huawei.com/#/app/${
              app.install.huaweiAppGalleryID
            }" title="${i18next.t(
              "app.install.huaweiAppGallery"
            )}"><i class="fas fa-shopping-bag"></i></a>`
          : ""
      }
      ${
        app.install.appleStoreID
          ? `<a class="download" href="https://apps.apple.com/app/${
              app.install.appleStoreID.toUpperCase().startsWith("ID")
                ? app.install.appleStoreID
                : `id${app.install.appleStoreID}`
            }" title="${i18next.t(
              "app.install.appleStore"
            )}"><i class="fab fa-app-store-ios"></i></a>`
          : ""
      }
      ${
        app.install.macAppStoreID
          ? `<a class="download" href="https://apps.apple.com/app/${
              app.install.macAppStoreID.toUpperCase().startsWith("ID")
                ? app.install.macAppStoreID
                : `id${app.install.macAppStoreID}`
            }" title="${i18next.t(
              "app.install.macAppStore"
            )}"><i class="fab fa-app-store"></i></a>`
          : ""
      }
      ${
        app.install.microsoftAppID
          ? `<a class="download" href="https://apps.microsoft.com/detail/${
              app.install.microsoftAppID
            }" title="${i18next.t(
              "app.install.microsoftApp"
            )}"><i class="fab fa-microsoft"></i></a>`
          : ""
      }
      <div class="badges">${renderBadges(app.topics)}</div>

            <a class="more-infos-button" href="#">More <i class="fas fa-angle-down"></i></a>
            <div class="more-infos" style="display:none;">
        <div class="more-infos-title">${i18next.t("list.moreInfos")}</div>
        ${
          app.platform.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.platforms"
          )}</span> <span class="more-info-text">${app.platform.join(
                ", "
              )}</span>
        </div>`
            : ""
        }
        ${
          app.lastRelease || app.unmaintained
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.lastRelease"
          )}</span> <span class="more-info-text">${
                app.lastRelease ? app.lastRelease : "????-??-??"
              }${
                app.unmaintained
                  ? ` <span class="warning">(<i class="fas fa-exclamation-triangle"></i> Unmaintained)</span>`
                  : ""
              }</span>
        </div>`
            : ""
        }
        ${
          app.languagesUrl
            ? `<a class="more-info" href="${app.languagesUrl}" target="_blank">
                <span class="more-info-title">${i18next.t(
                  "app.languages"
                )}</span> <span class="more-info-text">${
                app.languages.length > 0
                  ? app.languages.join(", ")
                  : `<i class="fas fa-language"></i>`
              }</span>
              </a>`
            : app.languages.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.languages"
          )}</span> <span class="more-info-text">${app.languages.join(
                ", "
              )}</span>
        </div>`
            : ""
        }
        ${
          app.coverage && app.coverage.length
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.coverage"
          )}</span> <span class="more-info-text">${
                app.coverage[app.coverage.length - 1]
              }</span>
        </div>`
            : ""
        }
        ${
          app.author
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.author"
          )}</span> <span class="more-info-text">${app.author}</span>
        </div>`
            : ""
        }
        ${
          app.price
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t("app.price")}</span> <span class="more-info-text">${app.price}</span>
        </div>`
            : ""
        }
        ${
          app.license
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t("app.license")}</span> <span class="more-info-text">${app.license}</span>
        </div>`
            : ""
        }
        ${
          app.sourceCode
            ? `<a class="more-info" href="${app.sourceCode}" target="_blank">
          <span class="more-info-title">${i18next.t("app.sourceCode")}</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        <div class="more-info">
        <span class="more-info-title">${i18next.t("app.source")}</span> <span class="more-info-text">${app.source
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
