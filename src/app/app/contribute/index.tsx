import React from "react";
import { useTranslation } from "react-i18next";

import { Connect } from "@app/app/contribute/Connect";
import { ContributeCode } from "@app/app/contribute/ContributeCode";
import { ContributeMapData } from "@app/app/contribute/ContributeMapData";
import { ContributeTranslation } from "@app/app/contribute/ContributeTranslation";
import { EditInformation } from "@app/app/contribute/EditInformation";
import { RateAndReview } from "@app/app/contribute/RateAndReview";
import { ReportBugs } from "@app/app/contribute/ReportBugs";
import { Share } from "@app/app/contribute/Share";
import { ItemGroup } from "@components/ui/item";
import { App } from "@shared/data/App";

export function Contribute({ app }: { app: App }) {
  const { t } = useTranslation();

  return (
    <div className="-mx-4 grid gap-1 sm:grid-cols-2">
      <ItemGroup>
        <span className="px-4 font-medium text-muted-foreground">
          {t("app.contribute.community")}
        </span>
        <RateAndReview app={app} />
        <Share app={app} />
        <Connect app={app} />
        <EditInformation app={app} />
      </ItemGroup>
      <ItemGroup>
        <span className="px-4 font-medium text-muted-foreground">
          {t("app.contribute.appDevelopment")}
        </span>
        <ReportBugs app={app} />
        <ContributeTranslation app={app} />
        <ContributeCode app={app} />
        <ContributeMapData app={app} />
      </ItemGroup>
    </div>
  );
}
