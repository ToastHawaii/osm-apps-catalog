import { useCurrentRouteName } from "@hooks/useCurrentRouteName";
import { useRoutes } from "@hooks/useRoutes";

export function useCurrentRoute() {
  const routes = useRoutes();
  const currentRouteName = useCurrentRouteName();

  return routes[currentRouteName];
}
