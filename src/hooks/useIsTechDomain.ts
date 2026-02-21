import { useMemo } from "react";
import { useSearchParams } from "react-router";

export function useIsTechDomain() {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    return searchParams.get("domain") === "tech";
  }, [searchParams]);
}
