import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";
import { renderBadges } from "./renderBadges";
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
            `<div class="cell header text-center"><strong>${
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
    "General",
    [
      {
        label: "",
        description: "",
        hasValue: (app) => app.images.length > 0,
        renderToHtml: (app) =>
          app.website
            ? `<a href="${app.website}" target="_blank">${renderImage(app)}</a>`
            : renderImage(app),
        renderToWiki: (app) =>
          app.imageWiki ? `[[File:${app.imageWiki}|160px]]` : "",
        centered: true,
      },
      {
        label: "",
        description: "",
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
            ? `<a class="download" href="${app.website}" target="_blank" title="Website"><i class="far fa-map"></i></a>`
            : ""
        }
${
  app.install.asin
    ? `<a class="download" href="https://www.amazon.com/dp/${app.install.asin}" target="_blank" title="Amazon Appstore" ><i class="fab fa-amazon"></i></a>`
    : ""
}
${
  app.install.fDroidID
    ? `<a class="download" href="https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID}" target="_blank" title="F-Droid" ><i class="fab fa-android"></i></a>`
    : ""
}
${
  app.install.googlePlayID
    ? `<a class="download" href="https://play.google.com/store/apps/details?id=${app.install.googlePlayID}" target="_blank" title="Google Play" ><i class="fab fa-google-play"></i></a>`
    : ""
}
${
  app.install.huaweiAppGalleryID
    ? `<a class="download" href="https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID}" target="_blank" title="Huawei App Gallery" ><i class="fas fa-shopping-bag"></i></a>`
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
}`,
        renderToWiki: (app) =>
          [
            app.website ? `[${app.website} Website]` : "",

            app.install.asin
              ? `[https://www.amazon.com/dp/${app.install.asin} Amazon Appstore]`
              : "",
            app.install.fDroidID
              ? `[https://f-droid.org/repository/browse/?fdid=${app.install.fDroidID} F-Droid]`
              : "",
            app.install.googlePlayID
              ? `[https://play.google.com/store/apps/details?id=${app.install.googlePlayID} Google Play]`
              : "",
            app.install.huaweiAppGalleryID
              ? `[https://appgallery.huawei.com/#/app/${app.install.huaweiAppGalleryID} Huawei App Gallery]`
              : "",
            app.install.appleStoreID
              ? `[https://itunes.apple.com/app/${
                  app.install.appleStoreID.toUpperCase().startsWith("ID")
                    ? app.install.appleStoreID
                    : `id${app.install.appleStoreID}`
                } iTunes App Store]`
              : "",
            app.install.macAppStoreID
              ? `[https://itunes.apple.com/app/${
                  app.install.macAppStoreID.toUpperCase().startsWith("ID")
                    ? app.install.macAppStoreID
                    : `id${app.install.macAppStoreID}`
                } Mac App Store]`
              : "",
            app.install.microsoftAppID
              ? `[https://www.microsoft.com/store/apps/${app.install.microsoftAppID} Microsoft Store]`
              : "",
          ]
            .filter((o) => o)
            .join(", "),
      },
      {
        label: getLocalizedValue(
          templateData.params["description"].label,
          lang
        ),
        description: getLocalizedValue(
          templateData.params["description"].description,
          lang
        ),
        hasValue: (app) => !!app.description,
        renderToHtml: (app) => app.description,
        renderToWiki: (app) => app.description,
        more: true,
      },
      {
        label: getLocalizedValue(templateData.params["author"].label, lang),
        description: getLocalizedValue(
          templateData.params["author"].description,
          lang
        ),
        hasValue: (app) => !!app.author,
        renderToHtml: (app) => app.author,
        renderToWiki: (app) => app.author,
      },
      {
        label: getLocalizedValue(templateData.params["platform"].label, lang),
        description: getLocalizedValue(
          templateData.params["platform"].description,
          lang
        ),
        hasValue: (app) => app.platform.length > 0,
        renderToHtml: (app) => renderBadges(app.platform),
        renderToWiki: (app) => app.platform.join(", "),
      },
      {
        label: getLocalizedValue(templateData.params["date"].label, lang),
        description: getLocalizedValue(
          templateData.params["date"].description,
          lang
        ),
        hasValue: (app) => !!app.lastRelease,
        renderToHtml: (app) => app.lastRelease,
        renderToWiki: (app) => app.lastRelease,
      },
      {
        label: getLocalizedValue(templateData.params["languages"].label, lang),
        description: getLocalizedValue(
          templateData.params["languages"].description,
          lang
        ),
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
          app.languagesUrl
            ? `[${app.languagesUrl} 
        ${
          app.languages.length > 0
            ? app.languages.join(", ")
            : languageValueToDisplay("mul")
        }
      ]`
            : app.languages.join(", "),
      },
      {
        label: getLocalizedValue(templateData.params["license"].label, lang),
        description: getLocalizedValue(
          templateData.params["license"].description,
          lang
        ),
        hasValue: (app) => !!app.license,
        renderToHtml: (app) => renderBadges(app.license),
        renderToWiki: (app) => app.license,
      },
      {
        label: getLocalizedValue(templateData.params["repo"].label, lang),
        description: getLocalizedValue(
          templateData.params["repo"].description,
          lang
        ),
        hasValue: (app) => !!app.sourceCode,
        renderToHtml: (app) =>
          app.sourceCode
            ? `<a href="${app.sourceCode}" target="_blank"><i class="fas fa-code"></i></a>`
            : "",
        renderToWiki: (app) =>
          app.sourceCode ? `[${app.sourceCode} </>]` : "",
      },
      {
        label: getLocalizedValue("Source", lang),
        description: getLocalizedValue(
          "Source where this data comes from.",
          lang
        ),
        hasValue: () => true,
        renderToHtml: (app) =>
          app.source
            .map(
              (s) => `<a href="${s.url}" target="_blank">${s.displayName}</a>`
            )
            .join(", "),
      },
    ],
    apps,
    lang
  );

  // Map
  renderGroup(
    "map",
    "Display map",
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
    "Routing",
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
    "Navigating",
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
    "Tracking",
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
    "Monitoring",
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
    "Editing",
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
  renderGroup("rendering", "Rendering", ["rendererOutputFormats"], apps, lang);

  // Accessibility
  renderGroup(
    "accessibility",
    "Accessibility",
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
        label: string | undefined;
        description: string | undefined;
        hasValue: (app: App) => boolean;
        notNo?: (app: App) => boolean;
        renderToHtml: (app: App) => string | undefined;
        renderToWiki?: (app: App) => string | undefined;
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
      label: getLocalizedValue(templateData.params[p].label, lang),
      description: getLocalizedValue(templateData.params[p].description, lang),
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
          return value.some((v) => v && !equalsIgnoreCase(v, "no"));
        }
        return !equalsIgnoreCase(value, "no");
      },
      renderToHtml: (app: App) => renderBadges((app as any)[id]?.[p]),
      renderToWiki: (app: App) => toWikiValue((app as any)[id]?.[p]),
    };
  });

  let elements = extendedParams
    .map((p) => {
      if (!apps.some((app) => p.hasValue(app) && (!p.notNo || p.notNo(app)))) {
        return undefined;
      }

      return createParamElement(
        apps,
        p.label,
        p.description,
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
     <a class="export" href="#"><i class="far fa-copy"></i></a> </div>`,
      ["row"]
    );

    getHtmlElement(".export", element).addEventListener("click", (e) => {
      e.preventDefault();
      const wikiTable = toWikiTable(
        apps,
        extendedParams.filter((p) => !!p.renderToWiki) as any,
        lang
      );

      navigator.clipboard.writeText(wikiTable);
      alert("Copied to the clipboard.");
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
  return `<span class="unknown">unknown</span>`;
}
