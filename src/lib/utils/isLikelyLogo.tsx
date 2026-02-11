export function isLikelyLogo(fileName: string) {
  return (
    fileName.toUpperCase().includes(".SVG") ||
    fileName.toUpperCase().includes("ICON") ||
    fileName.toUpperCase().includes("LOGO")
  );
}
