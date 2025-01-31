import { useState, useEffect } from "react";
import { getJson } from "./utilities/jsonRequest";
import { App } from "./data/App";
import { isDevelopment } from "./utilities/isDevelopment";
import { printCalcScore } from "./utilities/printCalcScore";

async function loadData() {
  if (!isDevelopment) {
    return await getJson("/api/apps/all.json", {});
  } else {
    //return await require("./data/all.json");
     throw new Error("Remove for dev.");
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
