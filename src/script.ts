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
import { createElement, getHtmlElement } from "./utilities/html";
import { includes, some } from "./utilities/array";
import { strip } from "./utilities/string";
import { findGetParameter } from "./utilities/url";
import { display, edit, mobile, navigation, web } from "./utilities/filter";
// import { render as renderCompareView } from "./ui/views/compare";
import { lazyInitMore } from "./ui/utilities/lazyInitMore";
import { calculateScore } from "./action/addApp";
import { languageValueToDisplay } from "./ui/utilities/language";
import { State } from "./State";
import { App } from "./data/App";

import "./style.scss";

// let onUpdate = false;

const lang = (findGetParameter("lang") || "en").toLowerCase();

// export function doUpdate(
//   newApps: App[],
//   reset?: boolean,
//   history = true,
//   render = true
// ) {
//   apps = newApps;
//   if (!onUpdate) {
//     onUpdate = true;

//     const params = new URLSearchParams(window.location.search);
//     const category = ""; // categorySelect.getSelected()[0] as string;
//     let state: State = {
//       lang,
//       app:
//         !category || category === "all"
//           ? params.get("app")
//             ? parseInt(params.get("app") as string, 10)
//             : undefined
//           : undefined,
//       search: "", //searchElement.value,
//       topics: [""], // topicsSelect.getSelected() as string[],
//       platforms: [""], //platformsSelect.getSelected() as string[],
//       languages: [""], //languagesSelect.getSelected() as string[],
//       coverage: [""], //coverageSelect.getSelected() as string[],
//       category: category as any,
//       view: (document.getElementById("listView") as HTMLInputElement).checked
//         ? "list"
//         : "compare",
//     };

//     if (history) {
//       updateState(state);
//     }
//     if (render) {
//       update(state);
//     }
//     onUpdate = false;
//   }
// }

// window.addEventListener("popstate", (e) => {
//   onUpdate = true;
//   update(e.state);
//   onUpdate = false;
// });

function prepareScoreAndLanguage(filteredApps: App[]) {
  filteredApps
    .filter((app) => !app.score.details)
    .forEach((app) => {
      app.score = calculateScore(app);
      app.languages = app.languages.map((l) => languageValueToDisplay(l));
      if (app.accessibility) {
        app.accessibility.screenReaderLang =
          app.accessibility.screenReaderLang.map((l) =>
            languageValueToDisplay(l)
          );
      }
    });
}

export function update({
  apps,
  filteredApps,
  appPage,
  category,
  search,
  view,
}: { apps: App[]; filteredApps: App[]; appPage: boolean } & State) {
  //categorySelect.setSelected(category);

  updateDescription(category);

  getHtmlElement("#list").innerHTML = "";
  getHtmlElement("#compare").innerHTML = "";

  //  searchElement.value = search;

  document
    .querySelectorAll(".filter")
    .forEach((e) =>
      e.classList.toggle("hidden", category === "focus" || appPage)
    );

  prepareScoreAndLanguage(filteredApps);

  updateDescription(category, filteredApps.length);

  const params = new URLSearchParams(window.location.search);
  const topicsData: string[] = params.get("topics")
    ? params.get("topics")?.split(",") || []
    : [];
  const platformsData: string[] = params.get("platforms")
    ? params.get("platforms")?.split(",") || []
    : [];
  const languagesData: string[] = params.get("languages")
    ? params.get("languages")?.split(",") || []
    : [];
  const coverageData: string[] = params.get("coverage")
    ? params.get("coverage")?.split(",") || []
    : [];

  for (const a of filteredApps) {
    topicsData.push(...a.topics.map((t) => t));
    platformsData.push(...a.platform.map((t) => t));
    coverageData.push(...a.coverage.map((t) => t));
  }

  for (const a of apps) {
    languagesData.push(...a.languages.filter((l) => l).map((l) => l));
  }

  // topicsSelect.setData(prepareArrayForSelect(topicsData, topics));
  // topicsSelect.setSelected(topics);

  // platformsSelect.setData(prepareArrayForSelect(platformsData, platforms));
  // platformsSelect.setSelected(platforms);

  // languagesSelect.setData(prepareArrayForSelect(languagesData, languages));
  // languagesSelect.setSelected(languages);

  // coverageSelect.setData(prepareArrayForSelect(coverageData, coverage));
  // coverageSelect.setSelected(coverage);

  document
    .getElementById("view")
    ?.classList.toggle("hidden", filteredApps.length >= 300);

  switch (view) {
    case "list":
      (document.getElementById("listView") as HTMLInputElement).checked = true;
      (document.getElementById("compareView") as HTMLInputElement).checked =
        false;
      for (const a of filteredApps) {
        //renderListView(a, appPage);
      }
      if (filteredApps.length === 0) {
        getHtmlElement("#list").appendChild(
          createElement("p", i18next.t("noResults"), ["no-results"])
        );
      }
      // renderSimilarApps(
      //   apps,
      //   filteredApps,
      //   search,
      //   topicsUp,
      //   platformsUp,
      //   languagesUp,
      //   coverageUp
      // );
      if (category === "all" && !appPage) {
        renderNotFoundApps(apps);
      }
      break;

    case "compare":
      (document.getElementById("listView") as HTMLInputElement).checked = false;
      (document.getElementById("compareView") as HTMLInputElement).checked =
        true;
      if (filteredApps.length === 0) {
        getHtmlElement("#compare").appendChild(
          createElement("p", i18next.t("noResults"), ["no-results"])
        );
      }
      // renderCompareView(filteredApps, lang);
      setTimeout(() => {
        lazyInitMore(true);
      }, 0);
      break;

    default:
      throw new Error("Not expected value for view.");
  }

  if (appPage) {
    getHtmlElement(".description").style.display = "none";

    const app = filteredApps[0];
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify({
      "@context": "http://schema.org",
      "@type": mobile(app)
        ? "MobileApplication"
        : web(app)
        ? "WebApplication"
        : "SoftwareApplication",
      name: app.name || undefined,
      description: strip(app.description) || undefined,
      keywords: app.topics.join(","),
      image: app.images[0] || undefined,
      url: app.website || undefined,
      installUrl: app.install.fDroidID
        ? "https://f-droid.org/repository/browse/?fdid=" + app.install.fDroidID
        : app.install.googlePlayID
        ? "https://play.google.com/store/apps/details?id=" +
          app.install.googlePlayID
        : app.install.asin
        ? "https://www.amazon.com/dp/" + app.install.asin
        : app.install.appleStoreID
        ? "https://apps.apple.com/app/" +
          app.install.appleStoreID?.toUpperCase().startsWith("ID")
          ? app.install.appleStoreID
          : `id${app.install.appleStoreID}`
        : app.install.macAppStoreID
        ? "https://apps.apple.com/app/" +
          app.install.macAppStoreID?.toUpperCase().startsWith("ID")
          ? app.install.macAppStoreID
          : `id${app.install.macAppStoreID}`
        : app.install.microsoftAppID
        ? "https://apps.microsoft.com/detail/" + app.install.microsoftAppID
        : app.install.huaweiAppGalleryID
        ? "https://appgallery.huawei.com/#/app/" +
          app.install.huaweiAppGalleryID
        : undefined,
      datePublished: app.lastRelease || undefined,
      license: app.license || undefined,
      applicationCategory: display(app)
        ? "TravelApplication"
        : navigation(app)
        ? "DriverApplication"
        : edit(app)
        ? "UtilitiesApplication"
        : "TravelApplication",
      applicationSubCategory: app.genre,
      operatingSystem: app.platform.join(", ") || undefined,
      offers: app.gratis
        ? {
            "@type": "Offer",
            price: "0",
          }
        : undefined,
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 0.4 * app.score.total + 1,
        },
        author: {
          "@type": "Organization",
          name: "OSM Apps Catalog",
          url: "https://osm-apps.zottelig.ch/",
        },
      },
    });
    document.head.appendChild(script);
    document.title = `OSM Apps Catalog - ${app.name}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", strip(app.description));
  } else {
    getHtmlElement(".description").style.display = "";

    document.title = `OSM Apps Catalog - ${i18next.t(
      `filter.category.${category}`,
      {
        numberOfApps: filteredApps.length,
      }
    )}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      i18next.t(`category.${category}.description`, {
        numberOfApps: filteredApps.length,
      })
    );
  }


}

function updateDescription(category: string, numberOfApps?: number) {
  getHtmlElement(".description").innerHTML = i18next.t(
    `category.${category}.description`,
    { numberOfApps: numberOfApps || "" }
  );
}

function renderSimilarApps(
  apps: App[],
  filteredApps: App[],
  search: string,
  topicsUp: string[],
  platformsUp: string[],
  languagesUp: string[],
  coverageUp: string[]
) {
  if (topicsUp.length > 0) {
    let similarApps = apps.filter((a) => !filteredApps.includes(a));

    similarApps = similarApps.filter((a) =>
      topicsUp.every(
        (t) =>
          a.name.toUpperCase().indexOf(t) !== -1 ||
          a.description.toUpperCase().indexOf(t) !== -1
      )
    );

    if (search)
      similarApps = similarApps.filter(
        (a) =>
          a.name.toUpperCase().indexOf(search) !== -1 ||
          a.description.toUpperCase().indexOf(search) !== -1 ||
          a.topics.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0 ||
          a.platform.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0 ||
          a.coverage.filter((t) => t.toUpperCase().indexOf(search) !== -1)
            .length > 0
      );

    if (platformsUp.length > 0)
      similarApps = similarApps.filter((a) =>
        includes(
          a.platform.map((t) => t.toUpperCase()),
          platformsUp
        )
      );

    if (languagesUp.length > 0)
      similarApps = similarApps.filter((a) =>
        some(
          a.languages.map((t) => t.toUpperCase()),
          languagesUp
        )
      );

    if (coverageUp.length > 0)
      similarApps = similarApps.filter((a) =>
        some(
          a.coverage.map((t) => t.toUpperCase()),
          coverageUp
        )
      );

    if (similarApps.length > 0) {
      prepareScoreAndLanguage(similarApps);

      const similarTag = createElement(
        "h2",
        i18next.t("relatedApps", { numberOfApps: similarApps.length })
      );
      getHtmlElement("#list").appendChild(similarTag);

      for (const a of similarApps) {
        //renderListView(a);
      }
    }
  }
}

const notFoundAppsTitle = [
  "MapComplete",
  "uMap",
  "OpenStreetBrowser",
  "Overpass turbo",
];

function renderNotFoundApps(apps: App[]) {
  let notFound = notFoundAppsTitle
    .map((f) => apps.find((a) => a.name === f))
    .filter((a) => a) as App[];

  prepareScoreAndLanguage(notFound);

  const notFoundTag = createElement("h2", i18next.t("notFound"));
  getHtmlElement("#list").appendChild(notFoundTag);

  const notFoundDesc = createElement("p", i18next.t("notFound.desc"));
  notFoundDesc.style.margin = "5px 10px 10px";
  getHtmlElement("#list").appendChild(notFoundDesc);

  for (const a of notFound) {
    //renderListView(a as App);
  }
}
