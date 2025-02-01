import { useState, useEffect } from "react";
import { getJson } from "./utilities/jsonRequest";
import { App } from "./data/App";
import { isDevelopment } from "./utilities/isDevelopment";
import { printCalcScore } from "./utilities/printCalcScore";

async function loadData() {
  if (!isDevelopment) {
    try {
      return await getJson("/api/apps/all.json", {});
    } catch {
      console.error("Data could not be loaded, the local cache is used.");
      return (await import("./data/all.json")).default;
    }
  } else {
    return (await import("./data/all.json")).default;
  }
}

export function useData() {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    loadData().then((apps) => {
      setApps(apps);
      if (isDevelopment) {
        printCalcScore(apps);
      }
    });
  }, []);

  return apps;
}
