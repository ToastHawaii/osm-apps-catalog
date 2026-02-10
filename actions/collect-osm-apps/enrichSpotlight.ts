import { getLastMod } from "@actions/lib/utilities/getLastMod";
import { App } from "@shared/data/App";
import { chain } from "lodash";

export async function enrichSpotlight(apps: App[], knownApps: App[]) {
  const now = new Date().toISOString();
  const yesterday = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 24,
  ).toISOString();

  for (const app of apps) {
    const knownApp = knownApps.find((k) => k.id === app.id);
    if (!knownApp) {
      app.lastSpotlight = "0000-00-00T00:00:00Z";
    } else {
      app.lastSpotlight = knownApp.lastSpotlight || "0000-00-00T00:00:00Z";
    }
  }

  // Find all those that have changed in the last day with having some props needed for spotlight
  // and show those that have not been displayed for the longest time, collect per platform
  const filteredApps = chain(apps)
    .filter(
      (a) =>
        getLastMod(a.source[0]) > yesterday &&
        !!a.name &&
        !!(a.subtitle || a.description) &&
        a.logos.length > 0 &&
        a.images.length > 0 &&
        !a.unmaintained,
    )
    .sortBy((a) => a.lastSpotlight)
    .value();

  const spotlightedApps = chain(filteredApps)
    .filter((a) => a.platform.some((p) => p.toUpperCase() === "WEB"))
    .take(2)
    .value();

  // find apps for every main category
  ["ANDROID", "IOS", "LINUX", "MACOS", "WINDOWS"].forEach((platform) => {
    spotlightedApps.push(
      ...chain(filteredApps)
        .filter(
          (a) =>
            !spotlightedApps.includes(a) &&
            a.platform.some((p) => p.toUpperCase() === platform),
        )
        .take(2)
        .value(),
    );
  });

  for (const app of spotlightedApps) {
    app.lastSpotlight = now;
  }
}
