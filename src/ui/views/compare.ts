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

import i18next from "i18next";
import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";
import { renderBadges } from "./renderBadges";
import { renderFree } from "./renderFree";
import { templateData } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";
import { toWikiTable, toWikiValue } from "./toWikiTable";
import { equalsIgnoreCase } from "../utilities/string";
import { languageValueToDisplay } from "../language";

export function render(apps: App[], lang: string) {
  {
    const element = createElement(
      "div",
      [
        `<div class="cell header param-title"></div>`,
        ...apps.map(
          (app) =>
            `<div class="cell header text-center with-corner-badge">${renderFree(
              app
            )}<strong>${
              app.website
                ? `<a href="${app.website}" target="_blank">${app.name}</a>`
                : app.name
            }</strong></div>`
        ),
      ].join(""),
      ["row", "fixed"]
    );

    getHtmlElement("#compare").appendChild(element);
  }

  // General
  renderGroup(
    "general",
    i18next.t("compare.group.header.general"),
    [
      {
        label: () => "",
        description: () => "",
        hasValue: (app) => app.images.length > 0,
        renderToHtml: (app) =>
          app.website
            ? `<a target="_blank" href="${app.website}">${renderImage(app)}</a>`
            : renderImage(app),
        renderToWiki: (app) =>
          app.imageWiki ? `[[File:${app.imageWiki}|160px]]` : "",
        centered: true,
      },
      {
        label: () => "",
        description: () => "",
        hasValue: (app) =>
          !!(
            app.website ||
            app.install.asin ||
            app.install.fDroidID ||
            app.install.googlePlayID ||
            app.install.huaweiAppGalleryID ||
            app.install.appleStoreID ||
            app.install.macAppStoreID ||
            app.install.microsoftAppID
          ),
        renderToHtml: (app) => `${
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
      )}" ><i class="fab fa-amazon"></i></a>`
    : ""
}
${
  app.install.fDroidID
    ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${
        app.install.fDroidID
      }" title="${i18next.t(
        "app.install.fDroid"
      )}" ><i class="fab fa-android"></i></a>`
    : ""
}
${
  app.install.googlePlayID
    ? `<a class="download" href="https://play.google.com/store/apps/details?id=${
        app.install.googlePlayID
      }" title="${i18next.t(
        "app.install.googlePlay"
      )}" ><i class="fab fa-google-play"></i></a>`
    : ""
}
${
  app.install.huaweiAppGalleryID
    ? `<a class="download" href="https://appgallery.huawei.com/#/app/${
        app.install.huaweiAppGalleryID
      }" title="${i18next.t(
        "app.install.huaweiAppGallery"
      )}" ><i class="fas fa-shopping-bag"></i></a>`
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
}`,
        renderToWiki: (app, lang) =>
          [
            app.website
              ? `[${app.website} ${i18next.t("app.website", { lng: lang })}]`
              : "",

            app.install.asin
              ? `[https://www.amazon.com/dp/${app.install.asin} ${i18next.t(
                  "app.install.asin",
                  { lng: lang }
                )}]`
              : "",
            app.install.fDroidID
              ? `[https://f-droid.org/repository/browse/?fdid=${
                  app.install.fDroidID
                } ${i18next.t("app.install.fDroid", { lng: lang })}]`
              : "",
            app.install.googlePlayID
              ? `[https://play.google.com/store/apps/details?id=${
                  app.install.googlePlayID
                } ${i18next.t("app.install.googlePlay", { lng: lang })}]`
              : "",
            app.install.huaweiAppGalleryID
              ? `[https://appgallery.huawei.com/#/app/${
                  app.install.huaweiAppGalleryID
                } ${i18next.t("app.install.huaweiAppGallery", { lng: lang })}]`
              : "",
            app.install.appleStoreID
              ? `[https://apps.apple.com/app/${
                  app.install.appleStoreID.toUpperCase().startsWith("ID")
                    ? app.install.appleStoreID
                    : `id${app.install.appleStoreID}`
                } iTunes App Store]`
              : "",
            app.install.macAppStoreID
              ? `[https://apps.apple.com/app/${
                  app.install.macAppStoreID.toUpperCase().startsWith("ID")
                    ? app.install.macAppStoreID
                    : `id${app.install.macAppStoreID}`
                } ${i18next.t("app.install.appleStore", { lng: lang })}]`
              : "",
            app.install.microsoftAppID
              ? `[https://apps.microsoft.com/detail/${
                  app.install.microsoftAppID
                } ${i18next.t("app.install.macAppStore", { lng: lang })}]`
              : "",
          ]
            .filter((o) => o)
            .join(", "),
      },
      {
        label: (lang) => i18next.t("app.props.genre.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.genre.description", { lng: lang }),
        hasValue: (app) => app.genre?.length > 0,
        renderToHtml: (app) => renderBadges(app.genre),
        renderToWiki: (app) => toWikiValue(app.genre?.join(", "), lang),
      },
      {
        label: (lang) =>
          i18next.t("app.props.description.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.description.description", {
            lng: lang,
          }),
        hasValue: (app) => !!app.description,
        renderToHtml: (app) => app.description,
        renderToWiki: (app) => toWikiValue(app.description, lang),
        more: true,
      },
      {
        label: (lang) => i18next.t("app.props.platform.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.platform.description", { lng: lang }),
        hasValue: (app) => app.platform?.length > 0,
        renderToHtml: (app) => renderBadges(app.platform),
        renderToWiki: (app) => toWikiValue(app.platform.join(", "), lang),
      },
      {
        label: (lang) => i18next.t("app.props.date.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.date.description", { lng: lang }),
        hasValue: (app) => !!(app.lastRelease || app.unmaintained),
        renderToHtml: (app) =>
          (app.lastRelease
            ? app.lastRelease
            : app.unmaintained
            ? "????-??-??"
            : "") +
          (app.unmaintained
            ? ` <span class="warning">${i18next.t("app.unmaintained", {
                icon: `<i class="fas fa-exclamation-triangle"></i>`,
                interpolation: { escapeValue: false },
              })}</span>`
            : ""),
        renderToWiki: (app, lang) =>
          toWikiValue(
            (app.unmaintained ? `style="background-color: #ffc680" | ` : "") +
              (app.lastRelease
                ? app.lastRelease
                : app.unmaintained
                ? "????-??-??"
                : "") +
              (app.unmaintained
                ? i18next.t("app.unmaintained", { icon: `⚠️`, lng: lang })
                : ""),
            lang
          ),
      },
      {
        label: (lang) => i18next.t("app.props.languages.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.languages.description", {
            lng: lang,
          }),
        hasValue: (app) => !!app.languagesUrl || !!(app.languages.length > 0),
        renderToHtml: (app) =>
          app.languagesUrl
            ? `<a class="language-url" href="${
                app.languagesUrl
              }" target="_blank"">
      ${
        app.languages.length > 0
          ? renderBadges(app.languages)
          : `<i class="fas fa-language"></i>`
      }
      <i class="fas fa-external-link-alt"></i>
    </a>`
            : renderBadges(app.languages),
        renderToWiki: (app) =>
          toWikiValue(
            app.languagesUrl
              ? `[${app.languagesUrl}${
                  app.languages.length > 0
                    ? app.languages.join(", ")
                    : languageValueToDisplay("mul")
                }]`
              : app.languages.join(", "),
            lang
          ),
        more: true,
      },
      {
        label: (lang) => i18next.t("app.props.coverage.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.coverage.description", { lng: lang }),
        hasValue: (app) => !!(app.coverage && app.coverage.length),
        renderToHtml: (app) => app.coverage[app.coverage.length - 1],
        renderToWiki: (app) =>
          toWikiValue(app.coverage[app.coverage.length - 1], lang),
      },
      {
        label: (lang) => i18next.t("app.props.author.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.author.description", { lng: lang }),
        hasValue: (app) => !!app.author,
        renderToHtml: (app) => app.author,
        renderToWiki: (app) => toWikiValue(app.author, lang),
      },
      {
        label: (lang) => i18next.t("app.props.price.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.price.description", { lng: lang }),
        hasValue: (app) => !!app.price,
        renderToHtml: (app) => app.price,
        renderToWiki: (app) =>
          toWikiValue(
            app.gratis
              ? `{{free|{{TranslationOf gratis|{{{lang|}}}}}}}`
              : app.price,
            lang
          ),
      },
      {
        label: (lang) => i18next.t("app.props.license.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.license.description", { lng: lang }),
        hasValue: (app) => !!app.license,
        renderToHtml: (app) => renderBadges(app.license),
        renderToWiki: (app) =>
          toWikiValue(
            app.libre ? `{{free|${app.license || unknown()}}}` : app.license,
            lang
          ),
      },
      {
        label: (lang) => i18next.t("app.props.repo.label", { lng: lang }),
        description: (lang) =>
          i18next.t("app.props.repo.description", { lng: lang }),
        hasValue: (app) => !!app.sourceCode,
        renderToHtml: (app) =>
          app.sourceCode
            ? `<a target="_blank" href="${app.sourceCode}"><i class="fas fa-code"></i></a>`
            : "",
        renderToWiki: (app) =>
          toWikiValue(app.sourceCode ? `[${app.sourceCode} </>]` : "", lang),
      },
      {
        label: (lang) => i18next.t("app.source", { lng: lang }),
        description: (lang) =>
          i18next.t("app.source.description", { lng: lang }),
        hasValue: () => true,
        renderToHtml: (app) =>
          app.source
            .map(
              (s) => `<a target="_blank" href="${s.url}">${s.displayName}</a>`
            )
            .join(", "),
      },
    ],
    apps,
    lang
  );

  // Map display
  renderGroup(
    "map",
    i18next.t("compare.group.header.map"),
    [
      "map",
      "mapData",
      "datasource",
      "rotateMap",
      "3D",
      "showWebsite",
      "showPhoneNumber",
      "showOpeningHours",
    ],
    apps,
    lang
  );

  // Routing
  renderGroup(
    "routing",
    i18next.t("compare.group.header.routing"),
    [
      "routing",
      "createRouteManually",
      "calculateRoute",
      "createRouteViaWaypoints",
      "profiles",
      "turnRestrictions",
      "calculateRouteOffline",
      "routingProviders",
      "avoidTraffic",
      "trafficProvider",
    ],
    apps,
    lang
  );

  // Navigating
  renderGroup(
    "navigating",
    i18next.t("compare.group.header.navigating"),
    [
      "navigating",
      "findLocation",
      "findNearbyPOI",
      "navToPoint",
      "voice",
      "keepOnRoad",
      "turnLanes",
      "withoutGPS",
      "predefinedRoute",
    ],
    apps,
    lang
  );

  // Tracking
  renderGroup(
    "tracking",
    i18next.t("compare.group.header.tracking"),
    [
      "tracking",
      "customInterval",
      "trackFormats",
      "geotagging",
      "fastWayPointAdding",
      "uploadGPX",
    ],
    apps,
    lang
  );

  // Monitoring
  renderGroup(
    "monitoring",
    i18next.t("compare.group.header.monitoring"),
    [
      "monitoring",
      "showTrack",
      "showExistingTrack",
      "showAltitudeDiagram",
      "showDOP",
      "showSatellites",
      "showNMEAlive",
      "showSpeed",
      "sendPosition",
    ],
    apps,
    lang
  );

  // Editing
  renderGroup(
    "editing",
    i18next.t("compare.group.header.editing"),
    [
      "addPOI",
      "editPOI",
      "addWay",
      "editGeom",
      "editTags",
      "editRelations",
      "viewNotes",
      "createNotes",
      "editNotes",
      "editSource",
      "offsetDBsupport",
      "uploadOSMData",
    ],
    apps,
    lang
  );

  // Rendering
  renderGroup(
    "rendering",
    i18next.t("compare.group.header.rendering"),
    ["rendererOutputFormats"],
    apps,
    lang
  );

  // Accessibility
  renderGroup(
    "accessibility",
    i18next.t("compare.group.header.accessibility"),
    [
      "accessibility",
      "textOnlyUI",
      "brailleUI",
      "explorerMode",
      "publicTransportMode",
      "dangerWarnings",
      "screenReader",
      "screenReaderLang",
    ],
    apps,
    lang
  );
}

function renderGroup(
  id: string,
  display: string,
  params: (
    | string
    | {
        label: (lang?: string) => string | undefined;
        description: (lang?: string) => string | undefined;
        hasValue: (app: App) => boolean;
        notNo?: (app: App) => boolean;
        renderToHtml: (app: App) => string | undefined;
        renderToWiki?: (app: App, lang: string) => string | undefined;
        more?: boolean;
        centered?: boolean;
      }
  )[],
  apps: App[],
  lang: string
) {
  const extendedParams = params.map((p) => {
    if (typeof p !== "string") {
      return p;
    }

    return {
      label: (lang?: string) =>
        i18next.t("app.props." + p + ".label", { lng: lang }),
      description: (lang?: string) =>
        i18next.t("app.props." + p + ".description", { lng: lang }),
      hasValue: (app: App) => {
        const value: string | string[] | undefined = (app as any)[id]?.[p];
        if (Array.isArray(value)) {
          return value.some((v) => !!v);
        }
        return !!value;
      },
      notNo: (app: App) => {
        const value: string | string[] | undefined = (app as any)[id]?.[p];
        if (Array.isArray(value)) {
          return value.some(
            (v) =>
              v && !equalsIgnoreCase(v, "no") && !equalsIgnoreCase(v, "none")
          );
        }
        return (
          !equalsIgnoreCase(value, "no") && !equalsIgnoreCase(value, "none")
        );
      },
      renderToHtml: (app: App) => renderBadges((app as any)[id]?.[p]),
      renderToWiki: (app: App) => toWikiValue((app as any)[id]?.[p], lang),
    };
  });

  let elements = extendedParams
    .map((p) => {
      if (!apps.some((app) => p.hasValue(app) && (!p.notNo || p.notNo(app)))) {
        return undefined;
      }

      return createParamElement(
        apps,
        p.label(),
        p.description(),
        (app) => p.renderToHtml(app),
        id + "-detail",
        p.more,
        p.centered
      );
    })
    .filter((e) => e);

  if (elements.length) {
    const element = createElement(
      "div",
      `<div class="cell header params-title params-group-title">
        <a class="group" data-target=".${id}-detail" href="#"><i class="fas fa-fw fa-caret-down ${id}-detail"></i><i class="fas fa-fw fa-caret-right ${id}-detail hidden"></i> ${display}</a>
        <a class="export" href="#" title="${i18next.t(
          "compare.share"
        )}"><i class="fas fa-share-alt"></i></a> </div>`,
      ["row"]
    );

    getHtmlElement(".export", element).addEventListener("click", (e) => {
      e.preventDefault();
      const wikiTable = toWikiTable(
        apps,
        extendedParams.filter((p) => !!p.renderToWiki) as any,
        lang
      );

      navigator.clipboard.writeText(`== ${display} == <!-- ${i18next.t(
        "wiki.generatedBy"
      )} -->
${wikiTable}`);
      alert(i18next.t("share.wiki", { group: display }));
    });

    getHtmlElement(".group", element).addEventListener("click", (e) => {
      document
        .querySelectorAll(
          (e.currentTarget as HTMLDivElement).dataset["target"] || ""
        )
        .forEach((e) => e.classList.toggle("hidden"));
    });

    getHtmlElement("#compare").appendChild(element);

    elements.forEach((element) => {
      getHtmlElement("#compare").appendChild(element as HTMLDivElement);
    });
  }
}

function createParamElement(
  apps: App[],
  label: string | undefined,
  description: string | undefined,
  value: (app: App) => string | undefined,
  group: string = "",
  more = false,
  centered = false
) {
  const values = apps.map((app) => value(app));

  if (values.filter((v) => v).length === 0) {
    return undefined;
  }

  const element = createElement(
    "div",
    [
      `<div class="cell header param-title" title="${description}">${label}</div>`,
      ...values.map((v) =>
        more
          ? `<div class="cell param-text${
              centered ? " align-middle text-center" : ""
            }"><div class="dynamic-more">${v || unknown()}</div></div>`
          : `<div class="cell param-text${
              centered ? " align-middle text-center" : ""
            }">${v || unknown()}</div>`
      ),
    ].join(""),
    ["row", group]
  );

  return element;
}

function unknown() {
  return `<span class="unknown">${i18next.t("compare.unknown")}</span>`;
}
