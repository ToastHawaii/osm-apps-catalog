export function isLikelyLogo(fileName: string) {
  return (
    fileName.toUpperCase().includes(".SVG") ||
    // ignore coincidental matches
    fileName.includes("ICON") ||
    fileName.includes("icon") ||
    fileName.includes("LOGO")||
    fileName.includes("logo")
  );
}
