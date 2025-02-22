import React from "react";
import { App } from "../../data/App";
import { useTranslation } from "react-i18next";
import { calculateScore } from "../../data/calculateScore";

export function Score({ app }: { app: App }) {
  const { t } = useTranslation();

  if (!app.cache.score) {
    app.cache.score = calculateScore(app);
  }
  const score = app.cache.score;

  let label;
  if (score.total >= 8) {
    label = "A";
  } else if (score.total >= 6) {
    label = "B";
  } else if (score.total >= 4) {
    label = "C";
  } else if (score.total >= 2) {
    label = "D";
  } else {
    label = "E";
  }

  let color;
  if (score.total >= 8) {
    color = "bg-dark-green";
  } else if (score.total >= 6) {
    color = "bg-green";
  } else if (score.total >= 4) {
    color = "bg-yellow";
  } else if (score.total >= 2) {
    color = "bg-orange";
  } else {
    color = "bg-red";
  }

  const resultDisplay = t("score.results", {
    total: score.total,
    fulfilled: score.details
      .filter((d) => d.fulfilled)
      .map((e) =>
        t("score.result", {
          description: t("score.criteria." + e.translationKey),
          points: e.points,
        })
      )
      .join("\n"),
    notFulfilled: score.details
      .filter((d) => !d.fulfilled)
      .map((e) =>
        t("score.result", {
          description: t("score.criteria." + e.translationKey),
          points: e.points,
        })
      )
      .join("\n"),
  });

  return (
    <div className={`corner-badge-left ${color}`} title={resultDisplay}>
      <a href="/docs/score">{label}</a>
    </div>
  );
}
