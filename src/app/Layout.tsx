import { Footer } from "@components/layout/Footer";
import { Header } from "@components/layout/Header";
import { HugeiconsIcon } from "@hugeicons/react";
import { XIcon } from "@hugeicons/core-free-icons";
import { ThemeProvider } from "@components/ThemeProvider";
import { AppStateProvider } from "@hooks/useAppsData";
import { AppsFundingStateProvider } from "@hooks/useAppsFundingData";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
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

const ThreeWeeks = 14 * 24 * 60 * 60 * 1000;

function KaoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isBot =
      /googlebot|googleother|google-inspectiontool|adsbot-google|mediapartners-google|feedfetcher-google|google-read-aloud|storebot-google|google-site-verification/i.test(
        userAgent,
      );

    if (isBot) {
      return;
    }

    const dismissedKey = "kaoDismissed";
    const dismissedAt = localStorage.getItem(dismissedKey);

    if (dismissedAt) {
      const dismissedDate = new Date(parseInt(dismissedAt, 10));
      const now = new Date();
      const threeWeeksLater = new Date(dismissedDate.getTime() + ThreeWeeks);

      if (now < threeWeeksLater) {
        return;
      }
    }

    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("kaoDismissed", Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-between bg-red-300 px-4 py-3 text-center">
      <a
        href={"https://ke" + "epandr" + "oidop" + "en.org/"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 hover:underline"
      >
        <Trans
          i18nKey="kao"
          components={{
            LearnMoreLink: (
              <span className="font-bold">
                {"https://kee" + "pand" + "roidop" + "en.org/"}
              </span>
            ),
          }}
        />
      </a>
      <button
        onClick={handleDismiss}
        className="ml-4 rounded p-1 transition-colors hover:bg-red-400"
        aria-label="Close"
      >
        <HugeiconsIcon icon={XIcon} className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function Layout() {
  const { i18n } = useTranslation();

  document.documentElement.lang = i18n.resolvedLanguage || "en";

  return (
    <ThemeProvider>
      <AppStateProvider>
        <AppsFundingStateProvider>
          <ScrollRestoration />
          <KaoBanner />
          <div id="content" className="flex flex-col">
            <Header />
            <div className="grow">
              <Outlet />
            </div>
            <div className="mt-5">
              <Footer />
            </div>
          </div>
        </AppsFundingStateProvider>
      </AppStateProvider>
    </ThemeProvider>
  );
}
