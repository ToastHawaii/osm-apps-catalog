import { useIsTechDomain } from "@hooks/useIsTechDomain";
import { routeFactory } from "@lib/routeFactory";

export function useRoute() {
  const isTechView = useIsTechDomain();

  return routeFactory(isTechView ? "tech" : undefined);
}
