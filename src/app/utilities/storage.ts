export function set<T extends object>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get<T extends object>(key: string): T | undefined {
  try {
    const v = localStorage.getItem(key);
    if (!v) return undefined;
    return JSON.parse(v);
  } catch {
    return undefined;
  }
}
