import { Toggle } from "@/components/ui/toggle";
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
    <Toggle
      data-state={active ? "on" : "off"}
      variant={active ? "default" : "outline"}
      className="text-lg text-gray-500 data-[state=on]:border data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:text-primary"
      onPressedChange={(pressed) => onChange(pressed)}
    >
      {t("filter.moreFilters")}
    </Toggle>
  );
}
