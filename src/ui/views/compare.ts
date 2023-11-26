import { createElement, getHtmlElement } from "../utilities/html";
import { App } from "../../data/template/utilities";
import { renderImage } from "../utilities/renderImage";
import { renderBadges } from "./renderBadges";
import { templateData } from "../templateData";
import { getLocalizedValue } from "../getLocalizedValue";

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
              ? `<a class="download" href="http://www.windowsphone.com/s?appid=${app.install.microsoftAppID}" target="_blank" title="Microsoft Store"><i class="fab fa-microsoft"></i></a>`
              : ""
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
    getLocalizedValue(templateData.params["description"].label, lang),
    getLocalizedValue(templateData.params["description"].description, lang),
    (app) => app.description,
    "",
    true
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["author"].label, lang),
    getLocalizedValue(templateData.params["author"].description, lang),
    (app) => app.author
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["platform"].label, lang),
    getLocalizedValue(templateData.params["platform"].description, lang),
    (app) => renderBadges(app.platform)
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["date"].label, lang),
    getLocalizedValue(templateData.params["date"].description, lang),
    (app) => app.lastRelease
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["languages"].label, lang),
    getLocalizedValue(templateData.params["languages"].description, lang),
    (app) =>
      app.languagesUrl
        ? `<a href="${app.languagesUrl}" target="_blank">
      ${
        app.languages.length > 0
          ? renderBadges(app.languages)
          : `<i class="fas fa-language"></i>`
      }
    </a>`
        : renderBadges(app.languages),
    undefined,
    true
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["license"].label, lang),
    getLocalizedValue(templateData.params["license"].description, lang),
    (app) => renderBadges(app.license)
  );
  renderParam(
    apps,
    getLocalizedValue(templateData.params["repo"].label, lang),
    getLocalizedValue(templateData.params["repo"].description, lang),
    (app) =>
      app.sourceCode
        ? `<a href="${app.sourceCode}" target="_blank"><i class="fas fa-code"></i></a>`
        : ""
  );
  renderParam(
    apps,
    getLocalizedValue("Source", lang),
    getLocalizedValue("Source where this data comes from.", lang),
    (app) =>
      app.source
        .map((s) => `<a href="${s.url}" target="_blank">${s.name}</a>`)
        .join(", ")
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
  params: string[],
  apps: App[],
  lang: string
) {
  let elements = params
    .map((p) => {
      if (
        !apps
          .map((app) => (app as any)[id]?.[p])
          .some(
            (values: string[] | undefined) =>
              values &&
              values.filter((v) => v && v.toUpperCase() !== "NO").length > 0
          )
      ) {
        return undefined;
      }

      return createParamElement(
        apps,
        getLocalizedValue(templateData.params[p].label, lang),
        getLocalizedValue(templateData.params[p].description, lang),
        (app) => renderBadges((app as any)[id]?.[p]),
        id + "-detail"
      );
    })
    .filter((e) => e);

  if (elements.length) {
    const element = createElement(
      "div",
      `<div class="cell header params-title">
        <a class="group" data-target=".${id}-detail" href="#"><i class="fas fa-caret-down ${id}-detail"></i><i class="fas fa-caret-right ${id}-detail hidden"></i> ${display}</a>
      </div>`,
      ["row"]
    );

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
  more = false
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
          ? `<div class="cell param-text"><div class="dynamic-more">${
              v || unknown()
            }</div></div>`
          : `<div class="cell param-text">${v || unknown()}</div>`
      ),
    ].join(""),
    ["row", group]
  );

  return element;
}

function renderParam(
  apps: App[],
  label: string | undefined,
  description: string | undefined,
  value: (app: App) => string | undefined,
  group: string = "",
  more = false
) {
  const element = createParamElement(
    apps,
    label,
    description,
    value,
    group,
    more
  );

  if (element) {
    getHtmlElement("#compare").appendChild(element);
  }
}

function unknown() {
  return `<span class="unknown">unknown</span>`;
}
