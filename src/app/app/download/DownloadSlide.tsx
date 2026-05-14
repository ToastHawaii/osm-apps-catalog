import { DownloadButton } from "@app/app/download/DownloadButton";
import {
  CopyleftIcon,
  Diamond02Icon,
  PlayStoreIcon,
  ShoppingBag01Icon,
  AmazonIcon,
  AppStoreIcon,
  MicrosoftIcon,
  StarAward02Icon,
  Github01Icon,
  SourceCodeSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getUserOS } from "@lib/utils/getUserOS";
import { App } from "@shared/data/App";
import { isGitHubUrl } from "@shared/utils/isGitHubUrl";
import { getAppleAppStore } from "@shared/utils/links/getAppleAppStore";
import { getAsin } from "@shared/utils/links/getAsin";
import { getFDroid } from "@shared/utils/links/getFDroid";
import { getGooglePlay } from "@shared/utils/links/getGooglePlay";
import { getHuaweiAppGallery } from "@shared/utils/links/getHuaweiAppGallery";
import { getMicrosoftStore } from "@shared/utils/links/getMicrosoftStore";
import { ReactJoin } from "@shared/utils/ReactJoin";
import { some } from "lodash";
import React from "react";
import { useTranslation, Trans } from "react-i18next";

function getUsersPlatformFirst(
  appPlatforms: string[],
  userPlatforms: string[],
) {
  return ReactJoin([
    ...appPlatforms
      .filter((p) => userPlatforms.includes(p))
      .map((p) => <strong key={p}>{p}</strong>),
    ...appPlatforms.filter((p) => !userPlatforms.includes(p)),
  ]);
}

export function DownloadSlide({ app }: { app: App }) {
  const { t } = useTranslation();

  const userOS = ["Web", getUserOS()].filter((p) => p) as string[];
  const userOSLowerCase = userOS.map((p) => p.toLowerCase());

  const links = {
    android: [
      {
        key: "f-droid",
        icon: CopyleftIcon,
        label: t("app.install.fDroid"),
        href: getFDroid(app.install.fDroidID),
      },
      {
        key: "obtainium",
        icon: Diamond02Icon,
        iconClassName: "rotate-315",
        label: t("app.install.obtainium"),
        href: app.install.obtainiumLink,
      },
      {
        key: "google-play",
        icon: PlayStoreIcon,
        label: t("app.install.googlePlay"),
        href: getGooglePlay(app.install.googlePlayID),
      },
      {
        key: "huawei-app-gallery",
        icon: ShoppingBag01Icon,
        label: t("app.install.huaweiAppGallery"),
        href: getHuaweiAppGallery(app.install.huaweiAppGalleryID),
      },
      {
        key: "asin",
        icon: AmazonIcon,
        label: t("app.install.asin"),
        href: getAsin(app.install.asin),
      },
    ],
    ios: [
      {
        key: "apple-store",
        icon: AppStoreIcon,
        label: t("app.install.appleStore"),
        href: getAppleAppStore(app.install.appleStoreID),
      },
    ],
    macos: [
      {
        key: "mac-app-store",
        icon: AppStoreIcon,
        label: t("app.install.appleStore"),
        href: getAppleAppStore(app.install.macAppStoreID),
      },
    ],
    windows: [
      {
        key: "microsoft-store",
        icon: MicrosoftIcon,
        label: t("app.install.microsoftApp"),
        href: getMicrosoftStore(app.install.microsoftAppID),
      },
    ],
  };
  type Platform = keyof typeof links;
  for (const platform in links) {
    links[platform as Platform] = links[platform as Platform].filter(
      (link) => link.href,
    );
  }

  const platformWithLinks = Object.keys(links) as Platform[];

  function getLinks(
    platform: Platform,
    variant: "default" | "outline" = "default",
  ) {
    return links[platform].map((link) => (
      <DownloadButton app={app} {...link} key={link.key} variant={variant} />
    ));
  }

  return (
    <>
      {app.website && (
        <>
          <div className="mt-6 mb-2">
            {app.platform.length === 1 && app.platform[0] === "Web" ? (
              <Trans
                i18nKey="app.download.visitWebApp"
                values={{
                  app: app.name,
                }}
                components={{
                  webapp: <strong>Web app</strong>,
                }}
              />
            ) : (
              <Trans
                i18nKey="app.download.visitWebsite"
                values={{
                  app: app.name,
                }}
                components={{
                  platforms: <>{getUsersPlatformFirst(app.platform, userOS)}</>,
                }}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <DownloadButton
              app={app}
              label={t("app.install.website")}
              href={app.website}
            />
          </div>
        </>
      )}

      {platformWithLinks
        .filter((p) => userOSLowerCase.includes(p) && links[p].length > 0)
        .map((platform) => (
          <>
            <h3 className="mt-6 mb-2 font-semibold">
              {t(`app.download.${platform}`)}
              <span className="text-green-500">
                <HugeiconsIcon
                  icon={StarAward02Icon}
                  className="inline-block"
                  strokeWidth={2}
                />{" "}
                {t("app.download.forYourDevice")}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">{getLinks(platform)}</div>
          </>
        ))}

      {platformWithLinks
        .filter((p) => !userOSLowerCase.includes(p) && links[p].length > 0)
        .map((platform) => (
          <>
            <h3 className="mt-6 mb-2 font-semibold">
              {t(`app.download.${platform}`)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {getLinks(platform, "outline")}
            </div>
          </>
        ))}

      {!app.website && !some(app.install) && app.sourceCode && (
        <>
          <div className="mt-6 mb-2">
            <Trans
              i18nKey="app.download.fromCodeRepository"
              values={{
                app: app.name,
              }}
              components={{
                platforms: <>{getUsersPlatformFirst(app.platform, userOS)}</>,
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <DownloadButton
              app={app}
              icon={
                isGitHubUrl(app.sourceCode)
                  ? Github01Icon
                  : SourceCodeSquareIcon
              }
              label={t("app.sourceCode")}
              href={app.sourceCode}
            />
          </div>
        </>
      )}
    </>
  );
}
