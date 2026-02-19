import { request, transform } from "@actions/lib/crawler/wikidata";
import { App } from "@shared/data/App";
import { mergeWith } from "lodash";

export async function loadAppsFromWikidata(queries: string[]) {
  const wikidataResults = await Promise.all(
    queries.map((query) => request(query)),
  );

  // Merge multiple queries results into single apps based on language and Wikidata ID
  const objs = new Map<string, App>();
  for (const wikidataResult of wikidataResults) {
    for (const source of wikidataResult.results.bindings) {
      const obj = transform(source);
      const lgId = `${obj.source[0].language}:${obj.source[0].id}`;
      const dup = objs.get(lgId);
      if (!dup) {
        objs.set(lgId, obj);
      } else {
        objs.set(
          lgId,
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
