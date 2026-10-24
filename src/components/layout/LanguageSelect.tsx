import React from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { ExternalLink } from "@components/common/ExternalLink";

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const supportedLanguages = [
    { value: "af", label: "Afrikaans" },
    { value: "ast", label: "asturianu" },
    { value: "az", label: "azərbaycanca" },
    { value: "id", label: "Bahasa Indonesia" },
    { value: "ms", label: "Bahasa Melayu" },
    { value: "bs", label: "bosanski" },
    { value: "br", label: "brezhoneg" },
    { value: "ca", label: "català" },
    { value: "cs", label: "čeština" },
    { value: "da", label: "dansk" },
    { value: "de", label: "Deutsch" },
    { value: "et", label: "eesti" },
    { value: "en", label: "English" },
    { value: "es", label: "español" },
    { value: "eo", label: "Esperanto" },
    { value: "eu", label: "euskara" },
    { value: "fr", label: "français" },
    { value: "fy", label: "Frysk" },
    { value: "gl", label: "galego" },
    { value: "hr", label: "hrvatski" },
    { value: "ia", label: "interlingua" },
    { value: "is", label: "íslenska" },
    { value: "it", label: "italiano" },
    { value: "ht", label: "Kreyòl ayisyen" },
    { value: "gcf", label: "kréyòl gwadloupéyen" },
    { value: "ku", label: "kurdî" },
    { value: "lv", label: "latviešu" },
    { value: "lb", label: "Lëtzebuergesch" },
    { value: "lt", label: "lietuvių" },
    { value: "hu", label: "magyar" },
    { value: "nl", label: "Nederlands" },
    { value: "no", label: "norsk" },
    { value: "nn", label: "norsk nynorsk" },
    { value: "oc", label: "occitan" },
    { value: "pl", label: "polski" },
    { value: "pnb", label: "پنجابی" },
    { value: "pt", label: "português" },
    { value: "ro", label: "română" },
    { value: "sq", label: "shqip" },
    { value: "sk", label: "slovenčina" },
    { value: "sl", label: "slovenščina" },
    { value: "sr-latn", label: "srpski (latinica)" },
    { value: "fi", label: "suomi" },
    { value: "sv", label: "svenska" },
    { value: "tl", label: "Tagalog" },
    { value: "vi", label: "Tiếng Việt" },
    { value: "tr", label: "Türkçe" },
    { value: "diq", label: "Zazaki" },
    { value: "el", label: "Ελληνικά" },
    { value: "be", label: "беларуская" },
    { value: "bg", label: "български" },
    { value: "mk", label: "македонски" },
    { value: "mn", label: "монгол" },
    { value: "ru", label: "русский" },
    { value: "sr", label: "српски / srpski" },
    { value: "uk", label: "українська" },
    { value: "hy", label: "հայերեն" },
    { value: "he", label: "עברית" },
    { value: "ar", label: "العربية" },
    { value: "fa", label: "فارسی" },
    { value: "ps", label: "پښتو" },
    { value: "ne", label: "नेपाली" },
    { value: "bn", label: "বাংলা" },
    { value: "ta", label: "தமிழ்" },
    { value: "ml", label: "മലയാളം" },
    { value: "si", label: "සිංහල" },
    { value: "th", label: "ไทย" },
    { value: "my", label: "မြန်မာဘာသာ" },
    { value: "ka", label: "ქართული" },
    { value: "ko", label: "한국어" },
    { value: "tzm", label: "ⵜⴰⵎⴰⵣⵉⵖⵜ" },
    { value: "zh-hans", label: "中文（简体）" },
    { value: "zh-hant", label: "中文（繁體）" },
    { value: "ja", label: "日本語" },
    { value: "yue", label: "粵語" },
  ];

  const currentLang = i18n.language || "en";

  return (
    <>
      <Select
        value={currentLang}
        onValueChange={(lng) => {
          i18n.changeLanguage(lng);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("footer.languagePlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="p-1"
            size="xs"
            title={t("footer.helpTranslate.hint.label")}
          >
            {i18n.language === i18n.resolvedLanguage ? (
              <img
                src={`https://hosted.weblate.org/widget/osm-apps-catalog/osm-apps-catalog/${i18n.language}/svg-badge.svg?capitalize=1`}
                alt={t("footer.languageSelectTranslationBadgeAlt")}
              />
            ) : (
              <span className="text-sm text-muted-foreground">
                {t("footer.languageMissingTranslation")}
              </span>
            )}
            <HugeiconsIcon
              className="size-4"
              icon={InformationCircleIcon}
              aria-label={t("footer.helpTranslate.hint.label")}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-60 whitespace-pre-line">
          {t("footer.helpTranslate.hint.text")}
          <br />
          <br />
          {i18n.language === i18n.resolvedLanguage
            ? t("footer.helpTranslate.hint.translated")
            : t("footer.helpTranslate.hint.notTranslated")}
          <ExternalLink
            href={`https://hosted.weblate.org/projects/osm-apps-catalog/osm-apps-catalog/${i18n.language}/`}
            icon
          >
            {t("footer.helpTranslate")}
          </ExternalLink>
        </PopoverContent>
      </Popover>
    </>
  );
}
