import React from "react";
import { App } from "@shared/data/App";
import { useTranslation } from "react-i18next";
import { calculateScore, Criterias } from "@shared/data/calculateScore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useRoute } from "@hooks/useRoute";
import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";

function Category({
  category,
  text,
  details,
}: {
  category: (typeof Criterias)[number]["category"];
  text?: string | undefined;
  details: NonNullable<App["cache"]["score"]>["details"];
}) {
  const { t } = useTranslation();

  details = details.filter((d) =>
    Criterias.some(
      (c) => c.category === category && d.translationKey === c.translationKey,
    ),
  );

  if (details.length === 0) {
    return null;
  }

  return (
    <>
      <h4 className="mt-3 font-semibold">
        {t(`score.category.${category}.title`)}
      </h4>
      {!!text && <p className="mb-1 text-muted-foreground">{text}</p>}
      <ul className="ms-5 list-disc">
        {details.map((d) => (
          <li key={d.translationKey}>
            {t("score.result", {
              description: t(`score.criteria.${d.translationKey}`),
              points: d.points,
            })}
          </li>
        ))}
      </ul>
    </>
  );
}

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

  const hasWikiSource = app.source.some(
    (s) => s.name === "Software" || s.name === "Layer" || s.name === "Wikidata",
  );

  const fulfilled = score.details.filter((d) => d.fulfilled);
  const notFulfilled = score.details.filter((d) => !d.fulfilled);

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
            <h4 className="text-xl font-semibold">{t("score.title")}</h4>
            <p className="mb-3">
              {t("score.total", {
                total: score.total,
              })}
            </p>

            {hasWikiSource && score.total < 2 && (
              <p className="mb-3">
                {t("score.hint.below2", { app: app.name })}
              </p>
            )}
            {!hasWikiSource && score.total < 4 && (
              <p className="mb-3">
                {t("score.hint.below4AndNoneWikiEntry", { app: app.name })}
              </p>
            )}
            {!app.libre && score.total >= 4 && (
              <p className="mb-3">
                {t("score.hint.proprietary", { app: app.name })}
              </p>
            )}
            {!!app.libre && score.total >= 6 && (
              <p className="mb-3">{t("score.hint.libre", { app: app.name })}</p>
            )}

            {notFulfilled.length > 0 && (
              <>
                <h5 className="mb-3 text-lg font-semibold">
                  {t("score.actionsRequired")}
                </h5>
                <Category
                  category="osmParticipation"
                  details={notFulfilled}
                  text={t("score.category.osmParticipation.hint")}
                />
                <Category
                  category="developmentParticipation"
                  details={notFulfilled}
                  text={t("score.category.developmentParticipation.hint")}
                />
                <Category
                  category="availabilityAccessibility"
                  details={notFulfilled}
                  text={t("score.category.availabilityAccessibility.hint")}
                />
                <Category
                  category="communityChannelsDocumentation"
                  details={notFulfilled}
                  text={t("score.category.communityChannelsDocumentation.hint")}
                />
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

            {fulfilled.length > 0 && (
              <>
                <h5 className="mb-3 text-lg font-semibold">
                  {t("score.fulfilled")}
                </h5>
                <Category category="osmParticipation" details={fulfilled} />
                <Category
                  category="developmentParticipation"
                  details={fulfilled}
                />
                <Category
                  category="availabilityAccessibility"
                  details={fulfilled}
                />
                <Category
                  category="communityChannelsDocumentation"
                  details={fulfilled}
                />
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
