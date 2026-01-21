import {
  requestWikidata,
  transformWikidataResult,
} from "@actions/lib/utilities/crawler/wikidata";
import { App } from "@shared/data/App";
import { mergeWith } from "lodash";

export async function loadAppsFromWikidata() {
  const wikidataResults = await Promise.all(requestWikidata());

  // Merge multiple queries results into single apps based on Wikidata ID
  const objs = new Map<string, App>();
  for (const wikidataResult of wikidataResults) {
    for (const source of wikidataResult.results.bindings) {
      const obj = transformWikidataResult(source);
      const dup = objs.get(obj.source[0].id);
      if (!dup) {
        objs.set(obj.source[0].id, obj);
      } else {
        objs.set(
          obj.source[0].id,
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
