import React from "react";
import { SlimSelect } from "./SlimSelect";
import { useTranslation } from "react-i18next";

export function LanguageSelect({ onChange }: { onChange: () => void }) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      className="filter hidden"
      multiple
      settings={{
        placeholderText: t("filter.language"),
      }}
      events={{
        afterChange: onChange,
      }}
    ></SlimSelect>
  );
}
