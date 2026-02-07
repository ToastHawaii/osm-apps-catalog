import { useRoutes } from "@hooks/useRoutes";
import { useSearchParams } from "react-router";

export function useCurrentRouteName() {
  const routes = useRoutes();

  const [searchParams] = useSearchParams();
  const currentRouteName = searchParams.get("view") || "home";

  if (!currentRouteName || !(currentRouteName in routes)) {
    throw new Error("unknown route");
  }

  return currentRouteName as keyof typeof routes;
}
