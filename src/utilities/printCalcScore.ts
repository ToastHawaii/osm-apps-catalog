import { sum } from "lodash";
import { App } from "../data/App";


export function printCalcScore(apps: App[]) {
  const average = sum(apps.map((a) => a.score.total)) / apps.length;
  console.info("Average");
  console.info("18.24.2024: 1.970");
  console.info("23.24.2024: 1.980");
  console.info("25.24.2024: 1.999");
  console.info("04.01.2025: 2.000");
  console.info("10.01.2025: 2.008");
  console.info("New score calculation");
  console.info("11.01.2025: 2.147");
  console.info("Today: " + average);
}
