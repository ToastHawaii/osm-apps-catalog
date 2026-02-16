import { getLastMod } from "@actions/lib/utilities/getLastMod";
import { App } from "@shared/data/App";
import { sortBy } from "lodash";

export function enrichFirstCrawled(apps: App[], knownApps: App[]) {
  const now = new Date().toISOString();

  for (const app of apps) {
    const knownApp = knownApps.find((k) => k.id === app.id);
    if (!knownApp) {
      app.source = app.source.map((s) => ({ ...s, firstCrawled: now }));
    } else {
      for (const source of app.source) {
        const knownSource = knownApp.source.find(
          (k) => k.name === source.name && k.url === source.url,
        );
        if (!knownSource) {
          source.firstCrawled = now;
        } else {
          source.firstCrawled =
            knownSource.firstCrawled || "2025-03-01T00:00:00Z";
        }
      }
    }

    app.source = sortBy(app.source, getLastMod).reverse();
  }
}
