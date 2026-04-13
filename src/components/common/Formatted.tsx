import React from "react";

import { sanitizeHtml } from "@shared/utils/sanitizeHtml";

// code from <HugeiconsIcon icon={Share05Icon} />
const linkIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" style="width: 1em; height: 1em; margin-top: -2px;"
viewBox="0 0 24 24" fill="none" color="currentColor"
class="inline-block" stroke-width="2" stroke="currentColor">
<path d="M19.0001 13V14C19.0001 17.2998 19.0001 18.9497 17.9749 19.9749C16.9498 21 15.2999 21 12.0001 21H10.0001C6.70023 21 5.05031 21 4.02519 19.9749C3.00006 18.9497 3.00006 17.2998 3.00006 14V12C3.00006 8.70017 3.00006 7.05025 4.02519 6.02513C5.05031 5 6.70023 5 10.0001 5H11.0001"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
<path d="M14 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V10M20 4L11 13"
stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
</svg>
`;

export function Formatted({ htmlText }: { htmlText?: string | undefined }) {
  return (
    !!htmlText && (
      <span
        // add some formatting for basic html elements
        className="[&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_p]:mb-4"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(htmlText)
            /**
             * sanitize-html does NOT directly support
             * inserting inner HTML inside transformTags cleanly.
             *
             * So we append SVG in a second pass.
             */
            .replace(/<a([^>]*)>(.*?)<\/a>/g, `<a$1>$2 ${linkIconSvg}</a>`),
        }}
      />
    )
  );
}
