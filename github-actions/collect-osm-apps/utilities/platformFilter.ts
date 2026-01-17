export function platformFilter(value: string) {
  if (!value) {
    return false;
  }

  const valueUp = value.toUpperCase();
  switch (valueUp) {
    case "ARM ARCHITECTURE":
    case "GTK":
    case "X86":
    case "X86-64":
      return false;
  }

  return true;
}
