import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDown01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { languageCodeToDisplay } from "@app/ui/lib/language";
import { useUserContext } from "@hooks/useUserContext";
import { App } from "@shared/data/App";
import { equalsIgnoreCase, findIgnoreCase } from "@shared/utils/string";

import { ExternalLink } from "@components/common/ExternalLink";
import { Button } from "@components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Popover,
} from "@components/ui/popover";

function isWeblateUrl(urlString: string) {
  const url = new URL(urlString);

  return ["hosted.weblate.org"].includes(url.hostname.toLowerCase());
}

function convertToWeblateBadgeUrl(url: string) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split("/").filter(Boolean);

  if (pathParts.length >= 2 && pathParts[0] === "projects") {
    const project = pathParts[1];
    const subProject = pathParts.length >= 3 ? pathParts[2] : undefined;

    if (subProject) {
      return `https://hosted.weblate.org/widget/${project}/${subProject}/svg-badge.svg?capitalize=1`;
    }
    return `https://hosted.weblate.org/widget/${project}/svg-badge.svg?capitalize=1`;
  }

  if (pathParts.length >= 1 && pathParts[0] === "engage") {
    const project = pathParts[1];
    return `https://hosted.weblate.org/widget/${project}/svg-badge.svg?capitalize=1`;
  }

  return undefined;
}

function WeblateBadge({ url }: { url: string }) {
  const { t } = useTranslation();

  const badgeUrl = convertToWeblateBadgeUrl(url);

  if (!badgeUrl) {
    return null;
  }

  return (
    <img
      className="inline"
      src={badgeUrl}
      alt={t("footer.languageSelectTranslationBadgeAlt")}
    />
  );
}

function TranslationContribute({
  languagesUrl,
  userLanguage,
}: {
  languagesUrl: string;
  userLanguage: string;
}) {
  const { t } = useTranslation();

  return (
    <>
      {isWeblateUrl(languagesUrl) && (
        <a
          href={languagesUrl}
          data-goatcounter-click="/app/translation-contribution"
          data-goatcounter-title="Goes to the translation contribution page of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
        >
          <WeblateBadge url={languagesUrl} />
        </a>
      )}
      <span className="inline-flex items-center gap-1">
        <ExternalLink
          href={languagesUrl}
          data-goatcounter-click="/app/translation-contribution"
          data-goatcounter-title="Goes to the translation contribution page of an app."
          data-goatcounter-referrer="https://osm-apps.org/"
          icon
        >
          {!userLanguage && equalsIgnoreCase(userLanguage, "en")
            ? t("app.helpTranslate")
            : t("app.helpTranslateTo")}
        </ExternalLink>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="p-1"
              size="xs"
              title={t("app.helpTranslate.hint.label")}
            >
              <HugeiconsIcon
                className="size-4"
                icon={InformationCircleIcon}
                aria-label={t("app.helpTranslate.hint.label")}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-60 whitespace-pre-line">
            {t("app.helpTranslate.hint.text")}
          </PopoverContent>
        </Popover>
      </span>
    </>
  );
}

export function LanguageDisplay({ app }: { app: App }) {
  const { t } = useTranslation();
  const userContext = useUserContext();
  const userLanguages = userContext.languages.map((l) =>
    languageCodeToDisplay(l),
  );

  const multilingualDisplay = languageCodeToDisplay("mul");
  const isMultilingual =
    app.languages.some(
      (l) => l.toUpperCase() === multilingualDisplay.toUpperCase(),
    ) ||
    app.languages.length > 2 ||
    app.languagesUrl;
  const appLanguages = app.languages
    .filter((l) => l.toUpperCase() !== multilingualDisplay.toUpperCase())
    .sort();

  if (appLanguages.length <= 3) {
    return (
      <>
        {appLanguages.length === 0 && isMultilingual
          ? multilingualDisplay
          : appLanguages.join(", ")}

        {!!app.languagesUrl && (
          <>
            {" "}
            <TranslationContribute
              languagesUrl={app.languagesUrl}
              userLanguage={userLanguages[0]}
            />
          </>
        )}
      </>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {findIgnoreCase(userLanguages, app.cache.languages)
            ? t("app.inUserLanguage", {
                language: findIgnoreCase(userLanguages, app.cache.languages),
                numberOfLanguages: appLanguages.length - 1,
              })
            : multilingualDisplay}
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-90">
        <PopoverHeader>
          <PopoverHeader>{t("app.languages")}</PopoverHeader>
        </PopoverHeader>
        {appLanguages.join(", ")}
        {!!app.languagesUrl && (
          <TranslationContribute
            languagesUrl={app.languagesUrl}
            userLanguage={userLanguages[0]}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
