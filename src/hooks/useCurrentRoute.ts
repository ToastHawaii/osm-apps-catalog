import { useCurrentRouteName } from "@hooks/useCurrentRouteName";
import { Params, routeFactory } from "@hooks/useRoutes";

export function useCurrentRoute() {
  const routes = routeFactory();
  const currentRouteName = useCurrentRouteName();

  return routes[currentRouteName] as (params?: Params) => string;
}
