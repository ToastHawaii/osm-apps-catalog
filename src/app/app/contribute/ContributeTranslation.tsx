import { TranslateIcon } from "@hugeicons/core-free-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";

export function ContributeTranslation({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.contributeTranslation.title")}
      description={t(
        "app.contribute.activity.contributeTranslation.description",
        { app: app.name },
      )}
      icon={TranslateIcon}
      link={app.languagesUrl}
      hint={t("app.contribute.activity.contributeTranslation.hint")}
    />
  );
}
