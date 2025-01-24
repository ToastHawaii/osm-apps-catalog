import React from "react";
import SlimSelect from "./SlimSelect";
import { useTranslation } from "react-i18next";

export function PlatformSelect({ onChange }: { onChange: () => void }) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      multiple
      settings={{
        placeholderText: t("filter.platform"),
        class: ["filter", "hidden"]
      }}
      events={{
        afterChange: onChange,
      }}
    ></SlimSelect>
  );
}
