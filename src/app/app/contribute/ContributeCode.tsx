import { SourceCodeIcon } from "@hugeicons/core-free-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";
import { getHostIcon } from "@shared/utils/url";

export function ContributeCode({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.contributeCode.title")}
      description={t("app.contribute.activity.contributeCode.description")}
      icon={getHostIcon(app.sourceCode, SourceCodeIcon)}
      link={app.sourceCode}
      hint={t("app.contribute.activity.contributeCode.hint")}
      goatcounter={{
        click: "/app/source-code",
        title: "Goes to source code of an app.",
      }}
    />
  );
}
