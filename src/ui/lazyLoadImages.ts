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

export async function lazyLoadImages() {
  {
    const elements = document.querySelectorAll("#list *[dynamic-src]");
    for (let i = 0; i < elements.length; i++) {
      const boundingClientRect = elements[i].getBoundingClientRect();
      if (
        elements[i].hasAttribute("dynamic-src") &&
        boundingClientRect.top <
          (document.getElementById("content") as HTMLDivElement)?.clientHeight *
            2
      ) {
        const sources = (elements[i].getAttribute("dynamic-src") || "").split(
          " "
        );

        for (const src of sources) {
          if (document.body.contains(elements[i]) && (await isImage(src))) {
            elements[i].setAttribute("src", src);
            break;
          }
        }
        elements[i].removeAttribute("dynamic-src");
      }
    }
  }
  {
    const elements = document.querySelectorAll("#compare *[dynamic-src]");
    for (let i = 0; i < elements.length; i++) {
      const boundingClientRect = elements[i].getBoundingClientRect();
      if (
        elements[i].hasAttribute("dynamic-src") &&
        boundingClientRect.left <
          (document.getElementById("content") as HTMLDivElement)?.clientWidth *
            2
      ) {
        const sources = (elements[i].getAttribute("dynamic-src") || "").split(
          " "
        );

        for (const src of sources) {
          if (document.body.contains(elements[i]) && (await isImage(src))) {
            elements[i].setAttribute("src", src);
            break;
          }
        }
        elements[i].removeAttribute("dynamic-src");
      }
    }
  }
}
document.getElementById("content")?.addEventListener("scroll", lazyLoadImages);
document.getElementById("content")?.addEventListener("load", lazyLoadImages);
document.getElementById("content")?.addEventListener("resize", lazyLoadImages);

async function isImage(src: string) {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(true);
    });
    img.addEventListener("error", () => {
      resolve(false);
    });
    img.src = src;
    if (img.complete) resolve(true);
  });
}
