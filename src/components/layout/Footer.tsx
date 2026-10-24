import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ThemeModeToggle } from "@components/layout/ThemeModeToggle";
import { LanguageSelect } from "@components/layout/LanguageSelect";
import { ExternalLinkIcon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRoute } from "@hooks/useRoute";
import { useAppsData } from "@hooks/useAppsData";

export function Footer() {
  const { t } = useTranslation();
  const routes = useRoute();

  const { apps } = useAppsData();

  if (apps.length === 0) {
    return null;
  }

  return (
    <>
      <Separator />

      <div className="mx-auto max-w-7xl px-8 py-2 md:px-18 md:py-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
          <div className="flex items-center gap-2">
            <LanguageSelect />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/ToastHawaii/osm-apps-catalog"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.github")}
              >
                <HugeiconsIcon
                  icon={GithubIcon}
                  className="size-5"
                  strokeWidth={2}
                />
                <span className="ml-2 hidden sm:inline">
                  {t("footer.github")}
                </span>
                <HugeiconsIcon
                  className="hidden sm:inline"
                  icon={ExternalLinkIcon}
                  strokeWidth={2}
                />
              </a>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <a href={routes.docs.privacy()}>{t("footer.privacy")}</a>
            </Button>

            <ThemeModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
