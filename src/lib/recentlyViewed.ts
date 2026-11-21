import { uniq } from "lodash";

import { set, get } from "@lib/utils/storage";

export function getRecentlyViewed(): number[] {
  return get("RecentlyViewed") || [];
}

export function pushRecentlyViewed(id: number) {
  const apps = getRecentlyViewed();
  set("RecentlyViewed", uniq([id, ...apps]));
}
