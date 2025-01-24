import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";

export function CoverageSelect({ onChange }: { onChange: () => void }) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      multiple
      settings={{
        placeholderText: t("filter.coverage"),
        class: ["filter", "hidden"]
      }}
      events={{
        afterChange: onChange,
      }}
    ></SlimSelect>
  );
}
