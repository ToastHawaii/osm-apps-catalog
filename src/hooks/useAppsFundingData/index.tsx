import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";

import { useTranslation } from "react-i18next";
import { useUserContext } from "@hooks/useUserContext";
import { Funding } from "@actions/lib/getValidatedFundings";
import { fetchFundings } from "@hooks/useAppsFundingData/fetchFundings";

function useAppsFundingDataInternal() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const userContext = useUserContext();

  const [fundings, setFundings] = useState<Funding[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const fundings = await fetchFundings();

      if (!cancelled) {
        setFundings(fundings);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lang, JSON.stringify(userContext.languages), userContext.region]);

  return { fundings };
}

const AppsFundingStateContext = createContext<{
  fundings: Funding[];
} | null>(null);

export function AppsFundingStateProvider({ children }: PropsWithChildren) {
  const { fundings } = useAppsFundingDataInternal();

  const appState = useMemo(() => ({ fundings }), [fundings]);

  return (
    <AppsFundingStateContext.Provider value={appState}>
      {children}
    </AppsFundingStateContext.Provider>
  );
}

export function useAppsFundingData() {
  const ctx = useContext(AppsFundingStateContext);
  if (!ctx) throw new Error("useAppsFundingState outside provider");
  return ctx;
}
