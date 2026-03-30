import { Header } from "@components/layout/Header";
import { ThemeProvider } from "@components/ThemeProvider";
import { AppStateProvider } from "@hooks/useAppsData";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useSearchParams } from "react-router";

export function ScrollRestoration() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [scrollState, setScrollState] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const scrollContainer = document.getElementById("content");
    if (!scrollContainer) return;

    // on history back (or forward) scroll to last position before navigated
    const saved = sessionStorage.getItem(`scroll:${location.key}`);
    const { left = 0, top = 0 } = saved ? JSON.parse(saved) : {};

    let lastChangeTime = performance.now();
    let lastTop = scrollContainer.scrollTop;
    let lastLeft = scrollContainer.scrollLeft;

    // sometimes it need multiple tries because of lazy loading
    const tryScroll = () => {
      scrollContainer.scrollTo({ left, top, behavior: "instant" });

      const currentTop = scrollContainer.scrollTop;
      const currentLeft = scrollContainer.scrollLeft;

      const scrolled = currentTop === top && currentLeft === left;

      const positionChanged = currentTop > lastTop || currentLeft > lastLeft;

      if (positionChanged) {
        lastChangeTime = performance.now();
        lastTop = currentTop;
        lastLeft = currentLeft;
      }

      const timeSinceLastChange = performance.now() - lastChangeTime;

      if (
        !scrolled &&
        /* if no position change after 1 sec, maybe something is wrong... better stop trying */
        timeSinceLastChange < 1000
      ) {
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, [location]);

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById("content");

    if (!scrollContainer) {
      return;
    }

    // after scroll: save current position for browser history changes
    const handleScroll = () => {
      setScrollState({
        top: scrollContainer.scrollTop,
        left: scrollContainer.scrollLeft,
      });
    };
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [searchParams]);

  useEffect(() => {
    return () => {
      const scrollContainer = document.getElementById("content");
      if (!scrollContainer) return;

      // runs BEFORE navigation (cleanup of previous render)
      sessionStorage.setItem(
        `scroll:${location.key}`,
        JSON.stringify(scrollState),
      );
    };
  }, [location, scrollState]);

  return null;
}

export default function Layout() {
  const { i18n } = useTranslation();

  document.documentElement.lang = i18n.resolvedLanguage || "en";

  return (
    <ThemeProvider>
      <AppStateProvider>
        <ScrollRestoration />
        <div id="content">
          <Header />
          <Outlet />
        </div>
      </AppStateProvider>
    </ThemeProvider>
  );
}
