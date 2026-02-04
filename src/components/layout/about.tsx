import React from "react";
import i18next from "i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export function About() {
  const { t } = useTranslation();

  return (
    <a
      href={`/docs/${
        i18next.resolvedLanguage !== "en" ? `${i18next.resolvedLanguage}/` : ""
      }`}
      title={t("about")}
    >
      <HugeiconsIcon
        className="inline-block"
        icon={InformationCircleIcon}
        strokeWidth={2}
      />
    </a>
  );
}
