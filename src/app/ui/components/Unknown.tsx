import React from "react";
import { useTranslation } from "react-i18next";

export function Unknown() {
  const { t } = useTranslation();
  return <span className="text-muted-foreground">{t("compare.unknown")}</span>;
}
