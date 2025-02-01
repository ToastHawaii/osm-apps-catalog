import { App as AppData } from "./App";
import { calculateScore } from "./calculateScore";

export function prepareScore(apps: AppData[]) {
  apps
    .filter((app) => !app.score.details)
    .forEach((app) => {
      app.score = calculateScore(app);
    });
}
