function check(value: string) {
  return !!value?.match(
    "(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|ISC.*|MIT.*|Unlicense|ODbL.*|MPL.*|CC.*|Ms-PL.*)",
  );
}
export function isFreeAndOpenSource(value: string | string[] | undefined) {
  if (!value || value.length === 0) {
    return undefined;
  }

  if (typeof value === "string") {
    return check(value);
  }

  return value.some((v) => check(v));
}
