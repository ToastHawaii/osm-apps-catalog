import React from "react";
import { useSearchParams } from "react-router";

import { Search } from "@app/search";
import { Home } from "@app/home";
import { useAppsData } from "@hooks/useAppsData";
import { Category } from "@app/category";
import { Tech } from "@app/tech";

export function Router() {
  const apps = useAppsData().apps.slice();

  const [searchParams] = useSearchParams();

  switch (searchParams.get("view")) {
    case "app":
    case "search":
    case "list":
    case "compare":
      return <Search apps={apps} />;
    case "explore":
      return <Category apps={apps} id={searchParams.get("category") || ""} />;
    case "tech":
      return <Tech apps={apps} />;
    default:
      return <Home apps={apps} />;
  }
}
