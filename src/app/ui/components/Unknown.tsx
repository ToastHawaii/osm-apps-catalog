import React from "react";
import { useTranslation } from "react-i18next";

export function Unknown() {
  const { t } = useTranslation();
  return <span className="unknown">{t("compare.unknown")}</span>;
}
