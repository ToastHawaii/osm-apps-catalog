import React from "react";
import { App } from "@shared/data/App";
import { Trans, useTranslation } from "react-i18next";
import { calculateScore } from "@shared/data/calculateScore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useRoute } from "@hooks/useRoute";
import { Button } from "@components/ui/button";

export function Score({
  app,
  position = "left",
}: {
  app: App;
  position?: "left" | "right";
}) {
  const { t } = useTranslation();
  const routes = useRoute();

  if (!app.cache.score) {
    app.cache.score = calculateScore(app);
  }
  const score = app.cache.score;

  let label;
  let color;
  if (score.total >= 8) {
    label = "A";
    color = "rgb(30 143 78)";
  } else if (score.total >= 6) {
    label = "B";
    color = "rgb(96 172 48)";
  } else if (score.total >= 4) {
    label = "C";
    color = "rgb(238 174 14)";
  } else if (score.total >= 2) {
    label = "D";
    color = "rgb(255 111 30)";
  } else {
    label = "E";
    color = "rgb(222 32 31)";
  }

  let className = "";
  if (position === "left") {
    className = "corner-badge-left";
  } else if (position === "right") {
    className =
      "absolute top-2 right-2 rounded-tr-lg rounded-bl-sm px-1 py-0.5";
  }

  return (
    <div className={className} style={{ backgroundColor: color }}>
      <Popover>
        <PopoverTrigger className="p-0 font-bold text-white!">
          {label}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="max-h-[60vh] w-150 max-w-[90vw]! overflow-y-auto whitespace-pre-line"
        >
          <Trans
            i18nKey="score.results"
            values={{
              total: score.total,
              fulfilled: score.details
                .filter((d) => d.fulfilled)
                .map((e) =>
                  t("score.result", {
                    description: t("score.criteria." + e.translationKey),
                    points: e.points,
                  }),
                )
                .join("\n"),
              notFulfilled: score.details
                .filter((d) => !d.fulfilled)
                .map((e) =>
                  t("score.result", {
                    description: t("score.criteria." + e.translationKey),
                    points: e.points,
                  }),
                )
                .join("\n"),
              editInformationTitle: t(
                "app.contribute.activity.editInformation.title",
              ),
            }}
            components={{
              LearnMoreButton: (
                <Button asChild>
                  <a href={routes.docsScore()}>{t("score.learnMore")}</a>
                </Button>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
