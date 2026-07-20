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
  Github01Icon,
  KoFiIcon,
  Link02Icon,
  PaypalIcon,
  PieChart06Icon,
} from "@hugeicons/core-free-icons";
import { DrawerDialog } from "@components/common/DrawerDialog";
import { DownloadSlide } from "@app/app/download/DownloadSlide";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAppsFundingData } from "@hooks/useAppsFundingData";
import { newUrl } from "@shared/utils/url";
import { trimStart, trimEnd } from "lodash";

export function Contribute({ app }: { app: App }) {
  const { t } = useTranslation();

  const { fundings } = useAppsFundingData();

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
          links={
            app.hasFunding
              ? fundings
                  .find((f) => f.appId === app.id)
                  ?.links.map((f) => {
                    const url = newUrl(f.url);
                    const urlDisplay =
                      trimStart(url.hostname, "www.") +
                      trimEnd(url.pathname, "/") +
                      url.search;

                    let icon;
                    switch (url.hostname.toLowerCase()) {
                      case "opencollective.com":
                        icon = (
                          <HugeiconsIcon
                            icon={PieChart06Icon}
                            className="inline-block rotate-225"
                            strokeWidth={2}
                            size={19.25}
                            style={{ width: 19.25, height: 19.25 }}
                          />
                        );
                        break;

                      case "github.com":
                        icon = Github01Icon;
                        break;

                      case "paypal.com":
                      case "paypal.me":
                        icon = PaypalIcon;
                        break;

                      case "ko-fi.com":
                        icon = KoFiIcon;
                        break;

                      default:
                        icon = Link02Icon;
                        break;
                    }

                    return {
                      icon: icon,
                      href: f.url,
                      title: urlDisplay,
                    };
                  }) || []
              : []
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
