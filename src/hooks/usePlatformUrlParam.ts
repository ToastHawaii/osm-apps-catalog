import { useSearchParams } from "react-router";

import { getUserOS } from "@lib/utils/getUserOS";
import { useMemo } from "react";

export function usePlatformUrlParam() {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    let platforms: string[];
    if (searchParams.has("platforms")) {
      // when platforms search param is set use it even if it is empty
      const platformParam = searchParams.get("platforms");
      platforms =
        platformParam && platformParam.length > 0
          ? platformParam.split("+")
          : [];
    } else {
      // else try detect users platform
      const userPlatform = getUserOS();
      platforms = userPlatform ? ["web", userPlatform] : [];
    }

    platforms = platforms.map((t) => t.toUpperCase());
    return platforms;
  }, [searchParams]);
}
