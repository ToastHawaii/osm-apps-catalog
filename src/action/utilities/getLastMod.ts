import { Source } from "../../shared/data/App";

export function getLastMod(source: Source) {
  if (source.name === "taginfo" || source.name === "ServiceItem") {
    return source.firstCrawled;
  }
  return source.lastChange;
}
