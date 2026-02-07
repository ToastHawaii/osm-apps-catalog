import { useCurrentRouteName } from "@hooks/useCurrentRouteName";
import { Params, Result, useRoutes } from "@hooks/useRoutes";

export function useCurrentRoute() {
  const routes = useRoutes();
  const currentRouteName = useCurrentRouteName();

  return routes[currentRouteName] as (params?: Params) => Result;
}
