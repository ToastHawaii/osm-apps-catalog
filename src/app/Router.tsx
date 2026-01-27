import React from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Search } from "@app/ui/App";
import { Home } from "@app/home";
import { useData } from "@hooks/useData";
import { Category } from "@app/category";

export function Router() {
  const { i18n } = useTranslation();

  const apps = useData(i18n.language).slice();

  const [searchParams] = useSearchParams();

  switch (searchParams.get("view")) {
    case "search":
    case "app":
      return <Search apps={apps} />;
    case "explore":
      return <Category apps={apps} id={searchParams.get("category")} />;
    default:
      return <Home apps={apps} />;
  }
}
