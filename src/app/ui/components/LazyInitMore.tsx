import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function isOverflown(element: Element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

let scrollLeft = 0;

async function lazyInitMore(
  t: TFunction<"translation", undefined>,
  reset?: boolean,
) {
  if (reset) {
    scrollLeft = 0;
  }

  const contentElement = document.getElementById("content") as HTMLDivElement;

  if (!contentElement) {
    return;
  }

  if (
    scrollLeft &&
    contentElement.scrollLeft < scrollLeft + contentElement.clientWidth
  ) {
    return;
  }

  scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;

  const elements = document.querySelectorAll("#compare .dynamic-more");
  for (const element of elements) {
    const boundingClientRect = element.getBoundingClientRect();
    if (boundingClientRect.left < contentElement.clientWidth * 3) {
      if (isOverflown(element)) {
        element.classList.add("more");
        const div = document.createElement("div");
        div.classList.add("fade-out");
        div.innerHTML = `<div class="button"><span class="text">&mdash; ${t(
          "list.more",
        )} &mdash;</span></div>`;
        element.appendChild(div);

        div.addEventListener("click", function (this: HTMLElement) {
          this.style.display = "none";
          const h = this.parentElement as HTMLElement | null;
          if (!h) return;
          h.style.height = h.scrollHeight + "px";

          setTimeout(function () {
            h.style.height = "auto";
          }, 1200);
        });
      }
      element.classList.remove("dynamic-more");
    }
  }
}

export function LazyInitMore({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const element = document.getElementById("content");

  useEffect(() => {
    lazyInitMore(t, true);

    function handleEvent() {
      lazyInitMore(t);
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
