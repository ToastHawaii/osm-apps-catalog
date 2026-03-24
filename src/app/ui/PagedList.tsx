import { omit } from "lodash";
import React, { useState, useEffect, ReactNode } from "react";

let scrollTop = 0;

function init(onNextPage: () => void, reset?: boolean) {
  if (reset) {
    scrollTop = 0;
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

    const elements = document.querySelectorAll(".next-page");
    for (const element of elements) {
      const boundingClientRect = element.getBoundingClientRect();
      if (boundingClientRect.top < contentElement?.clientHeight * 3) {
        onNextPage();
      }
    }
  }
}

export function PagedList<T extends { key: React.Key }>({
  Template,
  items,
  children,
}: {
  Template: React.FC<T>;
  items: T[];
  children?: ReactNode;
}) {
  const [showNext, setShowNext] = useState(false);

  const current = items.slice(0, 30);
  const rest = items.slice(30);

  const element = document.getElementById("content");
  useEffect(() => {
    if (showNext) {
      return;
    }

    function next() {
      setShowNext(true);
      element?.removeEventListener("scroll", handleEvent);
      element?.removeEventListener("load", handleEvent);
      element?.removeEventListener("resize", handleEvent);
    }

    function handleEvent() {
      init(next);
    }

    init(next, true);
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
    <>
      {current.map((a) => (
        // eslint-disable-next-line react/jsx-key -- wrong positive, the key is part of the item
        <Template key={a.key} {...(omit(a, "key") as any)} />
      ))}
      {rest.length > 0 ? (
        showNext ? (
          <PagedList items={rest} Template={Template}>
            {children}
          </PagedList>
        ) : (
          <div className="next-page"></div>
        )
      ) : (
        children
      )}
    </>
  );
}
