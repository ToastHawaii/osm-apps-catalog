import React from "react";
import { App } from "@shared/data/App";
import { useTranslation } from "react-i18next";
import { calculateScore } from "@shared/data/calculateScore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useRoute } from "@hooks/useRoute";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";

export function Score({
  app,
  position = "left",
  className,
}: {
  app: App;
  position?: "left" | "right";
  className?: string | undefined;
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

  if (position === "left") {
    className += " corner-badge-left";
  } else if (position === "right") {
    className +=
      " absolute top-2 right-0 md:rounded-tr-lg rounded-bl-sm px-1 py-0.5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className={cn(
            "p-0 font-bold text-white! transition-all hover:brightness-120",
            className,
          )}
          style={{ backgroundColor: color }}
        >
          {label}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="max-h-[60vh] w-150 max-w-[90vw]! overflow-y-auto"
        >
          <div>
            <h5 className="text-lg font-semibold">{t("score.title")}</h5>
            <p className="mb-3">
              {t("score.total", {
                total: score.total,
              })}
            </p>

            {score.details.some((d) => !d.fulfilled) && (
              <>
                <h6 className="font-semibold">{t("score.actionsRequired")}</h6>
                <ul className="ms-5 list-disc">
                  {score.details
                    .filter((d) => !d.fulfilled)
                    .map((e) => (
                      <li key={e.translationKey}>
                        {t("score.result", {
                          description: t("score.criteria." + e.translationKey),
                          points: e.points,
                        })}
                      </li>
                    ))}
                </ul>
              </>
            )}

            <Button asChild>
              <a className="my-6 block" href={routes.docs.score()}>
                {t("score.learnMore")}
              </a>
            </Button>

            <p className="mb-3">
              {t("score.isSomethingWrong", {
                editInformationTitle: t(
                  "app.contribute.activity.editInformation.title",
                ),
              })}
            </p>

            {score.details.some((d) => d.fulfilled) && (
              <>
                <h6 className="font-semibold">{t("score.fulfilled")}</h6>
                <ul className="ms-5 mb-3 list-disc">
                  {score.details
                    .filter((d) => d.fulfilled)
                    .map((e) => (
                      <li key={e.translationKey}>
                        {t("score.result", {
                          description: t("score.criteria." + e.translationKey),
                          points: e.points,
                        })}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
