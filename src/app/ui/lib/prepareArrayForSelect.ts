import { chain, upperCase } from "lodash";
import { equalsIgnoreCase } from "@shared/utils/string";

export function prepareArrayForSelect(names: string[], selected: string[]) {
  return chain(names)
    .groupBy(upperCase)
    .map((n) => ({ name: n[0], count: n.length }))
    .sortBy((t) => t.name)
    .map((t) => {
      if (selected.filter((s) => equalsIgnoreCase(t.name, s)).length > 0) {
        return { value: t.name, text: t.name, html: t.name, selected: true };
      } else {
        return {
          value: t.name,
          text: t.name,
          count: t.count,
          html: `<span class="select-option">(${t.count})</span>${t.name}`,
        };
      }
    })
    .value();
}
