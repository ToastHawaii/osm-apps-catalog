import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";

import { App } from "@shared/data/App";
import { isDevelopment } from "@shared/utils/isDevelopment";
import { useTranslation } from "react-i18next";
import { useUserContext } from "@hooks/useUserContext";
import { fetchApps } from "@hooks/useAppsData/fetchApps";
import { fetchTranslations } from "@hooks/useAppsData/fetchTranslations";
import { processApps } from "@hooks/useAppsData/processApps";
import { applyTranslations } from "@hooks/useAppsData/applyTranslations";
import { sortApps } from "@hooks/useAppsData/sortApps";

function useAppsDataInternal() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const userContext = useUserContext();

  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const appsQuery = fetchApps();
      const translationsQuery = fetchTranslations(lang);

      const rawApps = await appsQuery;

      if (cancelled) return;

      let processedApps = processApps(rawApps);

      const translationsLists = await Promise.all(translationsQuery);

      if (cancelled) return;

      processedApps = applyTranslations(processedApps, translationsLists);

      processedApps = sortApps(processedApps, userContext);

      if (!cancelled) {
        setApps(processedApps);
      }

      if (isDevelopment) {
        // printCalcScore(processedApps);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lang, JSON.stringify(userContext.languages), userContext.region]);

  return { apps };
}

const AppStateContext = createContext<{
  apps: App[];
} | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const { apps } = useAppsDataInternal();

  const appState = useMemo(() => ({ apps }), [apps]);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppsData() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState outside provider");
  return ctx;
}
