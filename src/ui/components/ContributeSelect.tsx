import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";

export function ContributeSelect({
  selected = "",
  onChange,
}: {
  selected: string;
  onChange: (newValue: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <SlimSelect
      settings={{
        showSearch: false,
        placeholderText: t("app.contribute"),
        allowDeselect: true,
      }}
      data={[
        {
          label: t("app.contribute.toSoftware"),
          options: [
            {
              text: t("app.contribute.toSoftware.discuss"),
              value: "discuss",
              selected: selected === "discuss",
            },
            {
              text: t("app.contribute.toSoftware.test"),
              value: "test",
              selected: selected === "test",
            },
            {
              text: t("app.contribute.toSoftware.translate"),
              value: "translate",
              selected: selected === "translate",
            },
            {
              text: t("app.contribute.toSoftware.develop"),
              value: "develop",
              selected: selected === "develop",
            },
            {
              text: t("app.contribute.toSoftware.document"),
              value: "document",
              selected: selected === "document",
            },
          ],
        },
        {
          label: t("app.contribute.toData"),
          options: [
            {
              text: t("app.contribute.toData.edit"),
              value: "edit",
              selected: selected === "edit",
            },
            {
              text: t("app.contribute.toData.resolve"),
              value: "resolve",
              selected: selected === "resolve",
            },
            {
              text: t("app.contribute.toData.review"),
              value: "review",
              selected: selected === "review",
            },
            {
              text: t("app.contribute.toData.photos"),
              value: "photos",
              selected: selected === "photos",
            },
            {
              text: t("app.contribute.toData.tracks"),
              value: "tracks",
              selected: selected === "tracks",
            },
            {
              text: t("app.contribute.toData.qa"),
              value: "qa",
              selected: selected === "qa",
            },
          ],
        },
        {
          label: t("app.contribute.toCommunity"),
          options: [
            {
              text: t("app.contribute.toCommunity.welcome"),
              value: "welcome",
              selected: selected === "welcome",
            },
          ],
        },
      ]}
      events={{
        afterChange: (newOption) => {
          const newValue = newOption.map((o) => o.value)[0];
          if (newValue === selected) {
            return;
          }
          onChange(newValue);
        },
      }}
    ></SlimSelect>
  );
}
