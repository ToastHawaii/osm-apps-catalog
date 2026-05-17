import { Activity } from "@app/app/contribute/Activity";
import { MessageMultiple02Icon } from "@hugeicons/core-free-icons";
import { App } from "@shared/data/App";
import React from "react";
import { useTranslation } from "react-i18next";

export function ReportBugs({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <Activity
      title={t("app.contribute.activity.reportBugs.title")}
      description={t("app.contribute.activity.reportBugs.description", {
        app: app.name,
      })}
      icon={MessageMultiple02Icon}
      link={app.community.issueTracker}
      hint={t("app.contribute.activity.reportBugs.hint")}
    />
  );
}
