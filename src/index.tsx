import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import "./ui/utilities/i18n";
import { App } from "./ui/App";
import {
  requestWikidata,
  transformWikidataResult,
} from "./action/crawler/wikidata";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

(async function () {
  const wikidataRequest = requestWikidata("en");

  const wikidataResults = await Promise.all(wikidataRequest);
  for (const wikidataResult of wikidataResults)
    for (const source of wikidataResult.results.bindings) {
      const obj = transformWikidataResult(source);
    if(obj.name.includes("KartaView")){debugger}
    }
    
})();
