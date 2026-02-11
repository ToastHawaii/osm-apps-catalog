import { isImage } from "@app/ui/components/LazyLoadImages";
import { omit } from "lodash";
import React, { useState, useRef, useEffect } from "react";

export function LazyImage(
  props: {
    dynamicSrc: string | undefined;
    loadOnInit?: boolean | undefined;
  } & Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "style" | "className" | "alt"
  >,
) {
  const [imgProps, setImgProps] = useState({
    ...omit(props, "dynamicSrc"),
    "data-dynamic-src": props.dynamicSrc,
  });
  const elementRef = useRef<HTMLImageElement>(null);

  async function loadImage(element: Element) {
    const sources = (imgProps["data-dynamic-src"] || "").split(" ");

    for (const src of sources) {
      if (document.body.contains(element) && (await isImage(src))) {
        setImgProps((p: any) => ({ ...p, src, style: undefined }));
        break;
      }
    }
    setImgProps((p: any) => ({ ...p, "data-dynamic-src": undefined }));
  }

  let scrollTop = 0;
  let scrollLeft = 0;

  async function lazyLoadImages(reset?: boolean) {
    if (reset) {
      scrollTop = 0;
      scrollLeft = 0;
    }

    const contentElement = document.getElementById("content") as HTMLDivElement;

    const element = elementRef.current;
    if (!contentElement || !element) {
      return;
    }

    if (
      !scrollTop ||
      contentElement.scrollTop > scrollTop + contentElement.clientHeight
    ) {
      scrollTop = contentElement.scrollTop + contentElement.clientHeight;

      (async () => {
        const boundingClientRect = element.getBoundingClientRect();
        if (
          boundingClientRect.top < contentElement?.clientHeight * 3 &&
          boundingClientRect.left < contentElement?.clientWidth * 2
        ) {
          await loadImage(element);
        }
      })();
    }

    if (
      !scrollLeft ||
      contentElement.scrollLeft > scrollLeft + contentElement.clientWidth
    ) {
      scrollLeft = contentElement.scrollLeft + contentElement.clientWidth;

      (async () => {
        const boundingClientRect = element.getBoundingClientRect();
        if (
          boundingClientRect.top < contentElement?.clientHeight * 3 &&
          boundingClientRect.left < contentElement?.clientWidth * 2
        ) {
          loadImage(element);
        }
      })();
    }
  }

  function getScrollParent(node: Element | null) {
    if (node == null) {
      return null;
    }

    if (node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return getScrollParent(node.parentNode as Element);
    }
  }

  useEffect(() => {
    if (!imgProps["data-dynamic-src"] || !elementRef.current) {
      return;
    }
    if (props.loadOnInit) {
      loadImage(elementRef.current);
    }

    const element = getScrollParent(elementRef.current);

    lazyLoadImages(false);

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

  return (
    <img ref={elementRef} {...{ ...imgProps, "data-dynamic-src": undefined }} />
  );
}
