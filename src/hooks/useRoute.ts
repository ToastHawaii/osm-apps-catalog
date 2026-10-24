import { useIsTechDomain } from "@hooks/useIsTechDomain";
import { routeFactory } from "@lib/routeFactory";
import { useTranslation } from "react-i18next";

export function useRoute() {
  const isTechView = useIsTechDomain();
  const { i18n } = useTranslation();

  return routeFactory(
    isTechView ? "tech" : undefined,
    i18n.resolvedLanguage?.toLowerCase(),
  );
}
