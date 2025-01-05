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
import { App, toSourceDisplayText } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";
import { renderBadges } from "./renderBadges";
import { renderScore } from "./renderScore";
import { renderFree } from "./renderFree";
import i18next from "i18next";
import { getMatrix } from "./getMatrix";
import { features } from "../../features";

export function render(app: App, open = false) {
  const link = new URLSearchParams();
  link.set("search", `"${app.name}"`);

  const element = createElement(
    "div",
    `<div class="header">
      
      <div class="with-corner-badge">${renderScore(app)}${
      features.freeFilter ? renderFree(app) : ""
    }<strong>${
      app.website
        ? `<a href="${app.website}" target="_blank">${app.name}</a>`
        : app.name
    }</strong></div>
        ${
          app.website
            ? `<a href="${app.website}" target="_blank" title="${
                app.name
              }">${renderImage(app)}</a>`
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
            )}"><i class="far fa-map fa-fw"></i></a>`
          : ""
      }

      ${
        app.install.asin
          ? `<a class="download" href="https://www.amazon.com/dp/${
              app.install.asin
            }" title="${i18next.t(
              "app.install.asin"
            )}"><i class="fab fa-amazon fa-fw"></i></a>`
          : ""
      }
      ${
        app.install.fDroidID
          ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${
              app.install.fDroidID
            }" title="${i18next.t(
              "app.install.fDroid"
            )}"><i class="fab fa-android fa-fw"></i></a>`
          : ""
      }
      ${
        app.install.obtainiumLink
          ? `<a class="download" href="${
              app.install.obtainiumLink
            }" title="${i18next.t(
              "app.install.obtainium"
            )}" ><i class="fas fa-gem fa-fw" style="transform: rotate(315deg);"></i></a>`
          : ""
      }
      ${
        app.install.googlePlayID
          ? `<a class="download" href="https://play.google.com/store/apps/details?id=${
              app.install.googlePlayID
            }" title="${i18next.t(
              "app.install.googlePlay"
            )}"><i class="fab fa-google-play fa-fw"></i></a>`
          : ""
      }
      ${
        app.install.huaweiAppGalleryID
          ? `<a class="download" href="https://appgallery.huawei.com/#/app/${
              app.install.huaweiAppGalleryID
            }" title="${i18next.t(
              "app.install.huaweiAppGallery"
            )}"><i class="fas fa-shopping-bag fa-fw"></i></a>`
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
            )}"><i class="fab fa-app-store-ios fa-fw"></i></a>`
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
            )}"><i class="fab fa-app-store fa-fw"></i></a>`
          : ""
      }
      ${
        app.install.microsoftAppID
          ? `<a class="download" href="https://apps.microsoft.com/detail/${
              app.install.microsoftAppID
            }" title="${i18next.t(
              "app.install.microsoftApp"
            )}"><i class="fab fa-microsoft fa-fw"></i></a>`
          : ""
      }
      <div class="badges">${renderBadges(app.topics)}</div>

            ${
              !open
                ? `<a class="more-infos-button" href="?${link.toString()}" ">${i18next.t(
                    "list.more"
                  )} <i class="fas fa-angle-down"></i></a>`
                : ""
            }
            <div class="more-infos" style="${!open ? "display:none;" : ""}">
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
          Object.values(app.community).filter((v) => v).length > 0
            ? `<div class="more-info">
            <span class="more-info-title">${i18next.t(
              "app.community"
            )}</span> <span class="more-info-text">${
                app.community.forum
                  ? `<a class="community" href="${
                      app.community.forum
                    }" title="${i18next.t(
                      "app.community.forum"
                    )}"><i class="fas fa-comments fa-fw"></i></a>`
                  : ""
              }${
                app.community.forumTag
                  ? `<a class="community" href="https://community.openstreetmap.org/tag/${
                      app.community.forumTag
                    }" title="${i18next.t(
                      "app.community.forumTag"
                    )}"><i class="fas fa-tag fa-fw"></i></a>`
                  : ""
              }${
                getMatrix(app.community.matrix, app.community.irc)
                  ? `<a class="community" href="https://matrix.to/#/${getMatrix(
                      app.community.matrix,
                      app.community.irc
                    )}" title="${i18next.t(
                      "app.community.matrix"
                    )}"><i>[m]</i></a>`
                  : ""
              }${
                app.community.mastodon
                  ? `<a class="community" href="https://fedirect.toolforge.org/?id=${
                      app.community.mastodon
                    }" title="${i18next.t(
                      "app.community.mastodon"
                    )}"><i class="fab fa-mastodon fa-fw"></i></a>`
                  : ""
              }${
                app.community.bluesky
                  ? `<a class="community" href="https://bsky.app/profile/${
                      app.community.bluesky
                    }" title="${i18next.t(
                      "app.community.bluesky"
                    )}"><img src="/icons/bluesky.svg" height="18px" /></a>`
                  : ""
              }${
                app.community.reddit
                  ? `<a class="community" href="https://www.reddit.com/r/${
                      app.community.reddit
                    }" title="${i18next.t(
                      "app.community.reddit"
                    )}"><i class="fab fa-reddit fa-fw"></i></a>`
                  : ""
              }${
                app.community.slack
                  ? `<a class="community" href="${
                      app.community.slack
                    }" title="${i18next.t(
                      "app.community.slack"
                    )}"><i class="fab fa-slack-hash fa-fw"></i></a>`
                  : ""
              }${
                app.community.telegram
                  ? `<a class="community" href="https://telegram.me/${
                      app.community.telegram
                    }" title="${i18next.t(
                      "app.community.telegram"
                    )}"><i class="fab fa-telegram fa-fw"></i></a>`
                  : ""
              }${
                app.community.githubDiscussions
                  ? `<a class="community" href="https://github.com/${
                      app.community.githubDiscussions
                    }/discussions" title="${i18next.t(
                      "app.community.githubDiscussions"
                    )}"><i class="fab fa-github fa-fw"></i></a>`
                  : ""
              }${
                app.community.issueTracker
                  ? `<a class="community" href="${
                      app.community.issueTracker
                    }" title="${i18next.t(
                      "app.community.issueTracker"
                    )}"><i class="fas fa-list fa-fw"></i></a>`
                  : ""
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
          <span class="more-info-title">${i18next.t(
            "app.price"
          )}</span> <span class="more-info-text">${app.price}</span>
        </div>`
            : ""
        }
        ${
          app.license
            ? `<div class="more-info">
          <span class="more-info-title">${i18next.t(
            "app.license"
          )}</span> <span class="more-info-text">${app.license}</span>
        </div>`
            : ""
        }
        ${
          app.sourceCode
            ? `<a class="more-info" href="${app.sourceCode}" target="_blank">
          <span class="more-info-title">${i18next.t(
            "app.sourceCode"
          )}</span> <span class="more-info-text"><i class="fas fa-code"></i></span>
        </a>`
            : ""
        }
        <div class="more-info">
        <span class="more-info-title">${i18next.t(
          "app.source"
        )}</span> <span class="more-info-text">${app.source
      .map(
        (s) =>
          `<a href="${s.url}" target="_blank" title="${i18next.t(
            "app.source.date",
            { date: s.lastChange }
          )}">${toSourceDisplayText(s.name)}</a>`
      )
      .join(", ")}</span>
        </div>
        `,
    ["app", open ? "app-page" : ""]
  );

  if (!open) {
    const moreButton = element.querySelector(
      ".more-infos-button"
    ) as HTMLButtonElement;

    const moreInfos = element.querySelector(".more-infos") as HTMLElement;

    moreButton?.addEventListener("click", (ev) => {
      moreButton?.setAttribute("style", "display: none;");
      moreInfos?.setAttribute("style", "");

      ev.preventDefault();
    });
  }

  getHtmlElement("#list").appendChild(element);
}
