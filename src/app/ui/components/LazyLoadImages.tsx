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

async function loadImage(element: Element) {
  const sources = (element.getAttribute("data-dynamic-src") || "").split(" ");

  for (const src of sources) {
    if (document.body.contains(element) && (await isImage(src))) {
      element.setAttribute("src", src);
      element.setAttribute("style", "");
      break;
    }
  }
  element.removeAttribute("data-dynamic-src");
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
    for (const element of elements) {
      (async () => {
        const boundingClientRect = element.getBoundingClientRect();
        if (
          element.hasAttribute("data-dynamic-src") &&
          boundingClientRect.top < contentElement?.clientHeight * 3
        ) {
          await loadImage(element);
        }
      })();
    }
  }

  if (
    !scrollLeft ||
    contentElement.scrollLeft > scrollLeft + contentElement.clientWidth
  ) {
    scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;

    const elements = document.querySelectorAll("#compare *[data-dynamic-src]");
    for (const element of elements) {
      (async () => {
        const boundingClientRect = element.getBoundingClientRect();
        if (
          element.hasAttribute("data-dynamic-src") &&
          boundingClientRect.left < contentElement?.clientWidth * 2
        ) {
          loadImage(element);
        }
      })();
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
