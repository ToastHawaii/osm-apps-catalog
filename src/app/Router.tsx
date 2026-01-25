import React from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Search } from "@app/ui/App";
import { useData } from "@lib/utils/useData";
import { Home } from "@app/home";

export function Router() {
  const { i18n } = useTranslation();

  const apps = useData(i18n.language);

  const [searchParams] = useSearchParams();

  switch (searchParams.get("view")) {
    case "search":
      return <Search apps={apps} />;
    default:
      return <Home apps={apps} />;
  }
}
