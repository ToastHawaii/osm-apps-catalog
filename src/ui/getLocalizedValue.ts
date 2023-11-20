export type LocalizedValue =
  | string
  | {
      [x: string]: string | undefined;
    };

export function getLocalizedValue(
  setting: LocalizedValue | undefined | null,
  locale: string
) {
  if (!setting) {
    return undefined;
  }

  if (typeof setting === "string") {
    return setting;
  }

  if (setting[locale]) {
    // excact match found
    return setting[locale];
  }

  const parts = locale.split("-");
  if (parts.length > 1) {
    if (setting[parts[0]]) {
      // found eg. "de" for "de-CH"
      return setting[locale];
    }
  }

  // fallback take first
  return setting[Object.keys(setting)[0]];
}
