import { App } from "@shared/data/App";
import { some } from "@shared/utils/array";

function matchesLanguage(app: App, languagesUp: string[]) {
  return some(app.cache.languages, languagesUp);
}

function matchesCoverage(app: App, coverageUp: string[]) {
  return (
    app.cache.coverage.some((a) =>
      coverageUp.some((c) => a.startsWith(c) || c.startsWith(a)),
    ) || app.coverage.length === 0
  );
}

export function scoreAppForUser(
  app: App,
  languagesUp: string[],
  coverageUp: string[],
) {
  let score = 0;

  const langMatch = matchesLanguage(app, languagesUp);
  const coverageMatch = matchesCoverage(app, coverageUp);

  if (langMatch) score += 1;
  if (coverageMatch) score += 2;

  return score;
}
