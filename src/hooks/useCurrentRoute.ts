import { useCurrentRouteName } from "@hooks/useCurrentRouteName";
import { useRoute } from "@hooks/useRoute";
import { Params } from "@lib/routeFactory";

export function useCurrentRoute() {
  const routes = useRoute();
  const currentRouteName = useCurrentRouteName();

  return routes[currentRouteName] as (params?: Params) => string;
}
