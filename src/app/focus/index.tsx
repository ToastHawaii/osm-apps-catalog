import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { App } from "@shared/data/App";
import { useAppState } from "@hooks/useAppState";

import { AppCompact } from "@components/common/AppCompact";
import { chain } from "lodash";

export function Focus({ apps }: { apps: App[] }) {
  const { t } = useTranslation();
  const [state] = useAppState();

  const category = useMemo(() => {
    const categoryApps = chain(apps)
      .sortBy((a) => a.lastFocus)
      .reverse()
      .take(10)
      .value();

    return {
      name: () => t(`category.focus`),
      description: () => t(`category.focus.description`),
      apps: categoryApps,
    };
  }, [apps.length, JSON.stringify(state.platforms)]);

  return (
    <>
      <title>{`${t(`category.focus`, {
        numberOfApps: apps.length,
      })} - OSM Apps Catalog`}</title>
      <meta
        name="description"
        content={t(`category.focus.description`, {
          numberOfApps: apps.length,
        })}
      />
      <main className="mx-auto max-w-7xl">
        <div id="list">
          <h2 className="px-8 pt-3 text-left text-2xl font-semibold md:px-18">
            {category.name()}
          </h2>
          {category.description && (
            <p className="px-8 text-sm text-muted-foreground md:px-18">
              {category.description()}
            </p>
          )}
          <div className="grid gap-x-4 gap-y-2 px-6 md:grid-cols-2 md:px-16 lg:grid-cols-3">
            {category.apps.map((app) => (
              <AppCompact app={app} key={app.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
