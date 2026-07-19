import { Funding } from "@actions/lib/getValidatedFundings";
import { App } from "@shared/data/App";

export function extractFunding(apps: App[], validatedFundings: Funding[]) {
  const newFundings = apps
    .filter((a) => a.funding?.length)
    .map((a) => ({
      appId: a.id,
      links: a.funding?.map(({ url, source }) => ({
        url,
        source,
        verified: !!validatedFundings
          .find((v) => a.id === v.appId)
          ?.links.some((l) => l.url === url && l.verified),
      })),
    }));

  const newApps = apps.map((a) => ({
    ...a,
    funding: undefined,
    hasFunding: !!newFundings
      .find((f) => f.appId === a.id)
      ?.links?.some((l) => l.verified),
  }));

  return { apps: newApps, fundings: newFundings };
}
