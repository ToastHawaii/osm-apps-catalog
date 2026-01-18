import { App } from "@shared/data/App";
import { mergeWith } from "lodash";
import { requestWikidata, transformWikidataResult } from "./crawler/wikidata";

export async function loadAppsFromWikidata(language: string) {
  const wikidataResults = await Promise.all(requestWikidata(language));

  const objs = new Map<string, App>();
  for (const wikidataResult of wikidataResults) {
    for (const source of wikidataResult.results.bindings) {
      const obj = transformWikidataResult(source);
      const dup = objs.get(obj.name);
      if (!dup) {
        objs.set(obj.name, obj);
      } else {
        objs.set(
          obj.name,
          mergeWith(obj, dup, (o, s) => {
            if (typeof o === "string") {
              return o || s;
            }
          }),
        );
      }
    }
  }
  return Array.from(objs.values());
}
