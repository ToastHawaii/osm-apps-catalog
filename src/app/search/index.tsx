import React, { useState } from "react";
import { useNavigate } from "react-router";

import { ViewSelect } from "../ui/components/ViewSelect";
import { SearchComponent } from "../ui/components/search";
import { TopicSelect } from "../ui/components/TopicSelect";
import { PlatformSelect } from "../ui/components/PlatformSelect";
import { LanguageSelect } from "../ui/components/LanguageSelect";
import { CoverageSelect } from "../ui/components/CoverageSelect";
import { ContributeSelect, mapping } from "../ui/components/ContributeSelect";
import { Filters } from "../ui/components/filters";
import { chain, debounce } from "lodash";
import { useSearchState } from "../../hooks/useSearchState";
import { filter } from "../../lib/filter";
import { Compare } from "../ui/views/Compare";
import { Trans, useTranslation } from "react-i18next";
import { NotFoundApps } from "../ui/components/NotFoundApps";
import { LazyInitMore } from "../ui/components/LazyInitMore";
import { PagedList } from "../ui/PagedList";
import { RelatedApps } from "../ui/RelatedApps";
import { App } from "@shared/data/App";
import { plainText } from "@shared/utils/plainText";
import { ExternalLink } from "@components/common/ExternalLink";
import { useRoute } from "@hooks/useRoute";
import { ProgrammingLanguageSelect } from "@app/ui/components/ProgrammingLanguageSelect";
import { useIsTechDomain } from "@hooks/useIsTechDomain";
import { AppCompact } from "@components/common/AppCompact";
import { DefaultTagsReorganization } from "@lib/tagsReorganizer";
import { NoResults } from "@app/search/NoResults";

import "../../index.scss";
import "../../index.css";

/** a small wrapper around search component that makes searching even smoother */
function SearchField({ apps }: { apps: App[] }) {
  const [state, setState] = useSearchState();

  const [isUserTyping, setIsUserTyping] = useState(false);

  return (
    <SearchComponent
      apps={apps}
      value={state.search}
      onChange={debounce((value) => {
        setState("search", value, { replace: isUserTyping });
        setIsUserTyping(true);
      }, 500)}
      onBlur={() => {
        setIsUserTyping(false);
      }}
    />
  );
}

function PageMeta({ apps }: { apps: App[] }) {
  const { t } = useTranslation();
  const [state] = useSearchState();

  return (
    <>
      <title>{`${t(`filter.category.${state.category}`, {
        numberOfApps: apps.length,
      })} – OSM Apps Catalog`}</title>
      <meta
        name="description"
        content={plainText(
          t(`category.${state.category}.description`, {
            numberOfApps: apps.length,
          }),
        )}
      />
    </>
  );
}

export function Search({ apps }: { apps: App[] }) {
  const { t, i18n } = useTranslation();

  const isTechView = useIsTechDomain();
  const routes = useRoute();
  const navigate = useNavigate();
  const [state, setState, , isInitState] = useSearchState();
  const [moreFilters, setMoreFilters] = useState(isTechView);

  const [filteredApps, findSimilarApps] = filter({ apps, ...state });
  if (filteredApps.length > 300 && state.view !== "list") {
    setState("view", "list");
  }

  return (
    <>
      <PageMeta apps={filteredApps} />
      <div className="sticky left-0 text-center">
        <p className="description" style={{ margin: "5px 10px" }}>
          {state.category === "all" && filteredApps.length !== apps.length ? (
            <Trans
              i18nKey={`category.all.description.filtered`}
              values={{
                numberOfApps: filteredApps.length,
                totalNumberOfApps: apps.length,
              }}
              components={{
                o: <ExternalLink href="https://openstreetmap.org/" />,
              }}
            />
          ) : (
            <Trans
              i18nKey={`category.${state.category}.description`}
              values={{
                numberOfApps: filteredApps.length,
              }}
              components={{
                o: <ExternalLink href="https://openstreetmap.org/" />,
                s: <a href="/docs/score" />,
              }}
            />
          )}
        </p>
        <SearchField apps={apps} />{" "}
        <Filters
          active={moreFilters}
          onChange={(value) => setMoreFilters(value)}
        />
        {!moreFilters &&
          (state.topics.length > 0 ||
            state.languages.length > 0 ||
            state.platforms.length > 0 ||
            state.programmingLanguages.length > 0 ||
            state.coverage.length > 0 ||
            state.contribute.length > 0) && (
            <p style={{ margin: "5px 10px", lineHeight: 1.5 }}>
              {!isInitState() ? t("filter.preview") : t("filter.preset")}{" "}
              {chain([
                ...state.topics,
                ...state.languages,
                ...state.platforms,
                ...state.programmingLanguages,
                ...state.coverage,
              ])
                .filter((v) => !!v)
                .uniq()
                .map((v) => (
                  <>
                    <span
                      className="filter-value"
                      onClick={() => {
                        setMoreFilters(true);
                      }}
                    >
                      {v}
                    </span>{" "}
                  </>
                ))
                .value()}
              {chain([...state.contribute])
                .filter((v) => !!v)
                .uniq()
                .map((v) => (
                  <>
                    <span
                      className="filter-value"
                      onClick={() => {
                        setMoreFilters(true);
                      }}
                    >
                      {t(mapping[v])}
                    </span>{" "}
                  </>
                ))
                .value()}
              {(state.topics.length > 0 ||
                state.languages.length > 0 ||
                state.platforms.length > 0 ||
                state.programmingLanguages.length > 0 ||
                state.coverage.length > 0 ||
                state.contribute.length > 0) && (
                <>
                  {" "}
                  <button
                    className="show-all"
                    onClick={() =>
                      navigate(
                        routes.search({
                          search: state.search || undefined,
                          view: state.view as "list" | "compare",
                        }),
                      )
                    }
                  >
                    {t("category.showAll")}
                  </button>
                </>
              )}
            </p>
          )}
        {moreFilters && (
          <span className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5">
            <TopicSelect
              apps={filteredApps}
              selected={state.topics}
              onChange={(newValues) => setState("topics", newValues)}
            />
            <LanguageSelect
              apps={filteredApps}
              selected={state.languages}
              onChange={(newValues) => setState("languages", newValues)}
            />
            <PlatformSelect
              apps={filteredApps}
              selected={state.platforms}
              onChange={(newValues) => setState("platforms", newValues)}
            />
            {isTechView && (
              <ProgrammingLanguageSelect
                apps={filteredApps}
                selected={state.programmingLanguages}
                onChange={(newValues) =>
                  setState("programmingLanguages", newValues)
                }
              />
            )}
            <CoverageSelect
              apps={filteredApps}
              selected={state.coverage}
              onChange={(newValues) => setState("coverage", newValues)}
            />
            <ContributeSelect
              selected={state.contribute}
              onChange={(newValues) => setState("contribute", newValues)}
            />
          </span>
        )}
        {filteredApps.length <= 300 && filteredApps.length > 0 && (
          <ViewSelect
            value={state.view}
            onChange={(newValues) => setState("view", newValues)}
          />
        )}
      </div>
      <>
        {apps.length > 0 &&
          (state.view !== "compare" ? (
            <main className="mx-auto max-w-7xl">
              <div id="list">
                <>
                  <div className="grid auto-rows-auto gap-x-4 gap-y-2 px-6 md:grid-cols-2 md:px-16 lg:grid-cols-3">
                    {filteredApps.length > 0 ? (
                      <PagedList
                        items={filteredApps.map((app) => ({
                          key: app.id,
                          app,
                        }))}
                        Template={({ app }) => (
                          <AppCompact
                            app={app}
                            score
                            tags
                            tagsReorganization={DefaultTagsReorganization}
                          />
                        )}
                      >
                        <RelatedApps findSimilarApps={findSimilarApps} />
                        <NotFoundApps apps={apps} />
                      </PagedList>
                    ) : (
                      <>
                        <NoResults />
                        <NotFoundApps apps={apps} />
                      </>
                    )}
                  </div>
                </>
              </div>
            </main>
          ) : (
            <main>
              {filteredApps.length > 0 ? (
                <div id="compare" className="table">
                  <LazyInitMore>
                    <Compare
                      apps={filteredApps}
                      lang={i18n.resolvedLanguage || "en"}
                      state={state}
                      isInitState={isInitState}
                    />
                  </LazyInitMore>
                </div>
              ) : (
                <NoResults />
              )}
            </main>
          ))}
      </>
    </>
  );
}
