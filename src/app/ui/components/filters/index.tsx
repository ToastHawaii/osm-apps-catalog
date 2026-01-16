import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";

export function Filters({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (toggle: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <Button
      variant={active ? "default" : "outline"}
      onClick={() => onChange(!active)}
    >
      {t("filter.moreFilters")}
    </Button>
  );
}
