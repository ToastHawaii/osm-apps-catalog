import React from "react";
import { useTranslation } from "react-i18next";
import SlimSelect from "./SlimSelect";
import { App } from "../../data/App";
import { prepareArrayForSelect } from "../../utilities/prepareArrayForSelect";

export function TopicSelect({
  apps,
  selected = [],
  onChange,
}: {
  apps: App[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}) {
  const { t } = useTranslation();

  const data: string[] = selected.slice();

  data.push(...apps.flatMap((a) => a.topics.map((t) => t)));

  return (
    <SlimSelect
      data={prepareArrayForSelect(data, selected)}
      multiple
      settings={{
        placeholderText: t("filter.topic"),
        class: ["filter", "hidden"],
      }}
      events={{
        afterChange: (newValues) => {
          onChange(newValues.map((v) => v.value));
        },
      }}
    ></SlimSelect>
  );
}
