import { getStats } from "@actions/lib/getStats";
import { App } from "@shared/data/App";

export async function enrichStats(apps: App[]) {
  const stats = await getStats();

  stats.forEach((s) => {
    const app = apps.find((app) => app.id === s.app);

    if (app) {
      // one app can be multiple times in the stats one for direct link and one
      // for exploring the catalog
      app.views = (app.views || 0) + s.count;
    }
  });
}
