import { equalsIgnoreCase } from "./string";

export function prepareArrayForSelect(names: string[], selected: string[]) {
  names.sort(function (a, b) {
    if (a?.toUpperCase() < b?.toUpperCase()) return -1;
    if (a?.toUpperCase() > b?.toUpperCase()) return 1;
    return 0;
  });
  const nameCounts: { name: string; count: number }[] = [];
  for (const name of names) {
    const nameCountFiltered = nameCounts.filter((nc) =>
      equalsIgnoreCase(nc.name, name)
    );

    if (nameCountFiltered.length > 0) {
      nameCountFiltered[0].count++;
    } else {
      nameCounts.push({ name: name, count: 1 });
    }
  }

  return nameCounts.map((t) => {
    if (selected.filter((s) => equalsIgnoreCase(t.name, s)).length > 0)
      return { value: t.name, text: t.name, selected: true };
    else
      return { value: t.name, text: `${t.name} (${t.count})` };
  });
}
