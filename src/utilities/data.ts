export function groupBy<T>(xs: T[], prop: string): { [p: string]: T[] } {
  return xs.reduce((groups: any, item: any) => {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {}) as any;
}
