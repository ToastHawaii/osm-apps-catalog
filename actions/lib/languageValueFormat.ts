export function languageValueFormat(value: string) {
  if (!Number.isNaN(Number.parseInt(value, 10))) {
    value = "mul";
  } else {
    value = value.replaceAll("_", "-").toLowerCase();
  }

  return value;
}
