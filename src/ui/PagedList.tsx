import React, { useState, useEffect } from "react";
import { App as AppData } from "../data/App";
import { List } from "./views/List";
import { LazyLoadImages } from "./components/LazyLoadImages";
import { State } from "../State";

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
    for (let i = 0; i < elements.length; i++) {
      const boundingClientRect = elements[i].getBoundingClientRect();
      if (boundingClientRect.top < contentElement?.clientHeight * 3) {
        onNextPage();
      }
    }
  }
}

export function PagedList({
  apps,
  open,
  children,
  state,
}: {
  apps: AppData[];
  open: boolean;
  children: any;
  state: State;
}) {
  const [showNext, setShowNext] = useState(false);

  const current = apps.slice(0, 30);
  const rest = apps.slice(30);

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
      <LazyLoadImages>
        {current.map((a) => (
          <List key={a.id} app={a} open={open} state={state} />
        ))}
      </LazyLoadImages>
      {rest.length > 0 ? (
        showNext ? (
          <PagedList apps={rest} open={open} state={state}>
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
