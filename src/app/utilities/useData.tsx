import { useState, useEffect } from "react";
import { getJson } from "./jsonRequest";
import { App } from "../../shared/data/App";
import { isDevelopment } from "./isDevelopment";
import { printCalcScore } from "./printCalcScore";
import { prepareLanguage } from "../../shared/data/prepareLanguage";

async function loadData() {
  // for testing
  // return (await import("../../action/loadApps")).loadApps();

  if (!isDevelopment) {
    try {
      return await getJson("/api/apps/all.json", {});
    } catch {
      console.error("Data could not be loaded, the local cache is used.");
      return (await import("../../shared/data/all.json")).default;
    }
  } else {
    return (await import("../../shared/data/all.json")).default;
  }
}

export function useData() {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    loadData().then((apps) => {
      prepareLanguage(apps);

      for (const app of apps as App[]) {
        app.cache = {
          topics: app.topics.map((t) => t.toUpperCase()),
          platform: app.platform.map((p) => p.toUpperCase()),
          languages: app.languages.map((l) => l.toUpperCase()),
          coverage: app.coverage.map((c) => c.toUpperCase()),
        };
      }

      setApps(apps);
      if (isDevelopment) {
        printCalcScore(apps);
      }
    });
  }, []);

  return apps;
}
