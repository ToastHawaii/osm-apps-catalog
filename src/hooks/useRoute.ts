import { useIsTechDomain } from "@hooks/useIsTechDomain";
import { routeFactory } from "@lib/routeFactory";

export function useRoute() {
  const isTech = useIsTechDomain();

  return routeFactory(isTech ? "tech" : undefined);
}
