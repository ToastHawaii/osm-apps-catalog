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

import { createElement, getHtmlElement } from "./utilities/html";
import { App } from "./template/utilities";
import { textToColor } from "./utilities/string";
import { Solver } from "./utilities/coloriz/Solver";
import { Color } from "./utilities/coloriz/Color";

export function render(obj: App) {
  const element = createElement(
    "div",
    `<div class="header">
        <div class="name">${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${obj.name}</a>`
            : obj.name
        }</div>
        ${
          obj.website
            ? `<a href="${obj.website}" target="_blank">${renderImage(obj)}</a>`
            : renderImage(obj)
        }
      </div>
      <div class="description">${obj.description} ${
      obj.wiki ? `<a href="${obj.wiki}" target="_blank">Wiki</a>` : ""
    }</div>
      ${
        obj.website
          ? `<a class="link" href="${obj.website}" target="_blank" title="Website"><i class="far fa-map"></i></a>`
          : ""
      }

      ${
        obj.install.asin
          ? `<a class="link" href="https://www.amazon.com/dp/${obj.install.asin}" target="_blank" title="Amazon Appstore"><i class="fab fa-amazon"></i></a>`
          : ""
      }
      ${
        obj.install.bbWorldID
          ? `<a class="link" href="https://appworld.blackberry.com/webstore/content/${obj.install.bbWorldID}/" target="_blank" title="BlackBerry World"><i class="fab fa-blackberry"></i></a>`
          : ""
      }
      ${
        obj.install.fDroidID
          ? `<a class="link" href="https://f-droid.org/repository/browse/?fdid=${obj.install.fDroidID}" target="_blank" title="F-Droid"><i class="fab fa-android"></i></a>`
          : ""
      }
      ${
        obj.install.googlePlayID
          ? `<a class="link" href="https://play.google.com/store/apps/details?id=${obj.install.googlePlayID}" target="_blank" title="Google Play"><i class="fab fa-google-play"></i></a>`
          : ""
      }
      ${
        obj.install.appleStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              obj.install.appleStoreID.toUpperCase().startsWith("ID")
                ? obj.install.appleStoreID
                : `id${obj.install.appleStoreID}`
            }" target="_blank" title="iTunes App Store"><i class="fab fa-app-store-ios"></i></a>`
          : ""
      }
      ${
        obj.install.macAppStoreID
          ? `<a class="link" href="https://itunes.apple.com/app/${
              obj.install.macAppStoreID.toUpperCase().startsWith("ID")
                ? obj.install.macAppStoreID
                : `id${obj.install.macAppStoreID}`
            }" target="_blank" title="Mac App Store"><i class="fab fa-app-store"></i></a>`
          : ""
      }
      ${
        obj.install.microsoftAppID
          ? `<a class="link" href="http://www.windowsphone.com/s?appid=${obj.install.microsoftAppID}" target="_blank" title="Microsoft Store"><i class="fab fa-microsoft"></i></a>`
          : ""
      }
      <div class="topics">${obj.topics
        .map(t => {
          const background = textToColor(t);

          const yiq =
            (background.r * 299 + background.g * 587 + background.b * 114) /
            1000;

          return `<span class="topic" style="background: rgb(${background.r},${
            background.g
          },${background.b}); color:${
            yiq >= 128 ? "black" : "white"
          };">${t}</span>`;
        })
        .join("")}</div>

        ${
          obj.author ||
          obj.platform.length > 0 ||
          obj.languages.length > 0 ||
          obj.sourceCode
            ? `
            <a class="more-infos-button" href="#">More <i class="fas fa-angle-down"></i></a>
            <div class="more-infos" style="display:none;">
        <div class="more-infos-title">Informations</div>
        ${
          obj.author
            ? `<div class="more-info">
          <span class="more-info-title">Author</span> <span class="more-info-text">${obj.author}</span>
        </div>`
            : ""
        }
        ${
          obj.platform.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Platforms</span> <span class="more-info-text">${obj.platform.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          obj.lastRelease
            ? `<div class="more-info">
          <span class="more-info-title">Last release</span> <span class="more-info-text">${obj.lastRelease}</span>
        </div>`
            : ""
        }
        ${
          obj.languagesUrl
            ? `<a class="more-info" href="${obj.languagesUrl}" target="_blank">
                <span class="more-info-title">Languages</span> <span class="more-info-text">${
                  obj.languages.length > 0
                    ? obj.languages.join(", ")
                    : `<i class="fas fa-language"></i>`
                }</span>
              </a>`
            : obj.languages.length > 0
            ? `<div class="more-info">
          <span class="more-info-title">Languages</span> <span class="more-info-text">${obj.languages.join(
            ", "
          )}</span>
        </div>`
            : ""
        }
        ${
          obj.sourceCode
            ? `<a class="more-info" href="${obj.sourceCode}" target="_blank">
          <span class="more-info-title">Source code</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        </div>`
            : ""
        }

        `,
    ["app"]
  );

  const moreButton = element.querySelector(
    ".more-infos-button"
  ) as HTMLButtonElement;

  const moreInfos = element.querySelector(".more-infos") as HTMLElement;

  moreButton?.addEventListener("click", ev => {
    moreButton?.setAttribute("style", "display: none;");
    moreInfos?.setAttribute("style", "");

    ev.preventDefault();
  });

  getHtmlElement(".apps").appendChild(element);
}

function renderImage(obj: App) {
  const defaultImage =
    "https://wiki.openstreetmap.org/w/images/thumb/c/ca/Map-14.svg/140px-Map-14.svg.png";
  const defaultColor = textToColor(obj.name);
  const filter = new Solver(
    new Color(defaultColor.r, defaultColor.g, defaultColor.b)
  )
    .solve()
    .filter.replace(/filter:/gi, "filter: brightness(0%)");

  return obj.images.length > 0
    ? `<img class="img" src="${defaultImage}" dynamic-src="${obj.images.join(
        " "
      )} ${defaultImage}"/>`
    : `<img class="img" style="${filter}" src="${defaultImage}"/>`;
}
