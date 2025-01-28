import React, { useEffect, useState } from "react";

import { ViewSelect } from "./ui/components/ViewSelect";
import { About } from "./ui/components/about";
import { Menu } from "./ui/components/Menu";
import { Search } from "./ui/components/search";
import { TopicSelect } from "./ui/components/TopicSelect";
import { PlatformSelect } from "./ui/components/PlatformSelect";
import { LanguageSelect } from "./ui/components/LanguageSelect";
import { CoverageSelect } from "./ui/components/CoverageSelect";
import { useData } from "./useData";
import { Filters } from "./ui/components/filters";
import { debounce } from "lodash";
import { useAppState } from "./utilities/useAppState";
import { filter } from "./filter";
import { App as AppData } from "./data/App";
import { List } from "./ui/views/List";
import { LazyLoadImages } from "./ui/components/LazyLoadImages";
import { Compare } from "./ui/views/Compare";
import { calculateScore } from "./data/calculateScore";
import { useTranslation } from "react-i18next";
import { languageValueToDisplay } from "./ui/utilities/language";
import { NotFoundApps } from "./ui/components/NotFoundApps";
import { strip } from "./utilities/string";
import { display, edit, mobile, navigation, web } from "./utilities/filter";
import { LazyInitMore } from "./ui/components/LazyInitMore";

import "./style.scss";

function prepareScoreAndLanguage(apps: AppData[]) {
  apps
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

export function App() {
  const { t } = useTranslation();
  const [state, setAppState, resetAppState] = useAppState();
  const apps = useData();
  const [trackHistory, setTrackHistory] = useState(true);
  const [filteredApps, setFilteredApps] = useState<AppData[]>([]);
  const [similarApps, setSimilarApps] = useState<AppData[]>([]);
  const [moreFilters, setMoreFilters] = useState(
    state.topics.length > 0 ||
      state.platforms.length > 0 ||
      state.languages.length > 0 ||
      state.coverage.length > 0
  );

  useEffect(() => {
    if (apps.length > 0) {
      const [filteredApps, similarApps] = filter({ apps, ...state });
      if (filteredApps.length > 300) {
        setAppState("view", "list");
      }
      prepareScoreAndLanguage(filteredApps);
      setFilteredApps(filteredApps);
      setSimilarApps(similarApps);
    }
  }, [
    apps,
    JSON.stringify({
      app: state.app,
      category: state.category,
      coverage: state.coverage,
      platforms: state.platforms,
      search: state.search,
      topics: state.topics,
    }),
  ]);

  useEffect(() => {
    if (!!state.app && filteredApps[0]) {
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
          ? "https://f-droid.org/repository/browse/?fdid=" +
            app.install.fDroidID
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
      document.title = `${app.name} - OSM Apps Catalog`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", strip(app.description));
    } else {
      document.title = `${t(`filter.category.${state.category}`, {
        numberOfApps: filteredApps.length,
      })} - OSM Apps Catalog`;
      document.querySelector('meta[name="description"]')?.setAttribute(
        "content",
        t(`category.${state.category}.description`, {
          numberOfApps: filteredApps.length,
        })
      );
    }
  });

  return (
    <div id="content">
      <LazyLoadImages>
        <header className="page-header">
          <Menu
            value={state.category}
            onChange={(value) => {
              if (value === "focus") {
                resetAppState(value);
              } else {
                setAppState("category", value);
              }
            }}
          />
          <h1 style={{ clear: "both", margin: "0" }}>
            {apps.length === 0 ? (
              <>
                <i id="loading" className="fas fa-spinner fa-pulse"></i>{" "}
              </>
            ) : null}
            <a href="/" style={{ color: "#333" }}>
              OSM Apps Catalog
            </a>
            <About />
          </h1>
          {!state.app ? (
            <>
              <p className="description" style={{ margin: "5px 10px 10px" }}>
                {t(`category.${state.category}.description`, {
                  numberOfApps: filteredApps.length || "",
                })}
              </p>
              {state.category !== "focus" && (
                <>
                  <Search
                    apps={apps}
                    value={state.search}
                    onChange={debounce((value) => {
                      setAppState("search", value, !trackHistory);
                      setTrackHistory(false);
                    }, 500)}
                    onBlur={() => {
                      setTrackHistory(true);
                    }}
                  />{" "}
                  <Filters
                    active={moreFilters}
                    onChange={(value) => {
                      setMoreFilters(value);
                    }}
                  />
                </>
              )}
            </>
          ) : null}
          <hr style={{ border: "1px solid #ccc" }} />
          {state.category !== "focus" && !state.app && moreFilters && (
            <span className="advanced-filter">
              <TopicSelect
                apps={filteredApps}
                selected={state.topics}
                onChange={(newValues) => setAppState("topics", newValues)}
              />
              <LanguageSelect
                apps={filteredApps}
                selected={state.languages}
                onChange={(newValues) => setAppState("languages", newValues)}
              />
              <PlatformSelect
                apps={filteredApps}
                selected={state.platforms}
                onChange={(newValues) => setAppState("platforms", newValues)}
              />
              <CoverageSelect
                apps={filteredApps}
                selected={state.coverage}
                onChange={(newValues) => setAppState("coverage", newValues)}
              />
            </span>
          )}
          {filteredApps.length <= 300 && filteredApps.length > 0 && (
            <ViewSelect
              value={state.view}
              onChange={(newValues) => setAppState("view", newValues)}
            />
          )}
        </header>
        <main>
          {state.view !== "compare" ? (
            <div id="list">
              {filteredApps.length > 0 ? (
                filteredApps.map((a) => (
                  <List key={a.id} app={a} open={!!state.app} />
                ))
              ) : (
                <p className="no-results">{t("noResults")}</p>
              )}
              {similarApps.length > 0 && (
                <>
                  <h2>
                    {t("relatedApps", { numberOfApps: similarApps.length })}
                  </h2>
                  {similarApps.map((a) => (
                    <List key={a.id} app={a} open={false} />
                  ))}
                </>
              )}
              {state.category === "all" && !state.app ? (
                <NotFoundApps apps={apps} />
              ) : null}
            </div>
          ) : (
            <div id="compare" className="table">
              {filteredApps.length > 0 ? (
                <LazyInitMore>
                  <Compare apps={filteredApps} lang={state.lang} />
                </LazyInitMore>
              ) : (
                <p className="no-results">{t("noResults")}</p>
              )}
            </div>
          )}
        </main>
      </LazyLoadImages>
    </div>
  );
}
