import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { isEqual } from "lodash";

export function ContributeSelect({
  selected = [],
  onChange,
}: {
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      settings={{
        showSearch: false,
        placeholderText: t("app.contribute"),
        allowDeselect: true,
      }}
      multiple
      modelValue={selected}
      data={[
        {
          label: t("app.contribute.toSoftware"),
          options: [
            {
              text: t("app.contribute.toSoftware.discuss"),
              value: "discuss",
              selected: selected.includes("discuss"),
            },
            {
              text: t("app.contribute.toSoftware.test"),
              value: "test",
              selected: selected.includes("test"),
            },
            {
              text: t("app.contribute.toSoftware.translate"),
              value: "translate",
              selected: selected.includes("translate"),
            },
            {
              text: t("app.contribute.toSoftware.develop"),
              value: "develop",
              selected: selected.includes("develop"),
            },
            {
              text: t("app.contribute.toSoftware.document"),
              value: "document",
              selected: selected.includes("document"),
            },
          ],
        },
        {
          label: t("app.contribute.toData"),
          options: [
            {
              text: t("app.contribute.toData.edit"),
              value: "edit",
              selected: selected.includes("edit"),
            },
            {
              text: t("app.contribute.toData.resolve"),
              value: "resolve",
              selected: selected.includes("resolve"),
            },
            {
              text: t("app.contribute.toData.review"),
              value: "review",
              selected: selected.includes("review"),
            },
            {
              text: t("app.contribute.toData.photos"),
              value: "photos",
              selected: selected.includes("photos"),
            },
            {
              text: t("app.contribute.toData.tracks"),
              value: "tracks",
              selected: selected.includes("tracks"),
            },
            {
              text: t("app.contribute.toData.qa"),
              value: "qa",
              selected: selected.includes("qa"),
            },
          ],
        },
        {
          label: t("app.contribute.toCommunity"),
          options: [
            {
              text: t("app.contribute.toCommunity.welcome"),
              value: "welcome",
              selected: selected.includes("welcome"),
            },
          ],
        },
      ]}
      events={{
        afterChange: (newOptions) => {
          const newValues = newOptions.map((o) => o.value);
          if (isEqual(newValues, selected)) {
            return;
          }
          onChange(newValues);
        },
      }}
    ></SlimSelect>
  );
}
