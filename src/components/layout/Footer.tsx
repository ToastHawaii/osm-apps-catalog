import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ThemeModeToggle } from "@components/layout/ThemeModeToggle";
import { ExternalLinkIcon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Combobox } from "@components/ui/combobox";
import { useRoute } from "@hooks/useRoute";

export function Footer() {
  const { t, i18n } = useTranslation();
  const routes = useRoute();

  const supportedLanguages = [
    { code: "af", name: "Afrikaans" },
    { code: "ar", name: "العربية" },
    { code: "ast", name: "asturianu" },
    { code: "az", name: "azərbaycanca" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "ms", name: "Bahasa Melayu" },
    { code: "bs", name: "bosanski" },
    { code: "br", name: "brezhoneg" },
    { code: "ca", name: "català" },
    { code: "cs", name: "čeština" },
    { code: "da", name: "dansk" },
    { code: "de", name: "Deutsch" },
    { code: "el", name: "Ελληνικά" },
    { code: "en", name: "English" },
    { code: "es", name: "español" },
    { code: "et", name: "eesti" },
    { code: "eo", name: "Esperanto" },
    { code: "eu", name: "euskara" },
    { code: "fr", name: "français" },
    { code: "fy", name: "Frysk" },
    { code: "gl", name: "galego" },
    { code: "hr", name: "hrvatski" },
    { code: "ia", name: "interlingua" },
    { code: "is", name: "íslenska" },
    { code: "it", name: "italiano" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "ku", name: "kurdî" },
    { code: "lt", name: "lietuvių" },
    { code: "lv", name: "latviešu" },
    { code: "hu", name: "magyar" },
    { code: "nl", name: "Nederlands" },
    { code: "no", name: "norsk" },
    { code: "nn", name: "norsk nynorsk" },
    { code: "pl", name: "polski" },
    { code: "pt", name: "português" },
    { code: "ro", name: "română" },
    { code: "ru", name: "русский" },
    { code: "sq", name: "shqip" },
    { code: "sk", name: "slovenčina" },
    { code: "sl", name: "slovenščina" },
    { code: "sr", name: "српски / srpski" },
    { code: "fi", name: "suomi" },
    { code: "sv", name: "svenska" },
    { code: "ta", name: "தமிழ்" },
    { code: "tr", name: "Türkçe" },
    { code: "uk", name: "українська" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "hy", name: "հայերեն" },
    { code: "he", name: "עברית" },
    { code: "fa", name: "فارسی" },
    { code: "my", name: "မြန်မာဘာသာ" },
    { code: "ka", name: "ქართული" },
    { code: "th", name: "ไทย" },
    { code: "zh-hans", name: "中文（简体）" },
    { code: "zh-hant", name: "中文（繁體）" },
    { code: "yue", name: "粵語" },
  ];

  const currentLang = i18n.resolvedLanguage || "en";

  const languageItems = supportedLanguages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  return (
    <>
      <Separator />
      <div className="mx-auto max-w-7xl px-8 py-4 md:px-18 md:py-6">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Combobox
              items={languageItems}
              value={currentLang}
              onValueChange={(lng) => {
                i18n.changeLanguage(lng);
              }}
              placeholder={t("footer.languagePlaceholder")}
            />
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
              <Link to={routes.docsPrivacy({ lang: i18n.resolvedLanguage })}>
                {t("footer.privacy")}
              </Link>
            </Button>

            <ThemeModeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
