import { sum } from "lodash";
import { App } from "../../shared/data/App";
import { prepareArrayForSelect } from "./prepareArrayForSelect";

export function printCalcScore(apps: App[]) {
  const average = sum(apps.map((a) => a.score)) / apps.length;
  console.info("Average");
  console.info("18.24.2024: 1.970");
  console.info("23.24.2024: 1.980");
  console.info("25.24.2024: 1.999");
  console.info("04.01.2025: 2.000");
  console.info("10.01.2025: 2.008");
  console.info("New score calculation");
  console.info("11.01.2025: 2.147");
  console.info("31.01.2025: 2.160");
  console.info("01.02.2025: 2.165");
  console.info("08.02.2025: 2.360 (1058 Apps)");
  console.info("14.02.2025: 2.372 (1055 Apps)");
  console.info("22.02.2025: 2.386 (1052 Apps)");
  console.info("15.03.2025: 2.391 (1061 Apps)");
  console.info("Added GitHub as source");
  console.info("15.03.2025: 2.049 (1919 Apps)");
  console.info("22.03.2025: 2.025 (1995 Apps)");
  console.info("31.03.2025: 2.050 (1964 Apps)");
  console.info("16.04.2025: 2.081 (1973 Apps)");
  console.info("01.05.2025: 2.088 (1972 Apps)");
  console.info("Switch to GitHubs GraphQL and filter all libraries");
  console.info("17.05.2025: 2.142 (1911 Apps)");
  console.info("Today: " + average);

  console.info("---");

  console.info("Topics");
  const preparedData = prepareArrayForSelect(
    apps.flatMap((app) => app.topics.map((v) => v)),
    []
  );
  console.info(preparedData.map((d) => d.value).join("\n"));
}
