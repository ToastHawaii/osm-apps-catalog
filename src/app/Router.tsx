import React from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Search } from "@app/search";
import { Home } from "@app/home";
import { useAppsData } from "@hooks/useAppsData";
import { Category } from "@app/category";
import { Tech } from "@app/tech";
import { AppPage } from "@app/app";
import { NotFound } from "@app/notFound";
import { useIsTechDomain } from "@hooks/useIsTechDomain";
import { useRoute } from "@hooks/useRoute";

export function Router() {
  const apps = useAppsData().apps.slice();

  const [searchParams] = useSearchParams();
  const isTechDomain = useIsTechDomain();

  const navigate = useNavigate();
  const routes = useRoute();

  switch (searchParams.get("page")) {
    case "app": {
      if (apps.length === 0) {
        return null;
      }

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
      if (searchParams.get("app")) {
        // redirect to app detail page to support a stable route
        navigate(
          routes.app({ app: parseInt(searchParams.get("app") || "", 10) }),
        );
      }
      if (searchParams.get("wiki")) {
        // redirect to app detail page to support linking from wiki.openstreetmap.org

        if (apps.length) {
          const app = apps.find((a) =>
            a.source.some(
              (s) =>
                (s.name === "Software" || s.name === "Layer") &&
                s.id === searchParams.get("wiki"),
            ),
          );

          if (!app) {
            return <NotFound />;
          }

          navigate(routes.app({ app: app.id }));
        }
      }
      if (searchParams.get("search")) {
        // redirect to search page to support a stable route
        navigate(routes.search({ search: searchParams.get("search") || "" }));
      }

      return isTechDomain ? <Tech apps={apps} /> : <Home apps={apps} />;
    default:
      return <NotFound />;
  }
}
