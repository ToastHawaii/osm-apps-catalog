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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@components/ui/item";
import { App } from "@shared/data/App";
import { Activity } from "@app/app/contribute/Activity";
import {
  ArrowDown01Icon,
  Download01Icon,
  FavouriteCircleIcon,
  Link02Icon,
} from "@hugeicons/core-free-icons";
import { DrawerDialog } from "@components/common/DrawerDialog";
import { DownloadSlide } from "@app/app/download/DownloadSlide";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAppsFundingData } from "@hooks/useAppsFundingData";

export function Contribute({ app }: { app: App }) {
  const { t } = useTranslation();

  const {fundings} = useAppsFundingData()

  return (
    <>
      <div className="-mx-4 mb-5 grid gap-1 sm:grid-cols-2">
        <DrawerDialog
          size="lg"
          trigger={
            <Item size="xs" className="bg-primary text-white">
              <ItemMedia variant="image">
                <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  {t("app.contribute.activity.getIt.title")}
                </ItemTitle>
                <ItemDescription className="h-10 text-white">
                  {t("app.contribute.activity.getIt.description", {
                    app: app.name,
                  })}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  className="inline-block"
                  strokeWidth={2}
                />
              </ItemActions>
            </Item>
          }
          title={app.name}
          description={t("app.download.downloadSlide.description")}
        >
          <DownloadSlide app={app} />
        </DrawerDialog>

        <Activity
          title={
            <span className="text-pink-600">
              {t("app.contribute.activity.donate.title")}
            </span>
          }
          description={
            <span className="text-pink-600">
              {t("app.contribute.activity.donate.description", {
                app: app.name,
              })}
            </span>
          }
          icon={
            <HugeiconsIcon
              icon={FavouriteCircleIcon}
              className="inline-block text-pink-600"
              strokeWidth={2}
            />
          }
          hint={t("app.contribute.activity.donate.hint")}
          links={app.hasFunding?
            fundings.find(f => f.appId === app.id)?.links.map((f) => ({
              icon: Link02Icon,
              href: f.url,
              title: f.url,
            })) || []:[]
          }
        />
      </div>
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
    </>
  );
}
