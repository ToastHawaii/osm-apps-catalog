import { uniq } from "lodash";

import { set, get } from "@lib/utils/storage";

export function useRecentlyViewed() {
  const apps: number[] = get("RecentlyViewed") || [];

  function push(id: number) {
    set("RecentlyViewed", uniq([id, ...apps]));
  }

  return [apps, push] as const;
}
