import React from "react";
import { useTranslation } from "react-i18next";
import { SlimSelect } from "./SlimSelect";

export function Menu({ onChange }: { onChange: (value: string) => void }) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      style={{ width: "228px", float: "right", margin: "4px" }}
      settings={{
        showSearch: false,
        placeholderText: t("filter.category"),
      }}
      data={[
        {
          value: "all",
          html:
            "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> " +
            t("filter.category.all"),
          text: t("filter.category.all"),
        },
        {
          value: "focus",
          html:
            "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> " +
            t("filter.category.focus"),
          text: t("filter.category.focus"),
        },
        {
          value: "latest",
          html:
            "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> " +
            t("filter.category.latest"),
          text: t("filter.category.latest"),
        },
        {
          value: "mobile",
          html:
            "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> " +
            t("filter.category.mobile"),
          text: t("filter.category.mobile"),
        },
        {
          value: "navigation",
          html:
            "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> " +
            t("filter.category.navigation"),
          text: t("filter.category.navigation"),
        },
        {
          value: "edit",
          html:
            "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> " +
            t("filter.category.edit"),
          text: t("filter.category.edit"),
        },
      ]}
      events={{
        afterChange: (i) => {
          onChange(i[0].value);
        },
      }}
    ></SlimSelect>
  );
}
