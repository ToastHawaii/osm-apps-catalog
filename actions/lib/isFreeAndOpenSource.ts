import { some } from "@shared/utils/array";
import { upperCase } from "@shared/utils/string";

function check(value: string) {
  return !!value?.match(
    "(?:.*GPL.*|Apache.*|.*BSD.*|PD|WTFPL|ISC.*|MIT.*|Unlicense|ODbL.*|MPL.*|CC.*|Ms-PL.*)",
  );
}
export function isFreeAndOpenSourceLicense(
  value: string | string[] | undefined,
) {
  if (!value || value.length === 0) {
    return undefined;
  }

  if (typeof value === "string") {
    return check(value);
  }

  return value.some((v) => check(v));
}

export function isFreeAndOpenSourceSoftware(
  value: string | string[] | undefined,
) {
  if (!value || value.length === 0) {
    return undefined;
  }

  const list = [
    "FREE AND OPEN-SOURCE SOFTWARE",
    "FREE SOFTWARE",
    "OPEN-SOURCE PROJECT",
    "PUBLIC-DOMAIN SOFTWARE",
    "OPEN-SOURCE SOFTWARE",
    "OPEN SOURCE GEOSPATIAL SOFTWARE",
    "OPEN DATA PROJECT",
    "OPEN CONTENT",
    "OPEN DATA PORTAL",
  ];

  if (typeof value === "string") {
    return some(upperCase([value]), list);
  }

  return some(upperCase(value), list);
}
