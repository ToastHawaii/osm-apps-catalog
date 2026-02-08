import { Header } from "@components/layout/header";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

export function ScrollRestoration() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById("content");

    if (!scrollContainer) {
      return;
    }
    // when ever view=... changes in the url, scroll to top or restore last scroll position
    scrollContainer.scrollTo({
      top: location.state?.top || 0,
      left: location.state?.left || 0,
      behavior: "instant",
    });
  }, [searchParams.get("view")]);

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById("content");

    if (!scrollContainer) {
      return;
    }

    // after scroll: save current position for browser history changes
    const handleScroll = () => {
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
        },
        {
          replace: true,
          state: {
            top: scrollContainer.scrollTop,
            left: scrollContainer.scrollLeft,
          },
        },
      );
    };
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [searchParams]);

  return null;
}

export default function Layout() {
  const { i18n } = useTranslation();

  document.documentElement.lang = i18n.resolvedLanguage || "en";

  return (
    <>
      <ScrollRestoration />
      <div id="content">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
