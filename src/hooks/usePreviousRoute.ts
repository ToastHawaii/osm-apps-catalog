import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function usePreviousRoute() {
  const location = useLocation();
  const prev = useRef<string | undefined>(undefined);

  useEffect(() => {
    prev.current = location.pathname;
  }, [location]);

  return prev.current;
}
