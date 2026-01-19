export function languageFilter(value: string) {
  if (!value) {
    return false;
  }

  const valueUp = value.toUpperCase();
  switch (valueUp) {
    case "C":
    case "C++":
    case "PYTHON":
    case "SQL":
    case "WEBSITE":
      return false;
  }

  return true;
}
