export function normalizeSearchText(text: string) {
  return text
    .replace(/ß/g, "ss")
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // Special characters -> Space
    .replace(/\s+/g, " ") // Remove double spaces
    .trim();
}
