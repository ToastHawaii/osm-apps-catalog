import { App } from "@shared/data/App";
import { calculateScore } from "@shared/data/calculateScore";

export function enrichScoreTotal(apps: App[]) {
  apps.forEach((a) => {
    a.score = calculateScore(a).total;
  });
}
