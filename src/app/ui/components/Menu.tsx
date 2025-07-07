import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";

export function Menu({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation();

  const categories = [];
  if (!value) {
    categories.push({
      value: "",
      html:
        "<i class='fas fa-bars' style='position: absolute;right: 28px;'></i> " +
        t("filter.category"),
      text: t("filter.category"),
      placeholder: true,
    });
  }
  categories.push(
    ...[
      {
        value: "all",
        html:
          "<i class='fas fa-layer-group' style='position: absolute;right: 28px;'></i> " +
          t("filter.category.all"),
        text: t("filter.category.all"),
        selected: false,
      },
      {
        value: "focus",
        html:
          "<i class='far fa-eye' style='position: absolute;right: 27px;'></i> " +
          t("filter.category.focus"),
        text: t("filter.category.focus"),
        selected: false,
      },
      {
        value: "latest",
        html:
          "<i class='far fa-clock' style='position: absolute;right: 28px;'></i> " +
          t("filter.category.latest"),
        text: t("filter.category.latest"),
        selected: false,
      },
      {
        value: "mobile",
        html:
          "<i class='fas fa-mobile-alt' style='position: absolute;right: 31px;'></i> " +
          t("filter.category.mobile"),
        text: t("filter.category.mobile"),
        selected: false,
      },
      {
        value: "navigation",
        html:
          "<i class='far fa-compass' style='position: absolute;right: 28px;'></i> " +
          t("filter.category.navigation"),
        text: t("filter.category.navigation"),
        selected: false,
      },
      {
        value: "edit",
        html:
          "<i class='fas fa-edit' style='position: absolute;right: 26px;'></i> " +
          t("filter.category.edit"),
        text: t("filter.category.edit"),
        selected: false,
      },
    ].map((c) => {
      if (c.value === value) {
        c.selected = true;
      }
      return c;
    })
  );

  return (
    <SlimSelect
      style={{ width: "228px", float: "right", margin: "4px" }}
      settings={{
        showSearch: false,
      }}
      data={categories}
      events={{
        afterChange: (i) => {
          if (value === i[0].value) {
            return;
          }
          if ((window as any).goatcounter) {
            (window as any).goatcounter.count({
              path: `/?category=${value}`,
              title: "Has switched the category.",
              event: true,
            });
          }
          onChange(i[0].value);
        },
      }}
    ></SlimSelect>
  );
}
