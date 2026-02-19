import { Source } from "@shared/data/App";
import { chain } from "lodash";

export function mergeAppSources(source1: Source[], source2: Source[]) {
  return (
    chain([...source1, ...source2])
      // only add if not same source
      .uniqBy((s) => `${s.lastChange}:${s.name}`)
      // make the first source the newest
      .sortBy((s) => s.lastChange)
      .reverse()
      .value()
  );
}
