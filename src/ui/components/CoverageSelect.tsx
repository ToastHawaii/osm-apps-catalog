import React from "react";
import { useTranslation } from "react-i18next";
import { SlimSelect } from "./SlimSelect";

export function CoverageSelect({ onChange }: { onChange: () => void }) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      className="filter hidden"
      multiple
      settings={{
        placeholderText: t("filter.coverage"),
      }}
      events={{
        afterChange: onChange,
      }}
    ></SlimSelect>
  );
}
