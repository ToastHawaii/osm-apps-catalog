import { Source } from "@shared/data/App";
import { chain } from "lodash";

export function mergeAppSources(source1: Source[], source2: Source[]) {
  if (
    source1.some(
      (s) =>
        s.lastChange === source2[0].lastChange && s.name === source2[0].name,
    )
  ) {
    return source1;
  }

  // only add if not same source

  // make the first source the newest
  return chain([...source1, ...source2])
    .sortBy((s) => s.lastChange)
    .reverse()
    .value();
}
