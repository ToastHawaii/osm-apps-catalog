// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

import React, { useEffect } from "react";

let scrollTop = 0;
let scrollLeft = 0;

export async function isImage(src: string) {
  return new Promise<HTMLImageElement | undefined>((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      resolve(undefined);
    });
    img.src = src;
    if (img.complete) resolve(img);
  });
}

async function lazyLoadImages(reset?: boolean) {
  if (reset) {
    scrollTop = 0;
    scrollLeft = 0;
  }

  const contentElement = document.getElementById("content") as HTMLDivElement;

  if (!contentElement) {
    return;
  }

  if (
    !scrollTop ||
    contentElement.scrollTop > scrollTop + contentElement.clientHeight
  ) {
    scrollTop = contentElement.scrollTop + contentElement.clientHeight;

    const elements = document.querySelectorAll("#list *[data-dynamic-src]");
    for (let i = 0; i < elements.length; i++) {
      const boundingClientRect = elements[i].getBoundingClientRect();
      if (
        elements[i].hasAttribute("data-dynamic-src") &&
        boundingClientRect.top < contentElement?.clientHeight * 3
      ) {
        const sources = (
          elements[i].getAttribute("data-dynamic-src") || ""
        ).split(" ");

        for (const src of sources) {
          if (document.body.contains(elements[i])) {
            const file = await isImage(src);
            if (file) {
              elements[i].setAttribute("src", src);
              if (file.width > 50 && file.height > 50) {
                elements[i].classList.add("has-images");
              }
              break;
            }
          }
        }
        elements[i].removeAttribute("data-dynamic-src");
      }
    }
  }

  if (
    !scrollLeft ||
    contentElement.scrollLeft > scrollLeft + contentElement.clientWidth
  ) {
    scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;

    const elements = document.querySelectorAll("#compare *[data-dynamic-src]");
    for (let i = 0; i < elements.length; i++) {
      const boundingClientRect = elements[i].getBoundingClientRect();
      if (
        elements[i].hasAttribute("data-dynamic-src") &&
        boundingClientRect.left < contentElement?.clientWidth * 2
      ) {
        const sources = (
          elements[i].getAttribute("data-dynamic-src") || ""
        ).split(" ");

        for (const src of sources) {
          if (document.body.contains(elements[i]) && (await isImage(src))) {
            elements[i].setAttribute("src", src);
            break;
          }
        }
        elements[i].removeAttribute("data-dynamic-src");
      }
    }
  }
}

export function LazyLoadImages({ children }: { children: any }) {
  const element = document.getElementById("content");

  useEffect(() => {
    lazyLoadImages(true);

    function handleEvent() {
      lazyLoadImages();
    }

    element?.addEventListener("scroll", handleEvent);
    element?.addEventListener("load", handleEvent);
    element?.addEventListener("resize", handleEvent);

    return () => {
      element?.removeEventListener("scroll", handleEvent);
      element?.removeEventListener("load", handleEvent);
      element?.removeEventListener("resize", handleEvent);
    };
  });

  return <>{children}</>;
}
