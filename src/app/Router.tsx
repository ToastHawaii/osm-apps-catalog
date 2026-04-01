import React from "react";
import { useSearchParams } from "react-router";

import { Search } from "@app/search";
import { Home } from "@app/home";
import { useAppsData } from "@hooks/useAppsData";
import { Category } from "@app/category";
import { Tech } from "@app/tech";
import { AppPage } from "@app/app";
import { NotFound } from "@app/notFound";

export function Router() {
  const apps = useAppsData().apps.slice();

  const [searchParams] = useSearchParams();

  switch (searchParams.get("page")) {
    case "app": {
      const id = parseInt(searchParams.get("app") || "", 10);

      const app = apps.find((a) => a.id === id);

      if (!app) {
        return <NotFound />;
      }

      return <AppPage app={app} />;
    }

    case "search":
      return <Search apps={apps} />;
    case "explore":
      return <Category apps={apps} id={searchParams.get("category") || ""} />;
    case "":
    case undefined:
    case null:
      return searchParams.get("domain") === "tech" ? (
        <Tech apps={apps} />
      ) : (
        <Home apps={apps} />
      );
    default:
      return <NotFound />;
  }
}
