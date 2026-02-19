import sanitizeHtml from "sanitize-html";

export function plainText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  }).replaceAll("&amp;", "&");
}
