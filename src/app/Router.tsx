import React from "react";
import { useSearchParams } from "react-router";

import { Search } from "@app/ui/App";
import { Home } from "@app/home";
import { useAppsData } from "@hooks/useAppsData";
import { Category } from "@app/category";

export function Router() {
  const apps = useAppsData().apps.slice();

  const [searchParams] = useSearchParams();

  switch (searchParams.get("view")) {
    case "search":
    case "app":
      return <Search apps={apps} />;
    case "explore":
      return <Category apps={apps} id={searchParams.get("category") || ""} />;
    default:
      return <Home apps={apps} />;
  }
}
