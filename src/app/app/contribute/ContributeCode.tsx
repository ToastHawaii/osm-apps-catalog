import { SourceCodeIcon } from "@hugeicons/core-free-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";

export function ContributeCode({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.contributeCode.title")}
      description={t("app.contribute.activity.contributeCode.description")}
      icon={SourceCodeIcon}
      link={app.sourceCode}
      hint={t("app.contribute.activity.contributeCode.hint")}
    />
  );
}
