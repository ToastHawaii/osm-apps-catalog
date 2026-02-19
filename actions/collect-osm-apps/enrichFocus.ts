import { getLastMod } from "@actions/lib/getLastMod";
import { App } from "@shared/data/App";
import { chain } from "lodash";

export function enrichFocus(apps: App[], knownApps: App[]) {
  const now = new Date().toISOString();
  const yesterday = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24,
  ).toISOString();

  for (const app of apps) {
    const knownApp = knownApps.find((k) => k.id === app.id);
    if (!knownApp) {
      app.lastFocus = "0000-00-00T00:00:00Z";
    } else {
      app.lastFocus = knownApp.lastFocus || "0000-00-00T00:00:00Z";
    }
  }

  // Find all those that have changed in the last day and show those that have not been displayed
  // for the longest time
  const focusedApps = chain(apps)
    .filter((a) => getLastMod(a.source[0]) > yesterday)
    .sortBy((a) => a.lastFocus)
    .take(10)
    .value();

  for (const app of focusedApps) {
    app.lastFocus = now;
  }
}
