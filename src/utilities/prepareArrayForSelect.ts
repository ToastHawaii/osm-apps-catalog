import { sortBy } from "lodash";
import { equalsIgnoreCase } from "./string";

export function prepareArrayForSelect(names: string[], selected: string[]) {
  names = sortBy(names, (n) => n.toUpperCase());

  const nameCounts: { name: string; count: number }[] = [];
  for (const name of names) {
    const nameCount = nameCounts.find((nc) => equalsIgnoreCase(nc.name, name));

    if (nameCount) {
      nameCount.count++;
    } else {
      nameCounts.push({ name, count: 1 });
    }
  }

  return nameCounts.map((t) => {
    if (selected.filter((s) => equalsIgnoreCase(t.name, s)).length > 0) {
      return { value: t.name, text: t.name, html: t.name, selected: true };
    } else {
      return {
        value: t.name,
        text: t.name,
        html: `<span class="select-option">(${t.count})</span>${t.name}`,
      };
    }
  });
}
