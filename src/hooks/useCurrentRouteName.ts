import { useRoute } from "@hooks/useRoute";
import { useSearchParams } from "react-router";

export function useCurrentRouteName() {
  const routes = useRoute();

  const [searchParams] = useSearchParams();
  const currentRouteName = searchParams.get("view") || "home";

  if (!currentRouteName || !(currentRouteName in routes)) {
    return undefined;
  }

  return currentRouteName as keyof typeof routes;
}
