import {
  Github01Icon,
  GitlabIcon,
  MountainIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";

function getIcon(app: App) {
  const link = app.sourceCode;
  if (link) {
    switch (new URL(link).hostname) {
      case "codeberg.org":
      case "www.codeberg.org":
        return MountainIcon;
      case "gitlab.com":
      case "www.gitlab.com":
        return GitlabIcon;
      case "github.com":
      case "www.github.com":
        return Github01Icon;
    }
  }
  return SourceCodeIcon;
}

export function ContributeCode({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.contributeCode.title")}
      description={t("app.contribute.activity.contributeCode.description")}
      icon={getIcon(app)}
      link={app.sourceCode}
      hint={t("app.contribute.activity.contributeCode.hint")}
      goatcounter={{
        click: "/app/source-code",
        title: "Goes to source code of an app.",
      }}
    />
  );
}
