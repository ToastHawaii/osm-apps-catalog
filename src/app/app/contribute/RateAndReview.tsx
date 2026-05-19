import {
  AmazonIcon,
  AppStoreIcon,
  Github01Icon,
  GitlabIcon,
  MountainIcon,
  PlayStoreIcon,
  ShoppingBag01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";
import React, { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Activity } from "@app/app/contribute/Activity";
import { App } from "@shared/data/App";
import { getAppleAppStore } from "@shared/utils/links/getAppleAppStore";
import { getAsin } from "@shared/utils/links/getAsin";
import { getGooglePlay } from "@shared/utils/links/getGooglePlay";
import { getHuaweiAppGallery } from "@shared/utils/links/getHuaweiAppGallery";

export function RateAndReview({ app }: { app: App }) {
  const { t } = useTranslation();

  const links: {
    icon: IconSvgElement | ReactElement;
    href: string;
    title: ReactNode;
    goatcounter?: {
      click: string;
      title: string;
    };
  }[] = [];

  {
    const link = getGooglePlay(app.install.googlePlayID);
    if (link) {
      links.push({
        icon: PlayStoreIcon,
        title: t("app.contribute.activity.rateAndReview.googlePlay"),
        href: link,
      });
    }
  }
  {
    const link = getAppleAppStore(
      app.install.appleStoreID || app.install.macAppStoreID,
    );
    if (link) {
      links.push({
        icon: AppStoreIcon,
        title: t("app.contribute.activity.rateAndReview.appleAppStore"),
        href: link,
      });
    }
  }
  {
    const link = getHuaweiAppGallery(app.install.huaweiAppGalleryID);
    if (link) {
      links.push({
        icon: ShoppingBag01Icon,
        title: t("app.contribute.activity.rateAndReview.huaweiAppGallery"),
        href: link,
      });
    }
  }
  {
    const link = getAsin(app.install.asin);
    if (link) {
      links.push({
        icon: AmazonIcon,
        title: t("app.contribute.activity.rateAndReview.asin"),
        href: link,
      });
    }
  }
  {
    const link = app.sourceCode;
    if (link) {
      switch (new URL(link).hostname) {
        case "codeberg.org":
        case "www.codeberg.org":
          links.push({
            icon: MountainIcon,
            title: t("app.contribute.activity.rateAndReview.codeberg"),
            href: link,
          });
          break;
        case "gitlab.com":
        case "www.gitlab.com":
          links.push({
            icon: GitlabIcon,
            title: t("app.contribute.activity.rateAndReview.gitlab"),
            href: link,
          });
          break;
        case "github.com":
        case "www.github.com":
          links.push({
            icon: Github01Icon,
            title: t("app.contribute.activity.rateAndReview.github"),
            href: link,
          });
          break;
      }
    }
  }

  links.forEach((link) => {
    link.goatcounter = {
      click: "/app/rate",
      title: "Follows a rate and review link of an app.",
    };
  });

  return (
    <Activity
      title={t("app.contribute.activity.rateAndReview.title")}
      description={t("app.contribute.activity.rateAndReview.description", {
        app: app.name,
      })}
      icon={StarIcon}
      hint={t("app.contribute.activity.rateAndReview.hint")}
      links={links}
    />
  );
}
