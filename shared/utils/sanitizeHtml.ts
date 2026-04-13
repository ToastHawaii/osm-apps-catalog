import sanitizeHtmlLib from "sanitize-html";

export function sanitizeHtml(input: string) {
  return sanitizeHtmlLib(input, {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a", "h4"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          href: attribs.href,
          target: "_blank",
          // The rel=nofollow is added so that our service is less attractive to forum spam
          rel: "noopener noreferrer nofollow",
        },
      }),
    },
  });
}
