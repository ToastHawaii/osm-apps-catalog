import { languageCodeToDisplay } from "@app/ui/lib/language";
import { UserContext } from "@hooks/useUserContext";
import { scoreAppForUser } from "@lib/apps/scoreAppForUser";
import { App } from "@shared/data/App";
import { uniq, toUpper } from "lodash";

export function sortApps(apps: App[], userContext: UserContext) {
  // After sort by score: prefer apps that match the user's context.
  const userLangs = userContext.languages.map((l) => languageCodeToDisplay(l));
  const languages =
    userLangs.length > 0
      ? uniq([languageCodeToDisplay("mul"), ...userLangs])
      : [];
  const languagesUp = uniq(languages).map(toUpper);

  const userRegion = userContext.region;
  const coverage = userRegion ? uniq(["Worldwide", userRegion]) : [];
  const coverageUp = coverage.map(toUpper);

  if (languagesUp.length > 0 || coverageUp.length > 0) {
    apps = [...apps].sort(
      (a, b) =>
        // desc
        scoreAppForUser(b, languagesUp, coverageUp) -
        scoreAppForUser(a, languagesUp, coverageUp),
    );
  }
  return apps;
}
